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
 * @property int $doctor_id
 * @property string $day
 * @property string $start_time
 * @property string $end_time
 * @property int $duration
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['doctor_id', 'day', 'start_time', 'end_time', 'duration'])]
class DoctorSchedule extends Model
{
    use FormatsDatesForUi, HasFactory;

    /**
     * Get the doctor profile that owns this schedule.
     *
     * @return BelongsTo<DoctorProfile, DoctorSchedule>
     */
    public function doctor(): BelongsTo
    {
        return $this->belongsTo(DoctorProfile::class, 'doctor_id');
    }
}
