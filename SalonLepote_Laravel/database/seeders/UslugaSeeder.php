<?php

namespace Database\Seeders;

use App\Models\Termin;
use App\Models\Usluga;
use App\Models\TipUsluge;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UslugaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $termini = Termin::all();
        $tipoviUsluga = TipUsluge::all();

        forEach($termini as $termin){
            for($i = 0; $i < 2;$i++){
                Usluga::create([
                    'termin_id'=>$termin->id,
                    'tip_usluge_id'=>fake()->randomElement($tipoviUsluga)->id
                ]);
            }
        }
    }
}
