<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Klijent;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\KlijentResource as ResourcesKlijentResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Resources\Resource\KlijentResource;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
        $user = \App\Models\User::where('email', $request->email)->first();
        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['Pogrešni kredencijali.']
            ]);
        }
 
        if (!Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Pogrešni kredencijali.']
            ]);
        }
        $token = $user->createToken('api-token')->plainTextToken;
        return response()->json([
            'id' => $user->id,
            'token' => $token,
            'name' => $user->name,
            'role' => $user->role,
            'email' => $user->email,
        ]);
    }
 
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json([
            'message' => 'Uspešno odjavljivanje'
        ]);
    }

    public function register(Request $request){
        $validatedUser = $request->validate([
            'name' => 'required|string|max:20',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8'
        ]);
        $user = User::create([...$validatedUser,'role'=>'pacijent']);
        $validatedPacijent = $request->validate([      
            'telefon' => 'required|string',
        ]);
        $klijent = Klijent::create([...$validatedPacijent,'user_id'=>$user->id]);
        return new ResourcesKlijentResource($klijent);
    }
 
}
