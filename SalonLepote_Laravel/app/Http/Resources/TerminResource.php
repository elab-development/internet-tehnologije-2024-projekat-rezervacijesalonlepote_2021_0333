<?php

namespace App\Http\Resources;

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
            'datum' => $this->datum,
            'trajanje' => $this->trajanje,
            'vreme' => $this->vreme,
            'ukupnaCena' => $this->ukupnaCena,
            'radnica' => new RadnicaResource($this->whenLoaded('radnica')),
            'klijent' => new KlijentResource($this->whenLoaded('klijent'))
        ];
    }
}
