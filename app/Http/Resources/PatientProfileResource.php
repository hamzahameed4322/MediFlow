<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PatientProfileResource extends JsonResource
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
            'phone' => $this->phone,
            'gender' => $this->gender,
            'dob' => $this->dob ? ($this->dob instanceof Carbon ? $this->dob->format('Y-m-d') : Carbon::parse($this->dob)->format('Y-m-d')) : null,
            'age' => $this->dob ? Carbon::parse($this->dob)->age : null,
            'address' => $this->address,
            'allergies' => $this->allergies,
            'major_diseases' => $this->major_diseases,
            'user' => $this->whenLoaded('user', function () {
                return [
                    'id' => $this->user->id,
                    'name' => $this->user->name,
                    'email' => $this->user->email,
                    'role' => $this->user->role,
                    'status' => $this->user->status,
                ];
            }),
            'appointment_stats' => $this->whenLoaded('appointments', function () {
                $appointments = $this->appointments;

                return [
                    'total' => $appointments->count(),
                    'completed' => $appointments->where('status', 'completed')->count(),
                    'cancelled' => $appointments->where('status', 'cancelled')->count(),
                    'cancelled_by_patient' => $appointments->where('status', 'cancelled')->where('cancelled_by', 'patient')->count(),
                    'cancelled_by_doctor' => $appointments->where('status', 'cancelled')->where('cancelled_by', 'doctor')->count(),
                    'no_show' => $appointments->where('status', 'no_show')->count(),
                    'pending' => $appointments->where('status', 'pending')->count(),
                    'confirmed' => $appointments->where('status', 'confirmed')->count(),
                    'rejected' => $appointments->where('status', 'rejected')->count(),
                ];
            }),
            'appointments' => $this->whenLoaded('appointments', function () {
                return $this->appointments
                    ->sortByDesc(fn ($apt) => $apt->appointment_date.' '.$apt->appointment_time)
                    ->values()
                    ->map(function ($apt) {
                        return [
                            'id' => $apt->id,
                            'appointment_date' => $apt->appointment_date instanceof \DateTimeInterface
                                ? $apt->appointment_date->format('Y-m-d')
                                : (string) $apt->appointment_date,
                            'appointment_time' => $apt->appointment_time,
                            'reason' => $apt->reason,
                            'status' => $apt->status,
                            'cancelled_by' => $apt->cancelled_by,
                            'cancel_reason' => $apt->cancel_reason,
                            'reject_reason' => $apt->reject_reason,
                            'doctor' => $apt->doctor ? [
                                'id' => $apt->doctor->id,
                                'specialization' => $apt->doctor->specialization,
                                'user' => $apt->doctor->user ? [
                                    'id' => $apt->doctor->user->id,
                                    'name' => $apt->doctor->user->name,
                                    'email' => $apt->doctor->user->email,
                                ] : null,
                            ] : null,
                        ];
                    });
            }),
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
