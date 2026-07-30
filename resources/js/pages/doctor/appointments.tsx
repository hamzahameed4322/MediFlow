import { Head, useForm, router } from '@inertiajs/react';
import { Pagination } from '@/components/pagination';
import {
    CheckCircle,
    CalendarClock,
    MessageSquarePlus,
    XCircle,
    Search,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { EmptyState } from '@/components/empty-state';
import InputError from '@/components/input-error';
import { AppointmentStatusBadge, CancelledByBadge } from '@/components/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { appointments as doctorAppointments } from '@/routes/doctor';
import {
    approve as approveAppointment,
    cancel as cancelAppointment,
    noShow as noShowAppointment,
    reject as rejectAppointment,
} from '@/routes/doctor/appointments';
import consultationAppointment from '@/routes/doctor/appointments/consultation';
import type { Appointment } from '@/types';

type Props = {
    appointments: {
        data: Appointment[];
        links: any;
        meta: any;
    };
    filters?: {
        search?: string;
        status?: string;
    };
};

export default function Appointments({ appointments, filters }: Props) {
    const reviewForm = useForm({
        reject_reason: '',
        cancel_reason: '',
        symptoms: '',
        diagnosis: '',
        notes: '',
        instructions: '',
        medicines: [
            {
                medicine_name: '',
                dosage: '',
                frequency: '',
                duration: '',
            },
        ],
    });
    const [activeAppointment, setActiveAppointment] =
        useState<Appointment | null>(null);
    const [mode, setMode] = useState<'review' | 'consultation' | 'cancel' | null>(
        null,
    );
    const [searchQuery, setSearchQuery] = useState(filters?.search ?? '');
    const [isSearching, setIsSearching] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    function applyFilters(status?: string, search?: string) {
        const q = search !== undefined ? search : searchQuery;
        const s = status !== undefined ? status : (filters?.status ?? 'all');
        router.get(
            doctorAppointments.url(),
            { search: q, status: s },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onFinish: () => setIsSearching(false),
            }
        );
    }

    // Debounced auto-search — fires 450ms after the user stops typing
    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        setIsSearching(true);
        debounceRef.current = setTimeout(() => {
            applyFilters(undefined, searchQuery);
        }, 450);
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

    function openReview(appointment: Appointment) {
        setActiveAppointment(appointment);
        reviewForm.reset();
        setMode('review');
    }

    function openConsultation(appointment: Appointment) {
        setActiveAppointment(appointment);
        reviewForm.reset();
        setMode('consultation');
    }

    function openCancel(appointment: Appointment) {
        setActiveAppointment(appointment);
        reviewForm.reset();
        setMode('cancel');
    }

    function close() {
        setMode(null);
        setActiveAppointment(null);
    }

    function addMedicine() {
        reviewForm.setData('medicines', [
            ...reviewForm.data.medicines,
            { medicine_name: '', dosage: '', frequency: '', duration: '' },
        ]);
    }

    function removeMedicine(index: number) {
        const updated = [...reviewForm.data.medicines];
        updated.splice(index, 1);
        reviewForm.setData('medicines', updated);
    }

    function updateMedicine(index: number, key: string, value: string) {
        const updated = [...reviewForm.data.medicines];
        updated[index] = { ...updated[index], [key]: value };
        reviewForm.setData('medicines', updated);
    }

    function approve() {
        if (!activeAppointment) {
            return;
        }

        reviewForm.post(approveAppointment.url(activeAppointment.id), {
            preserveScroll: true,
            onSuccess: close,
        });
    }

    function reject(e: FormEvent) {
        e.preventDefault();

        if (!activeAppointment) {
            return;
        }

        reviewForm.post(rejectAppointment.url(activeAppointment.id), {
            preserveScroll: true,
            onSuccess: close,
        });
    }

    function cancelAppointmentSubmit(e: FormEvent) {
        e.preventDefault();

        if (!activeAppointment) {
            return;
        }

        if (!reviewForm.data.cancel_reason.trim()) {
            reviewForm.setError('cancel_reason', 'Cancellation reason is required.');
            return;
        }

        reviewForm.post(cancelAppointment.url(activeAppointment.id), {
            preserveScroll: true,
            onSuccess: close,
        });
    }

    function recordConsultation(e: FormEvent) {
        e.preventDefault();

        if (!activeAppointment) {
            return;
        }

        const errors: Record<string, string> = {};

        if (!reviewForm.data.symptoms.trim()) {
            errors.symptoms = 'Symptoms are required.';
        }
        if (!reviewForm.data.diagnosis.trim()) {
            errors.diagnosis = 'Diagnosis is required.';
        }

        reviewForm.data.medicines.forEach((med, index) => {
            if (!med.medicine_name.trim()) {
                errors[`medicines.${index}.medicine_name`] = 'Medicine name is required.';
            }
            if (!med.dosage.trim()) {
                errors[`medicines.${index}.dosage`] = 'Dosage is required.';
            }
            if (!med.frequency.trim()) {
                errors[`medicines.${index}.frequency`] = 'Frequency is required.';
            }
            if (!med.duration.trim()) {
                errors[`medicines.${index}.duration`] = 'Duration is required.';
            }
        });

        if (Object.keys(errors).length > 0) {
            reviewForm.setError(errors);

            return;
        }

        reviewForm.transform((data) => ({
            symptoms: data.symptoms,
            diagnosis: data.diagnosis,
            notes: data.notes,
            instructions: data.instructions,
            medicines: data.medicines,
        }));
        reviewForm.post(
            consultationAppointment.store.url(activeAppointment.id),
            { preserveScroll: true, onSuccess: close },
        );
    }

    function markNoShow(appointment: Appointment) {
        reviewForm.post(noShowAppointment.url(appointment.id), {
            preserveScroll: true,
        });
    }

    return (
        <>
            <Head title="Doctor Appointments" />
            <div className="flex flex-col gap-6 p-6">
                <section className="rounded-[1.75rem] border border-primary/10 bg-linear-to-br from-primary/[0.03] to-primary/[0.07] p-8 text-foreground shadow-xs dark:from-card dark:to-card dark:border-border">
                    <div className="space-y-3">
                        <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-medium tracking-wide text-primary">
                            <CalendarClock className="size-3.5" /> Clinic queue
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight">
                            Appointment review
                        </h1>
                        <p className="max-w-2xl text-sm text-muted-foreground">
                            Review, approve, reject, or complete patient visits
                            with consultation details and prescriptions.
                        </p>
                    </div>
                </section>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
                        <div className="relative w-full sm:max-w-xs">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="appointments-search"
                            type="text"
                            placeholder="Search patients..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="w-full sm:w-auto flex items-center gap-2">
                        <Select
                            value={filters?.status ?? 'all'}
                            onValueChange={(value) => {
                                setIsSearching(true);
                                applyFilters(value, searchQuery);
                            }}
                        >
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled (All)</SelectItem>
                                <SelectItem value="cancelled_by_doctor">Cancelled by Me</SelectItem>
                                <SelectItem value="cancelled_by_patient">Cancelled by Patient</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                                <SelectItem value="no-show">No Show</SelectItem>
                            </SelectContent>
                        </Select>
                        {(filters?.search || (filters?.status && filters?.status !== 'all')) && (
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setSearchQuery('');
                                    router.get(doctorAppointments.url(), {}, { preserveState: true, preserveScroll: true });
                                }}
                            >
                                Clear
                            </Button>
                        )}
                    </div>
                </div>

                {isSearching ? (
                    <div className="grid gap-4 lg:grid-cols-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Card key={i}>
                                <CardContent className="space-y-4 p-5">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-36" />
                                            <Skeleton className="h-3 w-28" />
                                        </div>
                                        <Skeleton className="h-5 w-20 rounded-full" />
                                    </div>
                                    <div className="flex gap-2">
                                        <Skeleton className="h-8 w-20 rounded-lg" />
                                        <Skeleton className="h-8 w-32 rounded-lg" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : appointments?.data?.length === 0 ? (
                    <EmptyState
                        icon={CalendarClock}
                        title="No appointments yet"
                        description="Patient bookings will appear here."
                    />
                ) : (
                    <div className="space-y-6">
                        <div className="grid gap-4 lg:grid-cols-2">
                            {appointments.data.map((appointment) => (
                                <Card key={appointment.id}>
                                    <CardContent className="space-y-4 p-5">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className="text-sm font-semibold">
                                                    {
                                                        appointment.patient?.user
                                                            ?.name
                                                    }
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {appointment.appointment_date}{' '}
                                                    at{' '}
                                                    {appointment.appointment_time.slice(
                                                        0,
                                                        5,
                                                    )}
                                                </p>
                                                {appointment.reason && (
                                                    <p className="mt-2 text-sm text-muted-foreground">
                                                        {appointment.reason}
                                                    </p>
                                                )}
                                                {(appointment.status === 'cancelled' || appointment.cancelled_by) && (
                                                    <div className="mt-2 flex flex-wrap items-center gap-2">
                                                        <CancelledByBadge
                                                            cancelledBy={
                                                                appointment.cancelled_by
                                                            }
                                                        />
                                                        {appointment.cancel_reason && (
                                                            <span className="text-xs font-medium text-destructive">
                                                                Reason: {appointment.cancel_reason}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                                {appointment.reject_reason && (
                                                    <div className="mt-2 flex flex-wrap items-center gap-2">
                                                        <span className="text-xs font-medium text-destructive">
                                                            Rejected: {appointment.reject_reason}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <AppointmentStatusBadge
                                                status={appointment.status}
                                            />
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {appointment.status === 'pending' && (
                                                <Button
                                                    size="sm"
                                                    onClick={() =>
                                                        openReview(appointment)
                                                    }
                                                >
                                                    Review
                                                </Button>
                                            )}
                                            {appointment.status === 'confirmed' && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        openConsultation(
                                                            appointment,
                                                        )
                                                    }
                                                >
                                                    <MessageSquarePlus className="mr-2 size-4" />{' '}
                                                    Record consultation
                                                </Button>
                                            )}
                                            {appointment.status === 'confirmed' && (
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() =>
                                                        markNoShow(appointment)
                                                    }
                                                >
                                                    Mark no-show
                                                </Button>
                                            )}
                                            {appointment.status === 'confirmed' && (
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() =>
                                                        openCancel(appointment)
                                                    }
                                                >
                                                    <XCircle className="mr-2 size-4" />
                                                    Cancel appointment
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <Pagination links={appointments?.meta?.links ?? []} meta={appointments?.meta} />
                    </div>
                )}
            </div>

            <Dialog
                open={mode === 'review'}
                onOpenChange={(open) => {
                    if (!open) {
                        close();
                    }
                }}
            >
                <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Review appointment</DialogTitle>
                        <DialogDescription>
                            {activeAppointment?.patient?.user?.name} •{' '}
                            {activeAppointment?.appointment_date} at{' '}
                            {activeAppointment?.appointment_time.slice(0, 5)}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3">
                        {activeAppointment?.patient && (
                            <div className="grid gap-3 rounded-2xl border bg-muted/30 p-4 text-sm sm:grid-cols-2">
                                <div>
                                    <p className="font-semibold">
                                        {activeAppointment.patient.user?.name}
                                    </p>
                                    <p className="mt-1 text-muted-foreground">
                                        {activeAppointment.patient.gender} ·{' '}
                                        {activeAppointment.patient.phone}
                                    </p>
                                    <p className="mt-1 text-muted-foreground">
                                        Age:{' '}
                                        {patientAge(activeAppointment.patient)}{' '}
                                        years
                                    </p>
                                </div>
                                <div className="space-y-1 text-muted-foreground">
                                    <p>
                                        <span className="font-medium text-foreground">
                                            Allergies:
                                        </span>{' '}
                                        {activeAppointment.patient.allergies ||
                                            'None recorded'}
                                    </p>
                                    <p>
                                        <span className="font-medium text-foreground">
                                            Medical conditions:
                                        </span>{' '}
                                        {activeAppointment.patient
                                            .major_diseases || 'None recorded'}
                                    </p>
                                </div>
                            </div>
                        )}
                        <Button className="w-full" onClick={approve}>
                            <CheckCircle className="mr-2 size-4" /> Approve
                        </Button>
                        <form onSubmit={reject} className="space-y-3">
                            <div className="space-y-2">
                                <Label htmlFor="reject_reason">
                                    Reject reason
                                </Label>
                                <textarea
                                    id="reject_reason"
                                    value={reviewForm.data.reject_reason}
                                    onChange={(e) =>
                                        reviewForm.setData(
                                            'reject_reason',
                                            e.target.value,
                                        )
                                    }
                                    className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                                <InputError
                                    message={reviewForm.errors.reject_reason}
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="destructive"
                                className="w-full"
                            >
                                <XCircle className="mr-2 size-4" /> Reject
                            </Button>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog
                open={mode === 'consultation'}
                onOpenChange={(open) => {
                    if (!open) {
                        close();
                    }
                }}
            >
                <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto sm:max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Record consultation</DialogTitle>
                        <DialogDescription>
                            Enter symptoms, diagnosis, notes, and prescription
                            details.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={recordConsultation} className="space-y-4">
                        {activeAppointment?.patient && (
                            <div className="grid gap-3 rounded-lg border bg-muted/30 p-4 text-sm sm:grid-cols-2">
                                <div>
                                    <p className="font-medium">
                                        {activeAppointment.patient.user?.name}
                                    </p>
                                    <p className="text-muted-foreground">
                                        {activeAppointment.patient.gender} ·{' '}
                                        {activeAppointment.patient.phone}
                                    </p>
                                    <p className="mt-1 text-muted-foreground">
                                        Age:{' '}
                                        {patientAge(activeAppointment.patient)}{' '}
                                        years
                                    </p>
                                </div>
                                <div className="text-muted-foreground">
                                    <p>
                                        Allergies:{' '}
                                        {activeAppointment.patient.allergies ||
                                            'None recorded'}
                                    </p>
                                    <p>
                                        Conditions:{' '}
                                        {activeAppointment.patient
                                            .major_diseases || 'None recorded'}
                                    </p>
                                </div>
                            </div>
                        )}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field
                                label="Symptoms *"
                                error={reviewForm.errors.symptoms}
                            >
                                <textarea
                                    className="min-h-28 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                    value={reviewForm.data.symptoms}
                                    onChange={(e) =>
                                        reviewForm.setData(
                                            'symptoms',
                                            e.target.value,
                                        )
                                    }
                                />
                            </Field>
                            <Field
                                label="Diagnosis *"
                                error={reviewForm.errors.diagnosis}
                            >
                                <textarea
                                    className="min-h-28 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                    value={reviewForm.data.diagnosis}
                                    onChange={(e) =>
                                        reviewForm.setData(
                                            'diagnosis',
                                            e.target.value,
                                        )
                                    }
                                />
                            </Field>
                            <Field
                                label="Notes (Optional)"
                                error={reviewForm.errors.notes}
                            >
                                <textarea
                                    className="min-h-28 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                    value={reviewForm.data.notes}
                                    onChange={(e) =>
                                        reviewForm.setData(
                                            'notes',
                                            e.target.value,
                                        )
                                    }
                                />
                            </Field>
                            <Field
                                label="Instructions (Optional)"
                                error={reviewForm.errors.instructions}
                            >
                                <textarea
                                    className="min-h-28 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                    value={reviewForm.data.instructions}
                                    onChange={(e) =>
                                        reviewForm.setData(
                                            'instructions',
                                            e.target.value,
                                        )
                                    }
                                />
                            </Field>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b pb-2">
                                <h3 className="font-semibold">Prescribed Medicines</h3>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addMedicine}
                                >
                                    + Add Medicine
                                </Button>
                            </div>
                            
                            {reviewForm.data.medicines.map((med, index) => (
                                <div key={index} className="relative grid gap-4 sm:grid-cols-4 bg-muted/20 p-4 rounded-xl border border-dashed">
                                    {reviewForm.data.medicines.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeMedicine(index)}
                                            className="absolute top-2 right-2 text-xs font-semibold text-destructive hover:text-destructive/80 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    )}
                                    <Field
                                        label="Medicine Name *"
                                        error={reviewForm.errors[`medicines.${index}.medicine_name` as any]}
                                    >
                                        <Input
                                            value={med.medicine_name}
                                            onChange={(e) =>
                                                updateMedicine(index, 'medicine_name', e.target.value)
                                            }
                                        />
                                    </Field>
                                    <Field
                                        label="Dosage *"
                                        error={reviewForm.errors[`medicines.${index}.dosage` as any]}
                                    >
                                        <Input
                                            value={med.dosage}
                                            onChange={(e) =>
                                                updateMedicine(index, 'dosage', e.target.value)
                                            }
                                        />
                                    </Field>
                                    <Field
                                        label="Frequency *"
                                        error={reviewForm.errors[`medicines.${index}.frequency` as any]}
                                    >
                                        <Input
                                            value={med.frequency}
                                            onChange={(e) =>
                                                updateMedicine(index, 'frequency', e.target.value)
                                            }
                                        />
                                    </Field>
                                    <Field
                                        label="Duration *"
                                        error={reviewForm.errors[`medicines.${index}.duration` as any]}
                                    >
                                        <Input
                                            value={med.duration}
                                            onChange={(e) =>
                                                updateMedicine(index, 'duration', e.target.value)
                                            }
                                        />
                                    </Field>
                                </div>
                            ))}
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={close}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={reviewForm.processing}
                            >
                                {reviewForm.processing && (
                                    <Spinner className="mr-2 size-4" />
                                )}
                                Save consultation
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog
                open={mode === 'cancel'}
                onOpenChange={(open) => {
                    if (!open) {
                        close();
                    }
                }}
            >
                <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Cancel appointment</DialogTitle>
                        <DialogDescription>
                            {activeAppointment?.patient?.user?.name} •{' '}
                            {activeAppointment?.appointment_date} at{' '}
                            {activeAppointment?.appointment_time.slice(0, 5)}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={cancelAppointmentSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="cancel_reason">
                                Cancellation reason
                            </Label>
                            <textarea
                                id="cancel_reason"
                                value={reviewForm.data.cancel_reason}
                                onChange={(e) =>
                                    reviewForm.setData(
                                        'cancel_reason',
                                        e.target.value,
                                    )
                                }
                                placeholder="Please provide a reason for cancelling this appointment..."
                                className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                required
                            />
                            <InputError
                                message={reviewForm.errors.cancel_reason}
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={close}
                            >
                                Close
                            </Button>
                            <Button
                                type="submit"
                                variant="destructive"
                                disabled={reviewForm.processing}
                            >
                                {reviewForm.processing ? (
                                    <Spinner className="mr-2 size-4" />
                                ) : (
                                    <XCircle className="mr-2 size-4" />
                                )}
                                Confirm cancellation
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

function Field({
    label,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: ReactNode;
}) {
    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            {children}
            <InputError message={error} />
        </div>
    );
}

function patientAge(patient: NonNullable<Appointment['patient']>): number {
    if (patient.age !== null && patient.age !== undefined) {
        return patient.age;
    }

    if (!patient.dob) {
        return 0;
    }

    const dateOfBirth = new Date(patient.dob);
    const today = new Date();
    const hasHadBirthday =
        today.getMonth() > dateOfBirth.getMonth() ||
        (today.getMonth() === dateOfBirth.getMonth() &&
            today.getDate() >= dateOfBirth.getDate());

    return (
        today.getFullYear() -
        dateOfBirth.getFullYear() -
        (hasHadBirthday ? 0 : 1)
    );
}

Appointments.layout = {
    breadcrumbs: [
        { title: 'Doctor Appointments', href: doctorAppointments.url() },
    ],
};
