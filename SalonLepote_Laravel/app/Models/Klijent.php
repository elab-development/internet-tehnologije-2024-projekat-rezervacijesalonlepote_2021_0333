<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Klijent extends Model
{

    protected $guarded = [];
    /** @use HasFactory<\Database\Factories\KlijentFactory> */
    use HasFactory;
}
