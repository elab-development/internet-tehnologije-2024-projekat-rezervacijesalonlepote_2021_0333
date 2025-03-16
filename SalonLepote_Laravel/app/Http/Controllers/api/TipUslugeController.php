<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\TipUslugeResource;
use App\Models\TipUsluge;
use Illuminate\Support\Facades\Gate;

class TipUslugeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (Gate::allows('viewAny', TipUsluge::class)) {
            $naziv = $request->imput('naziv');
            $cena = $request->imput('cena');

            $tipovi = TipUsluge::query()
                ->when($naziv, fn($query, $naziv) => $query->withIme($naziv))
                ->when($cena, fn($query, $cena) => $query->withIme($cena));

            return TipUsluge::collection($tipovi->latest()->paginate());
        } else {
            return response()->json([
                'message' => 'Pristup odbijen za pregled tipova usluga'
            ], 403);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (Gate::allows('create', TipUsluge::class)) {

            $validatedData = $request->validate([
                'naziv' => 'required|string',
                'cena' => 'required|integer',
                'opis' => 'required|string',
                'trajanje' => 'required|integer'
            ]);

            $tip = TipUsluge::create($validatedData);
            return new TipUslugeResource($tip);
        } else {
            return response()->json([
                'message' => 'Pristup odbijen za kreiranje tipa usluge'
            ], 403);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tip = TipUsluge::findOrFail($id);
        if (Gate::allows('view', $tip)) {
            return new TipUslugeResource($tip);
        } else {
            return response()->json([
                'message' => 'Pristup odbijen za pregled tipa usluge'
            ], 403);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tip=TipUsluge::findOrFail($id);
        if (Gate::allows('update', $tip)) {

            $validatedData = $request->validate([
                'naziv' => 'required|string',
                'cena' => 'required|integer',
                'opis' => 'required|string',
                'trajanje' => 'required|integer'
            ]);

            $tip->update($validatedData);
            return new TipUslugeResource($tip);
        } else {
            return response()->json([
                'message' => 'Pristup odbijen za azuriranje tipa usluge'
            ], 403);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tip = TipUsluge::findOrFail($id);
        if (Gate::allows('delete', $tip)) {
            $tip->delete();
            return response()->json([
                'message' => 'Uspesno brisanje tipa usluge'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Pristup odbijen za brisanje tipa usluge'
            ], 403);
        }
    }
}
