<?php

namespace App\Models;

use App\Concerns\FormatsDatesForUi;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $user_id
 * @property string $specialization
 * @property string $qualification
 * @property int $experience
 * @property float $consultation_fee
 * @property float|null $average_rating
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['user_id', 'specialization', 'qualification', 'experience', 'consultation_fee'])]
class DoctorProfile extends Model
{
    use FormatsDatesForUi, HasFactory;

    /**
     * The accessors to append to the model's array form.
     *
     * @var list<string>
     */
    protected $appends = ['average_rating'];

    /**
     * Get the average rating attribute.
     */
    protected function averageRating(): Attribute
    {
        return Attribute::make(
            get: fn ($value, array $attributes) => isset($attributes['reviews_avg_rating'])
                ? round((float) $attributes['reviews_avg_rating'], 1)
                : ($this->relationLoaded('reviews') && $this->reviews->count() > 0
                    ? round((float) $this->reviews->avg('rating'), 1)
                    : null)
        );
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'experience' => 'integer',
            'consultation_fee' => 'decimal:2',
        ];
    }

    /**
     * Get the user that owns the doctor profile.
     *
     * @return BelongsTo<User, DoctorProfile>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the schedules for the doctor.
     *
     * @return HasMany<DoctorSchedule, DoctorProfile>
     */
    public function schedules(): HasMany
    {
        return $this->hasMany(DoctorSchedule::class, 'doctor_id');
    }

    /**
     * Get the appointments for the doctor.
     *
     * @return HasMany<Appointment, DoctorProfile>
     */
    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class, 'doctor_id');
    }

    /**
     * Get the reviews for the doctor.
     *
     * @return HasMany<DoctorReview, DoctorProfile>
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(DoctorReview::class, 'doctor_id');
    }
}
