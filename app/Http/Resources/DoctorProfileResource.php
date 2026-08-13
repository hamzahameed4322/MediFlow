<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DoctorProfileResource extends JsonResource
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
            'user_id' => $this->user_id,
            'specialization' => $this->specialization,
            'qualification' => $this->qualification,
            'experience' => (int) $this->experience,
            'consultation_fee' => (float) $this->consultation_fee,
            'user' => $this->whenLoaded('user', function () {
                return [
                    'id' => $this->user->id,
                    'name' => $this->user->name,
                    'email' => $this->user->email,
                    'role' => $this->user->role,
                    'status' => $this->user->status,
                ];
            }),
            'schedules' => $this->whenLoaded('schedules', function () {
                return $this->schedules->map(fn ($schedule) => [
                    'id' => $schedule->id,
                    'day' => $schedule->day,
                    'start_time' => $schedule->start_time,
                    'end_time' => $schedule->end_time,
                    'duration' => $schedule->duration,
                ]);
            }),
            'appointments_count' => $this->appointments_count ?? $this->whenCounted('appointments'),
            'reviews_count' => $this->reviews_count ?? $this->whenCounted('reviews'),
            'avg_rating' => isset($this->reviews_avg_rating) ? round((float) $this->reviews_avg_rating, 1) : null,
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
