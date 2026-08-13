<?php

namespace App\Http\Controllers\Pdf;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Response;

class PdfController extends Controller
{
    /**
     * Download the official medical prescription PDF.
     */
    public function downloadPrescription(Appointment $appointment): Response
    {
        $appointment->loadMissing([
            'patient.user',
            'doctor.user',
            'consultation.prescription.items',
        ]);

        $patient = $appointment->patient;
        $doctor = $appointment->doctor;
        $patientUser = $patient?->user;
        $doctorUser = $doctor?->user;

        $patientName = $patientUser?->name ?? 'Patient';
        $rawDoctorName = $doctorUser?->name ?? '';
        $doctorName = $rawDoctorName
            ? (str_starts_with(trim($rawDoctorName), 'Dr.') ? trim($rawDoctorName) : 'Dr. '.trim($rawDoctorName))
            : 'Consultant Doctor';

        $pdf = Pdf::loadView('pdf.prescription', [
            'appointment' => $appointment,
            'patient' => [
                'name' => $patientName,
                'email' => $patientUser?->email,
                'phone' => $patient?->phone ?? $patientUser?->phone,
                'gender' => $patient?->gender,
                'dob' => $patient?->date_of_birth,
            ],
            'patientName' => $patientName,
            'doctor' => $doctor,
            'doctorName' => $doctorName,
            'consultation' => $appointment->consultation,
            'prescription' => $appointment->consultation?->prescription,
        ]);

        $pdf->setPaper('a4', 'portrait');

        $filename = 'Prescription_'.str_replace(' ', '_', $patientName).'_'.$appointment->appointment_date.'.pdf';

        return $pdf->download($filename);
    }

    /**
     * Download the appointment entry pass token PDF.
     */
    public function downloadToken(Appointment $appointment): Response
    {
        $appointment->loadMissing([
            'patient.user',
            'doctor.user',
        ]);

        $patient = $appointment->patient;
        $doctor = $appointment->doctor;
        $patientUser = $patient?->user;
        $doctorUser = $doctor?->user;

        $patientName = $patientUser?->name ?? 'Patient';
        $rawDoctorName = $doctorUser?->name ?? '';
        $doctorName = $rawDoctorName
            ? (str_starts_with(trim($rawDoctorName), 'Dr.') ? trim($rawDoctorName) : 'Dr. '.trim($rawDoctorName))
            : 'Consultant Doctor';

        $tokenNumber = 'TK-'.str_pad((string) $appointment->id, 4, '0', STR_PAD_LEFT);

        $timeStr = $appointment->appointment_time;
        $formattedTime = '';
        if ($timeStr) {
            $parts = explode(':', $timeStr);
            $hour = (int) $parts[0];
            $min = $parts[1] ?? '00';
            $ampm = $hour >= 12 ? 'PM' : 'AM';
            $displayHour = $hour > 12 ? $hour - 12 : ($hour === 0 ? 12 : $hour);
            $formattedTime = "{$displayHour}:{$min} {$ampm}";
        }

        $pdf = Pdf::loadView('pdf.appointment-token', [
            'appointment' => $appointment,
            'patient' => [
                'name' => $patientName,
                'email' => $patientUser?->email,
                'phone' => $patient?->phone ?? $patientUser?->phone,
                'gender' => $patient?->gender,
            ],
            'patientName' => $patientName,
            'doctor' => $doctor,
            'doctorName' => $doctorName,
            'tokenNumber' => $tokenNumber,
            'formattedTime' => $formattedTime,
        ]);

        $pdf->setPaper('a4', 'portrait');

        $filename = "Entry_Token_{$tokenNumber}.pdf";

        return $pdf->download($filename);
    }
}
