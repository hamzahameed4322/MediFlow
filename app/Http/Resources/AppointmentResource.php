<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
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
            'patient_id' => $this->patient_id,
            'doctor_id' => $this->doctor_id,
            'appointment_date' => $this->appointment_date instanceof \DateTimeInterface
                ? $this->appointment_date->format('Y-m-d')
                : $this->appointment_date,
            'appointment_time' => $this->appointment_time,
            'reason' => $this->reason,
            'status' => $this->status,
            'cancelled_by' => $this->cancelled_by,
            'cancel_reason' => $this->cancel_reason,
            'reject_reason' => $this->reject_reason,

            // Scoped loadings
            'patient' => new PatientProfileResource($this->whenLoaded('patient')),
            'doctor' => new DoctorProfileResource($this->whenLoaded('doctor')),
            'consultation' => new ConsultationResource($this->whenLoaded('consultation')),
            'bill' => new BillResource($this->whenLoaded('bill')),

            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
