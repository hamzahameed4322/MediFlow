<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $appointment_id
 * @property int $patient_id
 * @property int $doctor_id
 * @property int $rating
 * @property string|null $comment
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['appointment_id', 'patient_id', 'doctor_id', 'rating', 'comment'])]
class DoctorReview extends Model
{
    use HasFactory;

    /**
     * Get the appointment this review is for.
     *
     * @return BelongsTo<Appointment, DoctorReview>
     */
    public function appointment(): BelongsTo
    {
        return $this->belongsTo(Appointment::class, 'appointment_id');
    }

    /**
     * Get the patient who wrote this review.
     *
     * @return BelongsTo<PatientProfile, DoctorReview>
     */
    public function patient(): BelongsTo
    {
        return $this->belongsTo(PatientProfile::class, 'patient_id');
    }

    /**
     * Get the doctor this review is for.
     *
     * @return BelongsTo<DoctorProfile, DoctorReview>
     */
    public function doctor(): BelongsTo
    {
        return $this->belongsTo(DoctorProfile::class, 'doctor_id');
    }
}
