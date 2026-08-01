import { Head, router, useForm } from '@inertiajs/react';
import { Calendar, Clock, User, X, CheckCircle, AlertCircle, Ticket } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { AppointmentTokenModal } from '@/components/appointment-token-modal';
import { EmptyState } from '@/components/empty-state';
import InputError from '@/components/input-error';
import { Pagination } from '@/components/pagination';
import { AppointmentStatusBadge, CancelledByBadge } from '@/components/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { appointments as patientAppointments } from '@/routes/patient';
import type { Appointment, AppointmentStatus } from '@/types';

type Props = {
    appointments: {
        data: Appointment[];
        links: any;
        meta: any;
    };
    filters?: {
        status?: string;
    };
    counts: {
        pending: number;
        confirmed: number;
    };
    patient?: {
        name?: string;
        email?: string;
        phone?: string;
        gender?: string;
        dob?: string;
    };
};

const TABS: { key: AppointmentStatus | 'all' | 'cancelled_by_patient' | 'cancelled_by_doctor'; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'completed', label: 'Completed' },
    { key: 'cancelled', label: 'Cancelled (All)' },
    { key: 'cancelled_by_patient', label: 'Cancelled by Me' },
    { key: 'cancelled_by_doctor', label: 'Cancelled by Doctor' },
    { key: 'rejected', label: 'Rejected' },
];

export default function Appointments({ appointments, filters, counts, patient }: Props) {
    const activeTab = (filters?.status as AppointmentStatus | 'all' | 'cancelled_by_patient' | 'cancelled_by_doctor') || 'all';
    const [cancelTarget, setCancelTarget] = useState<Appointment | null>(null);
    const [selectedApptForToken, setSelectedApptForToken] = useState<Appointment | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({ cancel_reason: '' });

    const openCancel = (appt: Appointment) => {
        setCancelTarget(appt);
        reset();
    };

    const handleCancel = (e: React.FormEvent) => {
        e.preventDefault();

        if (!cancelTarget) {
return;
}

        post(`/patient/appointments/${cancelTarget.id}/cancel`, {
            onSuccess: () => {
                toast.success('Appointment cancelled successfully.');
                setCancelTarget(null);
            },
            onError: () => toast.error('Failed to cancel appointment.'),
        });
    };

    const formatTime = (time: string) => {
        const [h, m] = time.split(':');
        const hour = parseInt(h);

        return `${hour > 12 ? hour - 12 : hour || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
    };

    return (
        <>
            <Head title="My Appointments" />
            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
                    <p className="text-muted-foreground">Track and manage all your clinic appointments.</p>
                </div>

                {/* Summary Cards */}
                {(counts.pending > 0 || counts.confirmed > 0) && (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {counts.pending > 0 && (
                            <div className="flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                                <AlertCircle className="size-8 text-destructive shrink-0" />
                                <div>
                                    <p className="font-semibold text-destructive">{counts.pending} Pending</p>
                                    <p className="text-xs text-destructive/70">Awaiting doctor review</p>
                                </div>
                            </div>
                        )}
                        {counts.confirmed > 0 && (
                            <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                                <CheckCircle className="size-8 text-primary shrink-0" />
                                <div>
                                    <p className="font-semibold text-primary">{counts.confirmed} Confirmed</p>
                                    <p className="text-xs text-primary/70">Ready for your visit</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Tabs */}
                <div className="flex gap-1 overflow-x-auto rounded-xl border bg-muted/40 p-1">
                    {TABS.map((tab) => {
                        return (
                            <button
                                key={tab.key}
                                onClick={() => {
                                    router.get(
                                        patientAppointments.url(),
                                        { status: tab.key === 'all' ? undefined : tab.key },
                                        {
                                            preserveState: true,
                                            preserveScroll: true,
                                            replace: true,
                                        }
                                    );
                                }}
                                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all ${
                                    activeTab === tab.key
                                        ? 'bg-background text-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Appointments List */}
                {appointments.data.length === 0 ? (
                    <EmptyState icon={Calendar} title="No appointments found" description="No appointments match this filter." />
                ) : (
                    <div className="flex flex-col gap-3">
                        {appointments.data.map((appt) => (
                            <Card key={appt.id} className="transition-shadow hover:shadow-sm">
                                <CardContent className="p-4">
                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                        <div className="flex items-start gap-3">
                                            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold shrink-0 text-sm">
                                                {appt.doctor?.user?.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm">{appt.doctor?.user?.name}</p>
                                                <p className="text-xs text-muted-foreground">{appt.doctor?.specialization}</p>
                                                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                                    <span className="flex items-center gap-1"><Calendar className="size-3" />{appt.appointment_date}</span>
                                                    <span className="flex items-center gap-1"><Clock className="size-3" />{formatTime(appt.appointment_time)}</span>
                                                </div>
                                                {appt.reason && (
                                                    <p className="mt-1.5 text-xs text-muted-foreground italic">"{appt.reason}"</p>
                                                )}
                                                {(appt.status === 'cancelled' || appt.cancelled_by) && (
                                                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                                                        <CancelledByBadge cancelledBy={appt.cancelled_by} />
                                                        {appt.cancel_reason && (
                                                            <p className="text-xs text-red-500">Reason: {appt.cancel_reason}</p>
                                                        )}
                                                    </div>
                                                )}
                                                {appt.reject_reason && (
                                                    <p className="mt-1.5 text-xs text-red-500">Rejected: {appt.reject_reason}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <AppointmentStatusBadge status={appt.status} />
                                            <div className="flex items-center gap-2">
                                                {appt.status === 'confirmed' && (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="text-emerald-700 border-emerald-300 hover:bg-emerald-50 dark:text-emerald-400 dark:border-emerald-800 dark:hover:bg-emerald-950/50 text-xs gap-1.5"
                                                        onClick={() => setSelectedApptForToken(appt)}
                                                    >
                                                        <Ticket className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                                                        Print Token
                                                    </Button>
                                                )}
                                                {(appt.status === 'pending' || appt.status === 'confirmed') && (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="text-red-600 border-red-200 hover:bg-red-50 text-xs"
                                                        onClick={() => openCancel(appt)}
                                                    >
                                                        <X className="mr-1 size-3" /> Cancel
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <Pagination links={appointments?.meta?.links ?? []} meta={appointments?.meta} />
                    </div>
                )}
            </div>

            {/* Cancel Dialog */}
            <Dialog open={!!cancelTarget} onOpenChange={(open) => {
 if (!open) {
setCancelTarget(null);
} 
}}>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Cancel Appointment</DialogTitle>
                        <DialogDescription>
                            Please provide a reason for cancelling your appointment with{' '}
                            <strong>{cancelTarget?.doctor?.user?.name}</strong> on{' '}
                            <strong>{cancelTarget?.appointment_date}</strong>.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCancel} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="cancel_reason">Cancellation Reason</Label>
                            <textarea
                                id="cancel_reason"
                                value={data.cancel_reason}
                                onChange={(e) => setData('cancel_reason', e.target.value)}
                                rows={3}
                                placeholder="Please state your reason..."
                                required
                                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            />
                            <InputError message={errors.cancel_reason} />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setCancelTarget(null)}>Back</Button>
                            <Button type="submit" variant="destructive" disabled={processing}>
                                {processing && <Spinner className="mr-2 size-4" />}
                                Confirm Cancellation
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AppointmentTokenModal
                open={!!selectedApptForToken}
                onOpenChange={(open) => !open && setSelectedApptForToken(null)}
                appointment={selectedApptForToken}
                patient={patient}
            />
        </>
    );
}

Appointments.layout = {
    breadcrumbs: [
        { title: 'My Appointments', href: '/patient/appointments' },
    ],
};
