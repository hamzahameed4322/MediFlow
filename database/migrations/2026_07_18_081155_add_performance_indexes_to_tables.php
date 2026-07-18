<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->index('role');
            $table->index('status');
        });

        Schema::table('appointments', function (Blueprint $table) {
            $table->index(['doctor_id', 'status', 'appointment_date'], 'idx_doctor_status_date');
            $table->index(['patient_id', 'status', 'appointment_date'], 'idx_patient_status_date');
        });

        Schema::table('doctor_profiles', function (Blueprint $table) {
            $table->index('specialization');
        });

        Schema::table('bills', function (Blueprint $table) {
            $table->index('created_at');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['role']);
            $table->dropIndex(['status']);
        });

        Schema::table('appointments', function (Blueprint $table) {
            $table->dropIndex('idx_doctor_status_date');
            $table->dropIndex('idx_patient_status_date');
        });

        Schema::table('doctor_profiles', function (Blueprint $table) {
            $table->dropIndex(['specialization']);
        });

        Schema::table('bills', function (Blueprint $table) {
            $table->dropIndex(['created_at']);
            $table->dropIndex(['status']);
        });
    }
};
