import { Head, Link } from '@inertiajs/react';
import {
    Clock,
    Users,
    AlertCircle,
    CheckCircle,
    Calendar,
    ChevronRight,
} from 'lucide-react';
import { EmptyState } from '@/components/empty-state';
import { AppointmentStatusBadge } from '@/components/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import {
    appointments as doctorAppointments,
    dashboard as doctorDashboard,
} from '@/routes/doctor';
import type { Appointment, PatientProfile } from '@/types';

type Props = {
    todayAppointments: Appointment[];
    pendingRequests: Appointment[];
    recentPatients: PatientProfile[];
};

const formatTime = (time: string) => {
    const [h, m] = time.split(':');
    const hour = parseInt(h);

    return `${hour > 12 ? hour - 12 : hour || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
};

export default function Dashboard({
    todayAppointments = [],
    pendingRequests = [],
    recentPatients = [],
}: Props) {
    return (
        <>
            <Head title="Doctor Dashboard" />
            <div className="flex flex-col gap-6 p-6">
                <section className="overflow-hidden rounded-[1.75rem] border border-primary/10 bg-linear-to-br from-primary/[0.03] to-primary/[0.07] text-foreground shadow-xs dark:from-card dark:to-card dark:border-border">
                    <div className="flex flex-wrap items-end justify-between gap-6 p-7 sm:p-9">
                        <div className="space-y-3">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-medium tracking-wide text-primary">
                                <Calendar className="size-3.5" /> Clinical
                                workspace
                            </p>
                            <div>
                                <h1 className="text-3xl font-semibold tracking-tight">
                                    Today&apos;s clinic queue
                                </h1>
                                <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                                    Review appointment requests, prepare for
                                    visits, and maintain complete patient
                                    records with clarity.
                                </p>
                            </div>
                        </div>
                        <Button
                            asChild
                        >
                            <Link href={doctorAppointments.url()}>
                                View All Appointments{' '}
                                <ChevronRight className="ml-1 size-4" />
                            </Link>
                        </Button>
                    </div>
                </section>

                {/* Summary Cards */}
                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-sm">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-sky-500/10">
                            <Calendar className="size-6 text-sky-600" />
                        </div>
                        <div>
                            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                Today
                            </p>
                            <p className="text-2xl font-bold">
                                {todayAppointments.length}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                appointments
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-sm">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-destructive/10">
                            <AlertCircle className="size-6 text-destructive" />
                        </div>
                        <div>
                            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                Pending
                            </p>
                            <p className="text-2xl font-bold">
                                {pendingRequests.length}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                need review
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-sm">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10">
                            <Users className="size-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                Recent
                            </p>
                            <p className="text-2xl font-bold">
                                {recentPatients.length}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                patients
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Today's Schedule */}
                    <Card className="border-muted/60 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="size-5 text-primary" />
                                Today's Schedule
                            </CardTitle>
                            <CardDescription>
                                Confirmed appointments for today.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {todayAppointments.length === 0 ? (
                                <EmptyState
                                    icon={Calendar}
                                    title="No appointments today"
                                    description="Your confirmed appointments will appear here."
                                />
                            ) : (
                                <div className="space-y-2">
                                    {todayAppointments.map((appt) => (
                                        <div
                                            key={appt.id}
                                            className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/30"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                                    {appt.patient?.user?.name
                                                        ?.charAt(0)
                                                        .toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {
                                                            appt.patient?.user
                                                                ?.name
                                                        }
                                                    </p>
                                                    {appt.reason && (
                                                        <p className="max-w-48 truncate text-xs text-muted-foreground italic">
                                                            {appt.reason}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex shrink-0 items-center gap-2">
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs"
                                                >
                                                    {formatTime(
                                                        appt.appointment_time,
                                                    )}
                                                </Badge>
                                                <AppointmentStatusBadge
                                                    status={appt.status}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Pending Requests */}
                    <Card className="border-muted/60 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertCircle className="size-5 text-destructive" />
                                Pending Requests
                            </CardTitle>
                            <CardDescription>
                                Appointments waiting for your review.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {pendingRequests.length === 0 ? (
                                <EmptyState
                                    icon={CheckCircle}
                                    title="No pending requests"
                                    description="All caught up! No appointments need your review."
                                />
                            ) : (
                                <div className="space-y-2">
                                    {pendingRequests.map((appt) => (
                                        <div
                                            key={appt.id}
                                            className="flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 p-3"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-xs font-bold text-destructive">
                                                    {appt.patient?.user?.name
                                                        ?.charAt(0)
                                                        .toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {
                                                            appt.patient?.user
                                                                ?.name
                                                        }
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {appt.appointment_date}{' '}
                                                        at{' '}
                                                        {formatTime(
                                                            appt.appointment_time,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button size="sm" asChild>
                                                <Link
                                                    href={doctorAppointments.url()}
                                                >
                                                    Review
                                                </Link>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Patients */}
                {recentPatients.length > 0 && (
                    <Card className="border-muted/60 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="size-5 text-green-500" />
                                Recent Patients
                            </CardTitle>
                            <CardDescription>
                                Patients you've recently seen.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {recentPatients.map((patient) => (
                                    <div
                                        key={patient.id}
                                        className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/30"
                                    >
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-sm font-semibold text-green-600">
                                            {patient.user?.name
                                                ?.charAt(0)
                                                .toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium">
                                                {patient.user?.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground capitalize">
                                                {patient.gender} •{' '}
                                                {patient.phone}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [{ title: 'Doctor Dashboard', href: doctorDashboard.url() }],
};
