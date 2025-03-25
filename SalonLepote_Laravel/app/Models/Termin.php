<?php

namespace App\Models;

use App\Models\Usluga;
use App\Models\Klijent;
use App\Models\Radnica;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Query\Builder as QueryBuilder;

class Termin extends Model
{
    use HasFactory;
    protected $guarded=[];

    public function klijent():BelongsTo
    {
        return $this->belongsTo(Klijent::class, 'klijent_id', 'id');
    }

    public function radnica():BelongsTo
    {
        return $this->belongsTo(Radnica::class, 'radnica_id', 'id');
    }

    public function uslugas():HasMany
    {
        return $this->HasMany(Usluga::class);
    }

    public function scopeWithDatum(Builder $query, string $datum):Builder|QueryBuilder{
        return $query->where('datum',$datum);
    }

    public function scopeWithRadnica(Builder $query, int $radnica):Builder|QueryBuilder{
        return $query->where('radnica_id',$radnica);
    }
    public function scopeWithKlijent(Builder $query, int $klijent):Builder|QueryBuilder{
        return $query->where('klijent_id',$klijent);
    }
}
