// ─── Base User ─────────────────────────────────────────────────────────────

export type UserRole = 'admin' | 'doctor' | 'patient';
export type UserStatus = 'active' | 'inactive' | 'suspended';

export type CmsUser = {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
};

// ─── Patient Profile ────────────────────────────────────────────────────────

export type PatientProfile = {
    id: number;
    user_id: number;
    phone: string;
    gender: 'male' | 'female' | 'other';
    dob: string | null;
    age?: number | null;
    address: string | null;
    allergies: string | null;
    major_diseases: string | null;
    created_at: string;
    updated_at: string;
    user?: CmsUser;
    appointments?: Appointment[];
};

// ─── Doctor Profile ─────────────────────────────────────────────────────────

export type DoctorProfile = {
    id: number;
    user_id: number;
    specialization: string;
    qualification: string;
    experience: number;
    consultation_fee: number;
    created_at: string;
    updated_at: string;
    user?: CmsUser;
    schedules?: DoctorSchedule[];
    appointments?: Appointment[];
};

// ─── Doctor Schedule ────────────────────────────────────────────────────────

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type DoctorSchedule = {
    id: number;
    doctor_id: number;
    day: DayOfWeek;
    start_time: string;
    end_time: string;
    duration: number;
    created_at: string;
    updated_at: string;
};

// ─── Appointment ────────────────────────────────────────────────────────────

export type AppointmentStatus = 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'no_show' | 'completed';
export type CancelledBy = 'patient' | 'doctor';

export type Appointment = {
    id: number;
    patient_id: number;
    doctor_id: number;
    appointment_date: string;
    appointment_time: string;
    reason: string | null;
    status: AppointmentStatus;
    cancelled_by: CancelledBy | null;
    cancel_reason: string | null;
    reject_reason: string | null;
    created_at: string;
    updated_at: string;
    patient?: PatientProfile;
    doctor?: DoctorProfile;
    consultation?: Consultation;
    bill?: Bill;
};

// ─── Consultation ───────────────────────────────────────────────────────────

export type Consultation = {
    id: number;
    appointment_id: number;
    symptoms: string;
    diagnosis: string;
    notes: string | null;
    created_at: string;
    updated_at: string;
    appointment?: Appointment;
    prescription?: Prescription;
};

// ─── Prescription ───────────────────────────────────────────────────────────

export type Prescription = {
    id: number;
    consultation_id: number;
    instructions: string | null;
    created_at: string;
    updated_at: string;
    consultation?: Consultation;
    items?: PrescriptionItem[];
};

// ─── Prescription Item ──────────────────────────────────────────────────────

export type PrescriptionItem = {
    id: number;
    prescription_id: number;
    medicine_name: string;
    dosage: string;
    frequency: string;
    duration: string;
    created_at: string;
    updated_at: string;
};

// ─── Bill ────────────────────────────────────────────────────────────────────

export type BillStatus = 'unpaid' | 'paid';

export type Bill = {
    id: number;
    appointment_id: number;
    amount: number;
    status: BillStatus;
    created_at: string;
    updated_at: string;
    appointment?: Appointment;
};

// ─── Admin Reporting ───────────────────────────────────────────────────────

export type MonthlyBookingStat = {
    month: string;
    count: number;
};

export type AdminDashboardStats = {
    totalPatients: number;
    totalDoctors: number;
    totalAppointments: number;
    totalClinics: number;
    todayAppointments: number;
    pendingAppointments: number;
    cancelledAppointments: number;
    completedConsultations: number;
    todayRevenue: number;
    monthlyRevenue: number;
    newRegistrations: number;
    revenuePaid: number;
    revenueUnpaid: number;
};

export type DoctorReportRow = {
    name: string;
    specialization: string;
    total_appointments: number;
    completed_appointments: number;
    revenue: number;
};

export type AppointmentStats = {
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
    rejected: number;
    no_show: number;
};

export type SpecialtyStat = {
    specialization: string;
    total: number;
};

export type PeakHourStat = {
    appointment_time: string;
    total: number;
};

export type DoctorAvailabilityStat = {
    id: number;
    user: {
        name: string;
    };
    schedules_count: number;
    appointments_count: number;
};

export type MonthlyRevenueStat = {
    month: string;
    revenue: number;
};

export type DayOfWeekStat = {
    day: string;
    total: number;
};
