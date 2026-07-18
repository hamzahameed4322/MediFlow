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
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
