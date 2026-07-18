<?php

namespace App\Http\Requests\Doctor;

use Illuminate\Foundation\Http\FormRequest;

class StoreConsultationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'doctor';
    }

    /**
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        return [
            'symptoms' => ['required', 'string'],
            'diagnosis' => ['required', 'string'],
            'notes' => ['nullable', 'string'],
            'instructions' => ['nullable', 'string'],
            'medicines' => ['required', 'array', 'min:1'],
            'medicines.*.medicine_name' => ['required', 'string', 'max:255'],
            'medicines.*.dosage' => ['required', 'string', 'max:255'],
            'medicines.*.frequency' => ['required', 'string', 'max:255'],
            'medicines.*.duration' => ['required', 'string', 'max:255'],
        ];
    }
}
