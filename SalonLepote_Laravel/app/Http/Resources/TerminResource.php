<?php

namespace App\Http\Resources;

use App\Models\Usluga;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TerminResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'trajanje' => $this->trajanje,
            'vreme' => $this->vreme,
            'ukupnaCena' => $this->ukupnaCena,
            'radnica_id'=>$this->radnica_id,
            'klijent_id'=>$this->klijent_id,
            'radnica' => new RadnicaResource($this->whenLoaded('radnica')),
            'klijent' => new KlijentResource($this->whenLoaded('klijent')),
            'usluge' =>  UslugaResource::collection($this->whenLoaded('uslugas'))
        ];
    }
}
