<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\KlijentController;
use App\Http\Controllers\api\RadnicaController;
use App\Http\Controllers\api\TerminController;
use App\Http\Controllers\api\TipUslugeController;
use App\Http\Controllers\api\UslugaController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::middleware(['auth:sanctum'])->group(function(){
    Route::apiResource('klijenti', KlijentController::class);
    Route::apiResource('radnice', RadnicaController::class);
    Route::apiResource('usluge', UslugaController::class);
    Route::apiResource('tipUsluga', TipUslugeController::class);
    Route::apiResource('termini', TerminController::class);
});
