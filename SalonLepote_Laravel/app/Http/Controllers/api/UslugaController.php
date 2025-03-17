<?php

namespace App\Http\Controllers\api;

use App\Models\Usluga;
use Illuminate\Http\Request;
use App\trait\CanLoadRelationShips;
use App\Http\Controllers\Controller;
use App\Http\Resources\UslugaResource;
use Illuminate\Support\Facades\Gate;

class UslugaController extends Controller
{
    use CanLoadRelationShips;
    private $relations = ['tipusluge', 'termin', 'termin.klijent', 'termin.radnica'];
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (Gate::allows('viewAny', Usluga::class)) {

            $usluge = Usluga::query();
            $query = $this->loadRelationships($usluge);
            return Usluga::collection($query->latest()->paginate());
        } else {
            return response()->json([
                'message' => 'Pristup odbijen za pregled usluga'
            ], 403);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (Gate::allows('create', Usluga::class)) {

            $validatedData = $request->validate([
                'tip_usluge_id' => 'required|integer|exists:tip_usluge,id',
                'termin_id' => 'required|integer|exists:termin,id'
            ]);

            $usluga = Usluga::create($validatedData);
            return new UslugaResource($usluga);
        } else {
            return response()->json([
                'message' => 'Pristup odbijen za kreiranje usluge'
            ], 403);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $usluga = Usluga::where('redniBroj',$id)->first();
        if (Gate::allows('view', $usluga)) {
            return new UslugaResource($this->loadRelationships($usluga));
        } else {
            return response()->json([
                'message' => 'Pristup odbijen za pregled usluge'
            ], 403);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
       
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $usluga = Usluga::findOrFail($id);
        if (Gate::allows('delete', $usluga)) {
            $usluga->delete();
            return response()->json([
                'message' => 'Uspesno brisanje usluge'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Pristup odbijen za brisanje usluge'
            ], 403);
        }
    }
}
