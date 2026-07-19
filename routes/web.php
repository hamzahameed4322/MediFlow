<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/email/verify/{id}/{hash}', VerifyEmailController::class)
    ->middleware(['auth'])
    ->name('verification.verify');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
});

// Admin routes
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('users', [AdminController::class, 'users'])->name('users');
    Route::post('users/{user}/toggle-status', [AdminController::class, 'toggleUserStatus'])->name('users.toggle-status');

    Route::get('doctors', [AdminController::class, 'doctors'])->name('doctors');
    Route::post('doctors', [AdminController::class, 'storeDoctor'])->name('doctors.store');
    Route::put('doctors/{doctor}', [AdminController::class, 'updateDoctor'])->name('doctors.update');
    Route::post('doctors/{doctor}/toggle-status', [AdminController::class, 'toggleDoctorStatus'])->name('doctors.toggle-status');

    Route::get('appointments', [AdminController::class, 'appointments'])->name('appointments');
    Route::get('consultations', [AdminController::class, 'consultations'])->name('consultations');
    Route::get('prescriptions', [AdminController::class, 'prescriptions'])->name('prescriptions');
    Route::get('bills', [AdminController::class, 'bills'])->name('bills');
    Route::get('reports', [AdminController::class, 'reports'])->name('reports');
});

// Doctor routes
Route::middleware(['auth', 'verified', 'role:doctor'])->prefix('doctor')->name('doctor.')->group(function () {
    Route::get('dashboard', [DoctorController::class, 'dashboard'])->name('dashboard');
    Route::get('profile', [DoctorController::class, 'editProfile'])->name('profile.edit');
    Route::put('profile', [DoctorController::class, 'updateProfile'])->name('profile.update');

    Route::get('schedules', [DoctorController::class, 'schedules'])->name('schedules');
    Route::post('schedules', [DoctorController::class, 'storeSchedule'])->name('schedules.store');
    Route::delete('schedules/{schedule}', [DoctorController::class, 'deleteSchedule'])->name('schedules.destroy');

    Route::get('appointments', [DoctorController::class, 'appointments'])->name('appointments');
    Route::post('appointments/{appointment}/approve', [DoctorController::class, 'approveAppointment'])->name('appointments.approve');
    Route::post('appointments/{appointment}/reject', [DoctorController::class, 'rejectAppointment'])->name('appointments.reject');
    Route::post('appointments/{appointment}/cancel', [DoctorController::class, 'cancelAppointment'])->name('appointments.cancel');
    Route::post('appointments/{appointment}/no-show', [DoctorController::class, 'markNoShow'])->name('appointments.no-show');

    Route::post('appointments/{appointment}/consultation', [DoctorController::class, 'storeConsultation'])->name('appointments.consultation.store');

    Route::get('bills', [DoctorController::class, 'bills'])->name('bills');
    Route::post('bills/{bill}/pay', [DoctorController::class, 'markBillPaid'])->name('bills.pay');

    Route::get('patient-history/{patient}', [DoctorController::class, 'patientHistory'])->name('patient-history');
});

// Patient routes
Route::middleware(['auth', 'verified', 'role:patient'])->prefix('patient')->name('patient.')->group(function () {
    Route::get('dashboard', [PatientController::class, 'dashboard'])->name('dashboard');
    Route::get('profile', [PatientController::class, 'editProfile'])->name('profile.edit');
    Route::put('profile', [PatientController::class, 'updateProfile'])->name('profile.update');

    Route::get('doctors', [PatientController::class, 'browseDoctors'])->name('doctors');
    Route::get('doctors/{doctor}/slots', [PatientController::class, 'availableSlots'])->name('doctors.slots');
    Route::post('appointments', [PatientController::class, 'bookAppointment'])->name('appointments.store');
    Route::get('appointments', [PatientController::class, 'appointments'])->name('appointments');
    Route::post('appointments/{appointment}/cancel', [PatientController::class, 'cancelAppointment'])->name('appointments.cancel');

    Route::get('bills', [PatientController::class, 'bills'])->name('bills');
    Route::get('medical-history', [PatientController::class, 'medicalHistory'])->name('medical-history');
});

require __DIR__.'/settings.php';
Route::get('/test-email', function () { try { Illuminate\Support\Facades\Mail::raw('Test from production', function($msg) { $msg->to('hamzahameed4322@gmail.com')->subject('Prod Test'); }); return 'SUCCESS'; } catch (\Exception $e) { return $e->getMessage(); } });
