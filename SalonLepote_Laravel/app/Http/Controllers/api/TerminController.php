<?php

namespace App\Http\Controllers\api;

use App\Models\Termin;
use App\Models\Radnica;
use Illuminate\Http\Request;
use App\trait\CanLoadRelationShips;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use App\Http\Resources\TerminResource;

class TerminController extends Controller
{
    use CanLoadRelationShips;
    private $relations = ['radnica','radnica.user', 'klijent'];
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (Gate::allows('viewAny', Termin::class)) {
            $datum = $request->input('datum');
            $radnica = $request->input('radnica');
            $klijent = $request->input('klijent');
            $termini = Termin::query()
                ->when($datum, fn($query,$datum) => $query->withDatum($datum))
                ->when($radnica, fn($query,$radnica) => $query->withRadnica($radnica))
                ->when($klijent, fn($query,$klijent) => $query->withKlijent($klijent));

            $query = $this->loadRelationships($termini);

            return TerminResource::collection($query->latest()->paginate());
        } else {
            return response()->json([
                'message' => 'Pristup odbijen za pregled termia'
            ], 403);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (Gate::allows('create', Termin::class)) {

            $validatedData = $request->validate([
                'vreme' => 'required|date',
                'ukupnaCena' => 'required|integer',
                'trajanje' => 'required|integer',
                'radnica_id' => 'required|integer|exists:radnicas,id',
                'klijent_id' => 'required|integer|exists:klijents,id'
            ]);

            $termin = Termin::create($validatedData);
            return new TerminResource($this->loadRelationships($termin));
        } else {
            return response()->json([
                'message' => 'Pristup odbijen za kreiranje termina'
            ], 403);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $termin = Termin::findOrFail($id);
        if (Gate::allows('view', $termin)) {
            return new TerminResource($termin);
        } else {
            return response()->json([
                'message' => 'Pristup odbijen za pregled termina'
            ], 403);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $termin = Termin::findOrFail($id);
        if (Gate::allows('update', $termin)) {

            $validatedData = $request->validate([
                'vreme' => 'required|time'
            ]);

            $termin->update($validatedData);
            return new TerminResource($this->loadRelationships($termin));
        } else {
            return response()->json([
                'message' => 'Pristup odbijen za azuriranje termina'
            ], 403);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $termin = Termin::findOrFail($id);
        if (Gate::allows('delete', $termin)) {
            $termin->delete();
            return response()->json([
                'message' => 'Uspesno brisanje termina'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Pristup odbijen za brisanje termina'
            ], 403);
        }
    }
}
