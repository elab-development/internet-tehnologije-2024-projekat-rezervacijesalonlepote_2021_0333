<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\TipUsluge;
use Illuminate\Database\Seeder;
use Database\Seeders\TerminSeeder;
use Database\Seeders\UslugaSeeder;
use Database\Seeders\KlijentSeeder;
use Database\Seeders\RadnicaSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        for($i= 0;$i<3;$i++){
            User::factory()->create([
                'role'=> 'radnik'
            ]);
        }
        for($i= 0;$i<5;$i++){
            User::factory()->create([
                'role'=> 'klijent'
            ]);
        }
        User::factory()->create(['role'=>'admin']);
        TipUsluge::factory(5)->create();
        $this->call(KlijentSeeder::class);
        $this->call(RadnicaSeeder::class);
        $this->call(RadnicaSeeder::class);
        $this->call(TerminSeeder::class);
        $this->call(UslugaSeeder::class);
        
    }
}
