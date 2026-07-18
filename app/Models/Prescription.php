<?php

namespace App\Models;

use App\Concerns\FormatsDatesForUi;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $consultation_id
 * @property string|null $instructions
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['consultation_id', 'instructions'])]
class Prescription extends Model
{
    use FormatsDatesForUi, HasFactory;

    /**
     * Get the consultation associated with this prescription.
     *
     * @return BelongsTo<Consultation, Prescription>
     */
    public function consultation(): BelongsTo
    {
        return $this->belongsTo(Consultation::class, 'consultation_id');
    }

    /**
     * Get the items (medicines) for the prescription.
     *
     * @return HasMany<PrescriptionItem, Prescription>
     */
    public function items(): HasMany
    {
        return $this->hasMany(PrescriptionItem::class, 'prescription_id');
    }
}
