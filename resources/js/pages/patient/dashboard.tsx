import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    CalendarDays,
    ClipboardList,
    CreditCard,
    ReceiptText,
    Stethoscope,
} from 'lucide-react';
import { EmptyState } from '@/components/empty-state';
import {
    AppointmentStatusBadge,
    BillStatusBadge,
} from '@/components/status-badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    appointments as patientAppointments,
    bills as patientBills,
    dashboard as patientDashboard,
    doctors as patientDoctors,
    medicalHistory as patientMedicalHistory,
} from '@/routes/patient';
import type { Appointment, Bill, Prescription } from '@/types';

type Props = {
    upcomingAppointment: Appointment | null;
    latestPrescription: Prescription | null;
    recentBills: Bill[];
};

export default function Dashboard({
    upcomingAppointment,
    latestPrescription,
    recentBills,
}: Props) {
    const outstandingBalance = recentBills
        .filter((bill) => bill.status === 'unpaid')
        .reduce((total, bill) => total + Number(bill.amount), 0);
    const unpaidBills = recentBills.filter((bill) => bill.status === 'unpaid');
    const latestDoctor =
        latestPrescription?.consultation?.appointment?.doctor?.user?.name;

    return (
        <>
            <Head title="Patient Dashboard" />

            <div className="flex flex-col gap-6 p-6">
                <section className="overflow-hidden rounded-[1.75rem] border border-primary/10 bg-linear-to-br from-primary/[0.03] to-primary/[0.07] text-foreground shadow-xs dark:from-card dark:to-card dark:border-border">
                    <div className="flex flex-col justify-between gap-6 p-7 sm:p-9 lg:flex-row lg:items-center">
                        <div className="space-y-3">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-medium tracking-wide text-primary">
                                <Stethoscope className="size-3.5" /> Your clinic
                                portal
                            </p>
                            <div>
                                <h1 className="text-3xl font-semibold tracking-tight">
                                    Your care, in one place.
                                </h1>
                                <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                                    Stay prepared for your next visit, review
                                    prescriptions, and keep track of clinic
                                    bills.
                                </p>
                            </div>
                        </div>
                        <Button
                            asChild
                        >
                            <Link href={patientDoctors.url()}>
                                Book an appointment{' '}
                                <ArrowRight className="ml-2 size-4" />
                            </Link>
                        </Button>
                    </div>
                </section>

                <div className="grid gap-4 lg:grid-cols-3">
                    <Card className="flex flex-col border-muted/60 shadow-sm">
                        <CardHeader>
                            <div className="flex items-center gap-2 text-sky-600">
                                <CalendarDays className="size-5" />
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase">
                                    Next visit
                                </span>
                            </div>
                            <CardTitle className="mt-2">
                                Upcoming appointment
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1">
                            {upcomingAppointment ? (
                                <div className="rounded-2xl border bg-muted/30 p-4">
                                    <p className="font-semibold">
                                        {upcomingAppointment.doctor?.user
                                            ?.name ?? 'Your doctor'}
                                    </p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {upcomingAppointment.doctor
                                            ?.specialization ??
                                            'Clinic consultation'}
                                    </p>
                                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                                        <span className="rounded-full bg-background px-2.5 py-1 font-medium">
                                            {
                                                upcomingAppointment.appointment_date
                                            }
                                        </span>
                                        <span className="rounded-full bg-background px-2.5 py-1 font-medium">
                                            {upcomingAppointment.appointment_time.slice(
                                                0,
                                                5,
                                            )}
                                        </span>
                                        <AppointmentStatusBadge
                                            status={upcomingAppointment.status}
                                        />
                                    </div>
                                    {upcomingAppointment.reason && (
                                        <p className="mt-3 text-xs leading-5 text-muted-foreground">
                                            Reason: {upcomingAppointment.reason}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <EmptyState
                                    icon={CalendarDays}
                                    title="No upcoming visit"
                                    description="Choose a doctor and request a time that works for you."
                                />
                            )}
                        </CardContent>
                        <CardContent className="pt-0">
                            <Button
                                asChild
                                className="w-full"
                                variant="outline"
                            >
                                <Link href={patientAppointments.url()}>
                                    View appointments
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col border-muted/60 shadow-sm">
                        <CardHeader>
                            <div className="flex items-center gap-2 text-primary">
                                <ClipboardList className="size-5" />
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase">
                                    Medical guidance
                                </span>
                            </div>
                            <CardTitle className="mt-2">
                                Latest prescription
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1">
                            {latestPrescription ? (
                                <div className="space-y-3 rounded-2xl border bg-muted/30 p-4">
                                    <div>
                                        <p className="font-semibold">
                                            {latestDoctor
                                                ? `Dr. ${latestDoctor}`
                                                : 'Latest prescription'}
                                        </p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            Issued{' '}
                                            {latestPrescription.created_at.slice(
                                                0,
                                                10,
                                            )}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        {(latestPrescription.items ?? [])
                                            .slice(0, 2)
                                            .map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center justify-between gap-3 text-sm"
                                                >
                                                    <span className="font-medium">
                                                        {item.medicine_name}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {item.dosage}
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ) : (
                                <EmptyState
                                    icon={ClipboardList}
                                    title="No prescriptions yet"
                                    description="Prescriptions appear here after a completed consultation."
                                />
                            )}
                        </CardContent>
                        <CardContent className="pt-0">
                            <Button
                                asChild
                                className="w-full"
                                variant="outline"
                            >
                                <Link href={patientMedicalHistory.url()}>
                                    View medical history
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col border-muted/60 shadow-sm">
                        <CardHeader>
                            <div className="flex items-center gap-2 text-destructive">
                                <CreditCard className="size-5" />
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase">
                                    Billing
                                </span>
                            </div>
                            <CardTitle className="mt-2">
                                Outstanding balance
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="rounded-2xl border bg-muted/30 p-4">
                                <p className="text-3xl font-semibold tracking-tight">
                                    ${outstandingBalance.toFixed(2)}
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Physical payment is collected at the clinic.
                                </p>
                                <p className="mt-4 text-xs text-muted-foreground">
                                    {unpaidBills.length} unpaid bill
                                    {unpaidBills.length === 1 ? '' : 's'}
                                </p>
                            </div>
                        </CardContent>
                        <CardContent className="pt-0">
                            <Button
                                asChild
                                className="w-full"
                                variant="outline"
                            >
                                <Link href={patientBills.url()}>
                                    View bills
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-muted/60 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ReceiptText className="size-5 text-primary" />{' '}
                            Recent billing activity
                        </CardTitle>
                        <CardDescription>
                            Your latest consultation charges and settlement
                            status.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {recentBills.length === 0 ? (
                            <EmptyState
                                icon={ReceiptText}
                                title="No billing records"
                                description="Bills are created after a completed consultation."
                            />
                        ) : (
                            <div className="space-y-3">
                                {recentBills.map((bill) => (
                                    <div
                                        key={bill.id}
                                        className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-4"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                {bill.appointment?.doctor?.user
                                                    ?.name ??
                                                    'Clinic consultation'}
                                            </p>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {bill.appointment
                                                    ?.appointment_date ??
                                                    'Visit date unavailable'}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-semibold">
                                                $
                                                {Number(bill.amount).toFixed(2)}
                                            </span>
                                            <BillStatusBadge
                                                status={bill.status}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [{ title: 'Patient Dashboard', href: patientDashboard.url() }],
};
