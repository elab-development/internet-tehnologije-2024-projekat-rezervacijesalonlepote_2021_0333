<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TipUsluge extends Model
{
    /** @use HasFactory<\Database\Factories\TipUslugeFactory> */
    use HasFactory;
    protected $guarded=[];
    
    public function uslugas():HasMany{
        return $this->hasMany(Usluga::class,'tipusluge_id', 'id');
    }


}
