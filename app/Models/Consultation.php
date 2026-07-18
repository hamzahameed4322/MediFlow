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
 * @property int $appointment_id
 * @property string $symptoms
 * @property string $diagnosis
 * @property string|null $notes
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['appointment_id', 'symptoms', 'diagnosis', 'notes'])]
class Consultation extends Model
{
    use FormatsDatesForUi, HasFactory;

    /**
     * Get the appointment associated with this consultation.
     *
     * @return BelongsTo<Appointment, Consultation>
     */
    public function appointment(): BelongsTo
    {
        return $this->belongsTo(Appointment::class, 'appointment_id');
    }

    /**
     * Get the prescription associated with this consultation.
     *
     * @return HasOne<Prescription, Consultation>
     */
    public function prescription(): HasOne
    {
        return $this->hasOne(Prescription::class, 'consultation_id');
    }
}
