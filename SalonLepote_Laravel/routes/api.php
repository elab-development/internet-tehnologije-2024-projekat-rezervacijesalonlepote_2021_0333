<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\KlijentController;
use App\Http\Controllers\api\RadnicaController;
use App\Http\Controllers\api\TerminController;
use App\Http\Controllers\api\TipUslugeController;
use App\Http\Controllers\api\UslugaController;
use App\Http\Controllers\AuthController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Route::post('/',function(){
//     return redirect('/login');
// });


Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('klijenti', KlijentController::class);
    Route::apiResource('radnice', RadnicaController::class);
    Route::apiResource('usluge', UslugaController::class);
    Route::apiResource('termini', TerminController::class);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::delete('/usluge/{redniBroj}/{termin_id}', [UslugaController::class, 'destroy']);
});

Route::post('/login', [AuthController::class, 'login']);
Route::apiResource('tipUsluga', TipUslugeController::class);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/klijentForUser/{id}',[KlijentController::class, 'getKlijentForUser']);
Route::get('/radnicaForUser/{id}',[RadnicaController::class, 'getRadnicaForUser']);

