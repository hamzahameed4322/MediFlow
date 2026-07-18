<?php

namespace App\Models;

use App\Concerns\FormatsDatesForUi;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $patient_id
 * @property int $doctor_id
 * @property Carbon $appointment_date
 * @property string $appointment_time
 * @property string|null $reason
 * @property string $status
 * @property string|null $cancelled_by
 * @property string|null $cancel_reason
 * @property string|null $reject_reason
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['patient_id', 'doctor_id', 'appointment_date', 'appointment_time', 'reason', 'status', 'cancelled_by', 'cancel_reason', 'reject_reason'])]
class Appointment extends Model
{
    use FormatsDatesForUi, HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'appointment_date' => 'date',
        ];
    }

    /**
     * Get the patient profile that booked this appointment.
     *
     * @return BelongsTo<PatientProfile, Appointment>
     */
    public function patient(): BelongsTo
    {
        return $this->belongsTo(PatientProfile::class, 'patient_id');
    }

    /**
     * Get the doctor profile that is booked for this appointment.
     *
     * @return BelongsTo<DoctorProfile, Appointment>
     */
    public function doctor(): BelongsTo
    {
        return $this->belongsTo(DoctorProfile::class, 'doctor_id');
    }

    /**
     * Get the consultation associated with this appointment.
     *
     * @return HasOne<Consultation, Appointment>
     */
    public function consultation(): HasOne
    {
        return $this->hasOne(Consultation::class, 'appointment_id');
    }

    /**
     * Get the bill associated with this appointment.
     *
     * @return HasOne<Bill, Appointment>
     */
    public function bill(): HasOne
    {
        return $this->hasOne(Bill::class, 'appointment_id');
    }
}
