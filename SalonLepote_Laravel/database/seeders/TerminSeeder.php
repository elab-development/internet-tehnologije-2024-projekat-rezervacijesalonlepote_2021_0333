<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Termin;
use App\Models\Klijent;
use App\Models\Radnica;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TerminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $radnici_user = User::where('role','radnik')->pluck('id');
        $klijenti_user = User::where('role','klijent')->pluck('id');

        $radnice = Radnica::whereIn('user_id',$radnici_user)->get();
        $klijenti = Klijent::whereIn('user_id',$klijenti_user)->get();

        for($i = 0; $i<5;$i++){
            Termin::factory()->create([
                'radnica_id'=>fake()->randomElement($radnice)->id,
                'klijent_id'=>fake()->randomElement($klijenti)->id
            ]);
        }

    }
}
