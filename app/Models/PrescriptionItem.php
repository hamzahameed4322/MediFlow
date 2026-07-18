<?php

namespace App\Models;

use App\Concerns\FormatsDatesForUi;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $prescription_id
 * @property string $medicine_name
 * @property string $dosage
 * @property string $frequency
 * @property string $duration
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['prescription_id', 'medicine_name', 'dosage', 'frequency', 'duration'])]
class PrescriptionItem extends Model
{
    use FormatsDatesForUi, HasFactory;

    /**
     * Get the prescription that owns this item.
     *
     * @return BelongsTo<Prescription, PrescriptionItem>
     */
    public function prescription(): BelongsTo
    {
        return $this->belongsTo(Prescription::class, 'prescription_id');
    }
}
