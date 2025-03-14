<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Klijent;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class KlijentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::where('role','klijent')->get();

        foreach($users as $user){
            Klijent::create([
                'user_id'=>$user->id,
                'telefon'=>fake()->phoneNumber()
            ]);
        }
    }
}
