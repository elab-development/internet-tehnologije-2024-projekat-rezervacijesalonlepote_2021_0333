<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UslugaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'redniBroj'=>$this->redniBroj,
            'termin'=>new TerminResource($this->whenLoaded('termin')),
            'tip_usluge'=>new TipUslugeResource($this->whenLoaded('tipusluge'))
        ];
    }
}
