<?php

namespace App\Http\Requests\Patient;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePatientProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'patient';
    }

    /**
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'regex:/^03\d{9}$/'],
            'gender' => ['required', 'in:male,female,other'],
            'dob' => ['nullable', 'date', 'before:today'],
            'address' => ['nullable', 'string'],
            'allergies' => ['nullable', 'string'],
            'major_diseases' => ['nullable', 'string'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'phone.required' => 'Phone number is required.',
            'phone.regex' => 'Phone number must be exactly 11 digits and start with 03 (e.g. 03001234567).',
        ];
    }
}
