<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use App\Models\Radnica;
use Illuminate\Http\Request;
use App\trait\CanLoadRelationShips;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use App\Http\Resources\RadnicaResource;
use Illuminate\Database\Eloquent\Builder;

class RadnicaController extends Controller
{
    use CanLoadRelationShips;
    private $relations = ['user'];
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        if(Gate::allows('viewAny',Radnica::class)){
            $ime = $request->input('ime');
            $radnice = Radnica::whereHas('user', function(Builder $query) use ($ime){
                $query->where('name','like','%'.$ime.'%');
            });
            $query=$this->loadRelationships($radnice);
            return RadnicaResource::collection($query->latest()->paginate());
        }else{
            return response()->json([
                'message' => 'Pristup odbijen za pregled radnica'
            ], 403);
        }

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if(Gate::allows('create',Radnica::class)){
            $validatedUser = $request->validate([
                'name' => 'required|string|max:20',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:8',
            ]);
 
 
            $user = User::create([
                'name' => $validatedUser['name'],
                'email' => $validatedUser['email'],
                'password' => bcrypt($validatedUser['password']), 
                'role' => 'radnica', 
            ]);
 

 
            $radnica = Radnica::create([
                'user_id' => $user->id
            ]);
 
            return response()->json([
                'message' => 'Radnica je uspešno kreirana',
                'user' => $user,
                'radnica' => $radnica,
            ], 201);
        }else{
            return response()->json([
                'message' => 'Pristup odbijen za kreiranje radnice'
            ], 403);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $radnica = Radnica::where('id', $id)->firstOrFail();
        if(Gate::allows('view',$radnica)){
            return new RadnicaResource($radnica);
        }else{
            return response()->json([
                'message' => 'Pristup odbijen za pregled radnice'
            ], 403);
        }

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $radnica = Radnica::findOrFail($id);
        $user = User::findOrFail($radnica->user_id);
        if (Gate::allows('update', $radnica)) {
 
            $validatedUser = $request->validate([
                'name' => 'required|string|max:20',
                'password' => 'nullable|string|min:8'
            ]);
 
 
            $user->update([
                'name' => $validatedUser['name'],
                'password' => $validatedUser['password'] ? bcrypt($validatedUser['password']) : $user->password,
            ]);
 
            return response()->json([
                'message' => 'Radnica je uspešno ažurirana',
                'user' => $user
            ], 200);
        } else {
            return response()->json(['message' => 'Pristup odbijen za azuriranje radnice'], 403);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $radnica = Radnica::findOrFail($id);
        $user = User::findOrFail($radnica->user_id);
        if (Gate::allows('delete', $radnica)) {
 
            $radnica->delete();
            $user->delete();

            return response()->json([
                'message' => 'Radnica je uspešno obrisana'
            ], 200);
        } else {
            return response()->json(['message' => 'Pristup odbijen za brisanje radnice'], 403);
        }
    }
}
