<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use App\Models\Klijent;
use Illuminate\Http\Request;
use App\trait\CanLoadRelationShips;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use App\Http\Resources\KlijentResource;
use Illuminate\Database\Eloquent\Builder;

class KlijentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    use CanLoadRelationShips;
    private array $relations=['user'];
    public function index(Request $request)

    {
        if (Gate::allows('viewAny', Klijent::class)) {
            $ime = $request->input('ime');
            $klijenti = Klijent::whereHas('user', function(Builder $query) use ($ime){
                $query->where('name','like','%'.$ime.'%');
            });
            // $klijenti = Klijent::query()->when($ime, fn($query, $ime) => $query->withIme($ime));
            $query=$this->loadRelationships($klijenti);
            return KlijentResource::collection($query->latest()->paginate());
        } else {
            return response()->json([
                'message' => 'Pristup odbijen za pregled klijenata'
            ], 403);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $klijent = Klijent::where('user_id', $id)->firstOrFail();
        if (Gate::allows('view', $klijent)) {
            return new KlijentResource($this->loadRelationships($klijent)); 
        } else {
            return response()->json([
                'message' => 'Pristup odbijen za pregled klijenata'
            ], 403);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);
        $klijent = Klijent::where('user_id', $id)->firstOrFail();
        if (Gate::allows('update', $klijent)) {
            $validatedDataUser=$request->validate([
                'name' => 'required|string|max:20',
                'email' => 'required|email'
            ]);
            $validatedDataKlijent = $request->validate([
                'telefon' => "required"
            ]);

            $user->update($validatedDataUser);
            $klijent->update($validatedDataKlijent);
            return response()->json([
                'message' => 'Uspesno azuriranje klijenta'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Pristup odbijen za azuriranje klijenata'
            ], 403);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $klijent = Klijent::where('id', $id)->firstOrFail();
        $user = User::findOrFail($klijent->user_id);
        
        if (Gate::allows('delete', $klijent)) {
            

            $klijent->delete();
            $user->delete();
            return response()->json([
                'message' => 'Uspesno brisanje klijenta'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Pristup odbijen za brisanje klijenata'
            ], 403);
        }
    }

    public function getKlijentForUser(string $id){
        $klijent = Klijent::where("user_id",$id)->firstOrFail();
        return $klijent;
    }
}
