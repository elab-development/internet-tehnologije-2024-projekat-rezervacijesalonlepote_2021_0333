<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Radnica;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RadnicaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::where('role','radnik')->get();
        forEach($users as $user){
            Radnica::create([
                'user_id'=>$user->id
            ]);
        }
    }
}
