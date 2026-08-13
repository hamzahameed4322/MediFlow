<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\Bill;
use App\Models\Consultation;
use App\Models\DoctorProfile;
use App\Models\DoctorSchedule;
use App\Models\PatientProfile;
use App\Models\Prescription;
use App\Models\PrescriptionItem;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Admin
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@clinic.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'status' => 'active',
        ]);

        // 2. Create Doctors and Profiles
        $doc1 = User::factory()->create([
            'name' => 'Dr. Jane Smith',
            'email' => 'jane.smith@clinic.com',
            'password' => Hash::make('password'),
            'role' => 'doctor',
            'status' => 'active',
        ]);
        $docProfile1 = DoctorProfile::create([
            'user_id' => $doc1->id,
            'specialization' => 'Cardiologist',
            'qualification' => 'MBBS, MD',
            'experience' => 12,
            'consultation_fee' => 150.00,
        ]);

        $doc2 = User::factory()->create([
            'name' => 'Dr. Robert Chen',
            'email' => 'robert.chen@clinic.com',
            'password' => Hash::make('password'),
            'role' => 'doctor',
            'status' => 'active',
        ]);
        $docProfile2 = DoctorProfile::create([
            'user_id' => $doc2->id,
            'specialization' => 'Pediatrician',
            'qualification' => 'MBBS, FCPS',
            'experience' => 8,
            'consultation_fee' => 100.00,
        ]);

        $doc3 = User::factory()->create([
            'name' => 'Dr. Sarah Taylor',
            'email' => 'sarah.taylor@clinic.com',
            'password' => Hash::make('password'),
            'role' => 'doctor',
            'status' => 'active',
        ]);
        $docProfile3 = DoctorProfile::create([
            'user_id' => $doc3->id,
            'specialization' => 'Dermatologist',
            'qualification' => 'MBBS, MS',
            'experience' => 15,
            'consultation_fee' => 120.00,
        ]);

        // 3. Create Doctor Schedules
        $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        foreach ([$docProfile1, $docProfile2, $docProfile3] as $index => $profile) {
            DoctorSchedule::create([
                'doctor_id' => $profile->id,
                'day' => $days[$index * 2 % 5],
                'start_time' => '09:00:00',
                'end_time' => '13:00:00',
                'duration' => 30,
            ]);
            DoctorSchedule::create([
                'doctor_id' => $profile->id,
                'day' => $days[($index * 2 + 1) % 5],
                'start_time' => '14:00:00',
                'end_time' => '18:00:00',
                'duration' => 30,
            ]);
        }

        // 4. Create Patients and Profiles
        $patientData = [
            ['name' => 'Alice Green', 'email' => 'alice@example.com', 'gender' => 'female', 'dob' => '1995-05-15', 'phone' => '03001234567', 'allergies' => 'Penicillin', 'diseases' => 'None'],
            ['name' => 'Charlie Brown', 'email' => 'charlie@example.com', 'gender' => 'male', 'dob' => '1990-08-20', 'phone' => '03019876543', 'allergies' => 'None', 'diseases' => 'Asthma'],
            ['name' => 'John Doe', 'email' => 'john@example.com', 'gender' => 'male', 'dob' => '1985-02-10', 'phone' => '03025550192', 'allergies' => 'Sulfa drugs', 'diseases' => 'Hypertension'],
            ['name' => 'Emily Watson', 'email' => 'emily@example.com', 'gender' => 'female', 'dob' => '1988-11-30', 'phone' => '03034442039', 'allergies' => 'Aspirin', 'diseases' => 'Diabetes Type II'],
            ['name' => 'David Miller', 'email' => 'david@example.com', 'gender' => 'male', 'dob' => '2000-07-04', 'phone' => '03043338921', 'allergies' => 'None', 'diseases' => 'None'],
        ];

        $patientProfiles = [];
        foreach ($patientData as $p) {
            $user = User::factory()->create([
                'name' => $p['name'],
                'email' => $p['email'],
                'password' => Hash::make('password'),
                'role' => 'patient',
                'status' => 'active',
            ]);
            $patientProfiles[] = PatientProfile::create([
                'user_id' => $user->id,
                'phone' => $p['phone'],
                'gender' => $p['gender'],
                'dob' => $p['dob'],
                'address' => 'Street '.rand(1, 100).', City Center',
                'allergies' => $p['allergies'],
                'major_diseases' => $p['diseases'],
            ]);
        }

        // 5. Seed Appointments
        // We'll generate historical appointments for the last 3 months
        $doctors = [$docProfile1, $docProfile2, $docProfile3];
        $reasons = ['Routine checkup', 'Follow-up visit', 'General consultation', 'Chronic issue review', 'Symptoms check'];
        $symptoms = ['Mild headache and fatigue.', 'Dry cough and sore throat.', 'Skin rash and itching on back.', 'Shortness of breath during stairs.', 'Slight fever and congestion.'];
        $diagnoses = ['Allergic reaction.', 'Acute bronchitis.', 'Contact dermatitis.', 'Mild heart strain.', 'Common cold.'];
        $meds = [
            ['name' => 'Panadol Extra', 'dosage' => '500mg', 'frequency' => 'Twice daily', 'duration' => '5 days'],
            ['name' => 'Amoxicillin Cap', 'dosage' => '250mg', 'frequency' => 'Thrice daily', 'duration' => '7 days'],
            ['name' => 'Hydrocortisone Cream', 'dosage' => '1%', 'frequency' => 'Apply twice daily', 'duration' => '10 days'],
            ['name' => 'Lisinopril Tab', 'dosage' => '10mg', 'frequency' => 'Once daily', 'duration' => '30 days'],
            ['name' => 'Cough Syrup', 'dosage' => '10ml', 'frequency' => 'Three times daily', 'duration' => '5 days'],
        ];

        // 5a. Completed historical appointments (last 90 days)
        for ($i = 0; $i < 15; $i++) {
            $date = Carbon::now()->subDays(rand(1, 90));
            $doctor = $doctors[rand(0, 2)];
            $patient = $patientProfiles[rand(0, 4)];

            $app = Appointment::create([
                'patient_id' => $patient->id,
                'doctor_id' => $doctor->id,
                'appointment_date' => $date->toDateString(),
                'appointment_time' => sprintf('%02d:%02d:00', rand(9, 17), rand(0, 1) * 30),
                'reason' => $reasons[rand(0, 4)],
                'status' => 'completed',
            ]);

            // Add Consultation
            $consult = Consultation::create([
                'appointment_id' => $app->id,
                'symptoms' => $symptoms[rand(0, 4)],
                'diagnosis' => $diagnoses[rand(0, 4)],
                'notes' => 'Patient advised to follow up if symptoms persist.',
            ]);

            // Add Prescription
            $prescription = Prescription::create([
                'consultation_id' => $consult->id,
                'instructions' => 'Follow dosage directions carefully. Drink plenty of water.',
            ]);

            // Add 1 or 2 items
            $numItems = rand(1, 2);
            for ($j = 0; $j < $numItems; $j++) {
                $medInfo = $meds[rand(0, 4)];
                PrescriptionItem::create([
                    'prescription_id' => $prescription->id,
                    'medicine_name' => $medInfo['name'],
                    'dosage' => $medInfo['dosage'],
                    'frequency' => $medInfo['frequency'],
                    'duration' => $medInfo['duration'],
                ]);
            }

            // Add Bill
            Bill::create([
                'appointment_id' => $app->id,
                'amount' => $doctor->consultation_fee,
                'status' => rand(1, 10) > 2 ? 'paid' : 'unpaid', // 80% paid bills
                'created_at' => $date,
                'updated_at' => $date,
            ]);
        }

        // 5b. Today's Appointments (Confirmed)
        foreach ($doctors as $index => $doctor) {
            $patient = $patientProfiles[$index % 5];
            Appointment::create([
                'patient_id' => $patient->id,
                'doctor_id' => $doctor->id,
                'appointment_date' => Carbon::now()->toDateString(),
                'appointment_time' => sprintf('%02d:%02d:00', 9 + $index, 0),
                'reason' => 'Today checkup',
                'status' => 'confirmed',
            ]);
        }

        // 5c. Pending Appointments (Future)
        for ($i = 0; $i < 4; $i++) {
            $doctor = $doctors[$i % 3];
            $patient = $patientProfiles[($i + 1) % 5];
            Appointment::create([
                'patient_id' => $patient->id,
                'doctor_id' => $doctor->id,
                'appointment_date' => Carbon::now()->addDays(rand(1, 7))->toDateString(),
                'appointment_time' => sprintf('%02d:%02d:00', rand(10, 16), 30),
                'reason' => 'Consultation Request '.($i + 1),
                'status' => 'pending',
            ]);
        }

        // 5d. Cancelled Appointments (Patient & Doctor)
        Appointment::create([
            'patient_id' => $patientProfiles[0]->id,
            'doctor_id' => $docProfile1->id,
            'appointment_date' => Carbon::now()->subDays(2)->toDateString(),
            'appointment_time' => '11:30:00',
            'reason' => 'Fever check',
            'status' => 'cancelled',
            'cancelled_by' => 'patient',
            'cancel_reason' => 'Not feeling well to travel',
        ]);
        Appointment::create([
            'patient_id' => $patientProfiles[1]->id,
            'doctor_id' => $docProfile2->id,
            'appointment_date' => Carbon::now()->subDays(1)->toDateString(),
            'appointment_time' => '15:00:00',
            'reason' => 'Cough review',
            'status' => 'cancelled',
            'cancelled_by' => 'doctor',
            'cancel_reason' => 'Doctor unavailable due to emergency meeting',
        ]);

        // 5e. Rejected Appointment
        Appointment::create([
            'patient_id' => $patientProfiles[2]->id,
            'doctor_id' => $docProfile3->id,
            'appointment_date' => Carbon::now()->subDays(3)->toDateString(),
            'appointment_time' => '14:30:00',
            'reason' => 'Rash review',
            'status' => 'rejected',
            'reject_reason' => 'Out of town on this date',
        ]);

        // 5f. No-Show Appointment
        Appointment::create([
            'patient_id' => $patientProfiles[3]->id,
            'doctor_id' => $docProfile1->id,
            'appointment_date' => Carbon::now()->subDays(4)->toDateString(),
            'appointment_time' => '10:00:00',
            'reason' => 'Heart palpitation follow up',
            'status' => 'no_show',
        ]);

        // 6. Seed Doctor Reviews for completed appointments
        $this->call(DoctorReviewSeeder::class);
    }
}
