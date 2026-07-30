<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DoctorReviewResource extends JsonResource
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
            'rating' => $this->rating,
            'comment' => $this->comment,
            'created_at' => $this->created_at?->toDateTimeString(),

            'patient' => $this->whenLoaded('patient', fn () => [
                'user' => $this->patient?->user ? [
                    'id' => $this->patient->user->id,
                    'name' => $this->patient->user->name,
                    'email' => $this->patient->user->email,
                ] : null,
            ]),

            'appointment' => $this->whenLoaded('appointment', fn () => $this->appointment ? [
                'id' => $this->appointment->id,
                'appointment_date' => $this->appointment->appointment_date instanceof \DateTimeInterface
                    ? $this->appointment->appointment_date->format('Y-m-d')
                    : substr((string) $this->appointment->appointment_date, 0, 10),
            ] : null),
        ];
    }
}
