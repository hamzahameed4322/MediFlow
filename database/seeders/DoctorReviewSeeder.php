<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\Consultation;
use App\Models\DoctorProfile;
use App\Models\DoctorReview;
use App\Models\PatientProfile;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class DoctorReviewSeeder extends Seeder
{
    /**
     * Seed realistic professional reviews for completed appointments.
     * Keeps existing users intact and generates additional completed appointments if needed.
     */
    public function run(): void
    {
        $doctors = DoctorProfile::with('user')->get();
        $patients = PatientProfile::with('user')->get();

        if ($doctors->isEmpty() || $patients->isEmpty()) {
            $this->command->info('No doctors or patients found. Please seed users first.');

            return;
        }

        $reviewTemplates = [
            5 => [
                'Dr. %s is an outstanding specialist. Very thorough in diagnosis and explains every detail clearly.',
                'Excellent bedside manner and very professional consultation. Highly recommended!',
                'The doctor listened patiently to all my symptoms and gave a very effective treatment plan.',
                'Very polite, courteous, and knowledgeable. The clinic experience was seamless.',
                null, // Optional comment (rating only)
            ],
            4 => [
                'Good experience overall. Dr. %s was knowledgeable and polite, though the wait time was a few minutes over.',
                'Very helpful advice and clear prescription instructions. Happy with the care.',
                'Professional consultation and friendly staff.',
                null, // Optional comment (rating only)
            ],
            3 => [
                'The consultation was decent, but I felt the session was a bit rushed. Good diagnosis regardless.',
            ],
        ];

        // Ensure each doctor has at least 5 completed appointments so we can observe the 4-5 latest reviews UI
        foreach ($doctors as $doctor) {
            $completedCount = Appointment::where('doctor_id', $doctor->id)
                ->where('status', 'completed')
                ->count();

            $needed = max(0, 5 - $completedCount);

            for ($i = 0; $i < $needed; $i++) {
                $patient = $patients->random();
                $date = Carbon::now()->subDays(rand(1, 45));

                $appointment = Appointment::create([
                    'patient_id' => $patient->id,
                    'doctor_id' => $doctor->id,
                    'appointment_date' => $date->toDateString(),
                    'appointment_time' => sprintf('%02d:%02d:00', rand(9, 16), rand(0, 1) * 30),
                    'reason' => 'Historical follow-up checkup',
                    'status' => 'completed',
                    'created_at' => $date,
                    'updated_at' => $date,
                ]);

                Consultation::create([
                    'appointment_id' => $appointment->id,
                    'symptoms' => 'Routine follow-up symptoms.',
                    'diagnosis' => 'Stable condition.',
                    'notes' => 'Patient advised to continue standard care.',
                ]);
            }
        }

        // Now seed reviews for all completed appointments that don't have one yet
        $completedAppointments = Appointment::with(['doctor.user', 'patient'])
            ->where('status', 'completed')
            ->get();

        $count = 0;
        foreach ($completedAppointments as $appointment) {
            if (DoctorReview::where('appointment_id', $appointment->id)->exists()) {
                continue;
            }

            // Mostly 5 and 4 star ratings, occasionally 3 star
            $ratingPool = [5, 5, 5, 4, 4, 3];
            $rating = $ratingPool[array_rand($ratingPool)];
            $templates = $reviewTemplates[$rating];
            $commentTemplate = $templates[array_rand($templates)];

            $comment = $commentTemplate
                ? sprintf($commentTemplate, $appointment->doctor?->user?->name ?: 'Doctor')
                : null;

            DoctorReview::create([
                'appointment_id' => $appointment->id,
                'patient_id' => $appointment->patient_id,
                'doctor_id' => $appointment->doctor_id,
                'rating' => $rating,
                'comment' => $comment,
                'created_at' => Carbon::parse($appointment->appointment_date)->addHours(2),
                'updated_at' => Carbon::parse($appointment->appointment_date)->addHours(2),
            ]);

            $count++;
        }

        $this->command->info("Successfully seeded {$count} professional reviews across all doctors!");
    }
}
