<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Termin;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TerminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $radnici = User::where('role','radnik')->get();
        $klijenti = User::where('role','klijent')->get();

        for($i = 0; $i<5;$i++){
            Termin::factory()->create([
                'radnica_id'=>fake()->randomElement($radnici),
                'klijent_id'=>fake()->randomElement($klijenti)
            ]);
        }

    }
}
