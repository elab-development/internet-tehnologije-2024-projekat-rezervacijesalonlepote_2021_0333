<?php

namespace App\Models;

use App\Models\Usluga;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TipUsluge extends Model
{
    /** @use HasFactory<\Database\Factories\TipUslugeFactory> */
    use HasFactory;
    protected $guarded=[];
    
    public function uslugas():HasMany{
        return $this->hasMany(Usluga::class,'tipusluge_id', 'id');
    }
    public function scopeWithNaziv(Builder $query, string $naziv):Builder|QueryBuilder{
        return $query->where('naziv','like','%'.$naziv.'%');
    }
    public function scopeWithCenaOd(Builder $query, int $cena):Builder|QueryBuilder{
        return $query->where('cena','>',$cena);
    }
    public function scopeWithCenaDo(Builder $query, int $cena):Builder|QueryBuilder{
        return $query->where('cena','<',$cena);
    }
}
