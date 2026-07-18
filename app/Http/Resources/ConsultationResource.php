<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConsultationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if (is_null($this->resource)) {
            return [];
        }

        return [
            'id' => $this->id,
            'appointment_id' => $this->appointment_id,
            'symptoms' => $this->symptoms,
            'diagnosis' => $this->diagnosis,
            'notes' => $this->notes,
            'appointment' => new AppointmentResource($this->whenLoaded('appointment')),
            'prescription' => new PrescriptionResource($this->whenLoaded('prescription')),
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
