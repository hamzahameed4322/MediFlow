// import { Deferred, Head } from '@inertiajs/react';
// import { BarChart3, Clock3, ClipboardList, HeartPulse, Users2, ShieldAlert, Stethoscope } from 'lucide-react';
// import { EmptyState } from '@/components/empty-state';
// import { Badge } from '@/components/ui/badge';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Skeleton } from '@/components/ui/skeleton';
// import { reports as adminReports } from '@/routes/admin';
// import type { AppointmentStats, DoctorAvailabilityStat, DoctorReportRow, PeakHourStat, SpecialtyStat } from '@/types';
//
// type Props = {
//     doctorStats: DoctorReportRow[];
//     appointmentStats: AppointmentStats;
//     specialtyCounts: SpecialtyStat[];
//     peakHours: PeakHourStat[];
//     doctorAvailability: DoctorAvailabilityStat[];
//     overloadedDoctors: DoctorAvailabilityStat[];
// };
//
// export default function ReportsIndex({ doctorStats, appointmentStats, specialtyCounts, peakHours, doctorAvailability, overloadedDoctors }: Props) {
//     const statusEntries: { key: keyof AppointmentStats; label: string }[] = [
//         { key: 'pending', label: 'Pending' },
//         { key: 'confirmed', label: 'Confirmed' },
//         { key: 'completed', label: 'Completed' },
//         { key: 'cancelled', label: 'Cancelled' },
//         { key: 'rejected', label: 'Rejected' },
//         { key: 'no_show', label: 'No Show' },
//     ];
//
//     return (
//         <>
//             <Head title="Reports" />
//
//             <div className="flex flex-col gap-6 p-6">
//                 <section className="rounded-[1.75rem] border bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white shadow-xl">
//                     <div className="space-y-3">
//                         <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white/85">
//                             <BarChart3 className="size-3.5" />
//                             Clinic analytics
//                         </div>
//                         <h1 className="text-3xl font-semibold tracking-tight">Operational reports</h1>
//                         <p className="max-w-2xl text-sm text-slate-300">Track doctor performance and appointment state distribution for the single-branch clinic workflow.</p>
//                     </div>
//                 </section>
//
//                 <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
//                     <StatCard label="Doctors tracked" value={doctorStats.length} icon={Users2} />
//                     <StatCard label="Appointment states" value={statusEntries.length} icon={ClipboardList} />
//                     <StatCard label="Specialties" value={specialtyCounts.length} icon={Stethoscope} />
//                     <StatCard label="Peak hours" value={peakHours.length} icon={Clock3} />
//                 </section>
//
//                 <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Doctor performance</CardTitle>
//                             <CardDescription>Completed appointments and generated revenue by doctor.</CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                             <Deferred data="doctorStats" fallback={<ReportSkeletonRows />}>
//                                 {doctorStats.length === 0 ? (
//                                     <EmptyState icon={Users2} title="No doctor analytics" description="Doctor performance will appear once the clinic starts processing visits." />
//                                 ) : (
//                                     <div className="space-y-3">
//                                         {doctorStats.map((doctor) => (
//                                             <div key={doctor.name} className="rounded-2xl border p-4 transition-colors hover:bg-muted/30">
//                                                 <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
//                                                     <div>
//                                                         <p className="font-semibold">{doctor.name}</p>
//                                                         <p className="text-xs text-muted-foreground">{doctor.specialization}</p>
//                                                     </div>
//                                                     <div className="flex flex-wrap gap-2 text-xs">
//                                                         <Badge variant="outline">Total: {doctor.total_appointments}</Badge>
//                                                         <Badge variant="outline">Completed: {doctor.completed_appointments}</Badge>
//                                                         <Badge variant="outline">Revenue: ${Number(doctor.revenue).toFixed(2)}</Badge>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}
//                             </Deferred>
//                         </CardContent>
//                     </Card>
//
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Appointment status summary</CardTitle>
//                             <CardDescription>Current operating state across the appointment pipeline.</CardDescription>
//                         </CardHeader>
//                         <CardContent className="space-y-3">
//                             {statusEntries.map((entry) => (
//                                 <div key={entry.key} className="flex items-center justify-between rounded-2xl border px-4 py-3">
//                                     <span className="text-sm font-medium">{entry.label}</span>
//                                     <Badge variant="secondary">{appointmentStats[entry.key]}</Badge>
//                                 </div>
//                             ))}
//                         </CardContent>
//                     </Card>
//                 </section>
//
//                 <section className="grid gap-6 xl:grid-cols-2">
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Most requested specialties</CardTitle>
//                             <CardDescription>Specialty demand based on active doctor profiles.</CardDescription>
//                         </CardHeader>
//                         <CardContent className="space-y-3">
//                             <Deferred data="specialtyCounts" fallback={<ReportSkeletonRows />}>{specialtyCounts.length === 0 ? <EmptyState icon={HeartPulse} title="No specialty data" description="Specialty patterns will appear once doctors are configured." /> : specialtyCounts.map((specialty) => <ProgressRow key={specialty.specialization} label={specialty.specialization} value={specialty.total} />)}</Deferred>
//                         </CardContent>
//                     </Card>
//
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Peak booking hours</CardTitle>
//                             <CardDescription>Most used appointment times across the clinic.</CardDescription>
//                         </CardHeader>
//                         <CardContent className="space-y-3">
//                             <Deferred data="peakHours" fallback={<ReportSkeletonRows />}>{peakHours.length === 0 ? <EmptyState icon={Clock3} title="No booking hour data" description="Peak-hour insights will appear after bookings accumulate." /> : peakHours.map((hour) => <ProgressRow key={hour.appointment_time} label={hour.appointment_time.slice(0, 5)} value={hour.total} />)}</Deferred>
//                         </CardContent>
//                     </Card>
//                 </section>
//
//                 <section className="grid gap-6 xl:grid-cols-2">
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Doctors with overloaded schedules</CardTitle>
//                             <CardDescription>Highest appointment volume per doctor profile.</CardDescription>
//                         </CardHeader>
//                         <CardContent className="space-y-3">
//                             <Deferred data="overloadedDoctors" fallback={<ReportSkeletonRows />}>
//                                 {overloadedDoctors.length === 0 ? <EmptyState icon={ShieldAlert} title="No overload data" description="This section will populate once schedule volume increases." /> : overloadedDoctors.map((doctor) => <div key={doctor.id} className="rounded-2xl border px-4 py-3"><div className="flex items-center justify-between gap-3"><div><p className="font-medium">{doctor.user.name}</p><p className="text-xs text-muted-foreground">{doctor.appointments_count} appointments</p></div><Badge variant="outline">{doctor.schedules_count} schedules</Badge></div></div>)}
//                             </Deferred>
//                         </CardContent>
//                     </Card>
//
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Doctors with low availability</CardTitle>
//                             <CardDescription>Doctors with fewer active schedules.</CardDescription>
//                         </CardHeader>
//                         <CardContent className="space-y-3">
//                             <Deferred data="doctorAvailability" fallback={<ReportSkeletonRows />}>
//                                 {doctorAvailability.length === 0 ? <EmptyState icon={Users2} title="No availability data" description="Schedule insights will appear once doctors define working hours." /> : doctorAvailability.map((doctor) => <div key={doctor.id} className="rounded-2xl border px-4 py-3"><div className="flex items-center justify-between gap-3"><div><p className="font-medium">{doctor.user.name}</p><p className="text-xs text-muted-foreground">{doctor.schedules_count} schedule blocks</p></div><Badge variant="secondary">{doctor.appointments_count} visits</Badge></div></div>)}
//                             </Deferred>
//                         </CardContent>
//                     </Card>
//                 </section>
//             </div>
//         </>
//     );
// }
//
// function StatCard({ label, value, icon: Icon }: { label: string; value: number | string; icon: React.ComponentType<{ className?: string }>; }) {
//     return (
//         <Card>
//             <CardContent className="flex items-center gap-4 p-5">
//                 <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-950/5 text-slate-950 dark:bg-white/10 dark:text-white">
//                     <Icon className="size-6" />
//                 </div>
//                 <div>
//                     <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">{label}</p>
//                     <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }
//
// function ProgressRow({ label, value }: { label: string; value: number; }) {
//     return (
//         <div className="space-y-2 rounded-2xl border p-4">
//             <div className="flex items-center justify-between gap-3 text-sm">
//                 <span className="font-medium">{label}</span>
//                 <span className="text-muted-foreground">{value}</span>
//             </div>
//             <div className="h-2 overflow-hidden rounded-full bg-muted">
//                 <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" style={{ width: `${Math.min(100, value * 10)}%` }} />
//             </div>
//         </div>
//     );
// }
//
// function ReportSkeletonRows() {
//     return (
//         <div className="space-y-3">
//             {Array.from({ length: 4 }).map((_, index) => (
//                 <Skeleton key={index} className="h-16 w-full rounded-2xl" />
//             ))}
//         </div>
//     );
// }
//
// ReportsIndex.layout = {
//     breadcrumbs: [{ title: 'Reports', href: adminReports.url() }],
// };

import { Deferred, Head, router } from '@inertiajs/react';
import {
    BarChart3,
    CalendarArrowDown,
    CalendarDays,
    ClipboardCheck,
    Clock3,
    type LucideIcon,
    Stethoscope,
    Users2,
    Wallet,
} from 'lucide-react';
import { useMemo } from 'react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ReferenceLine,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { EmptyState } from '@/components/empty-state';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { reports as adminReports } from '@/routes/admin';
import type { AppointmentStats, DayOfWeekStat, DoctorReportRow, MonthlyRevenueStat, PeakHourStat, SpecialtyStat } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Props = {
    doctorStats: DoctorReportRow[];
    appointmentStats: AppointmentStats;
    specialtyCounts: SpecialtyStat[];
    peakHours: PeakHourStat[];
    revenueTrend: MonthlyRevenueStat[];
    dayOfWeekDistribution: DayOfWeekStat[];
    filters: {
        date_from: string;
        date_to: string;
    };
};

const STATUS_META: Record<keyof AppointmentStats, { label: string; color: string }> = {
    pending: { label: 'Pending', color: 'var(--chart-3)' },
    confirmed: { label: 'Confirmed', color: 'var(--chart-2)' },
    completed: { label: 'Completed', color: 'var(--chart-1)' },
    cancelled: { label: 'Cancelled', color: 'var(--chart-4)' },
    rejected: { label: 'Rejected', color: 'var(--destructive)' },
    no_show: { label: 'No show', color: 'var(--chart-5)' },
};

const STATUS_ORDER: (keyof AppointmentStats)[] = [
    'pending',
    'confirmed',
    'completed',
    'cancelled',
    'rejected',
    'no_show',
];

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(value);
}

const doctorChartConfig = {
    revenueValue: { label: 'Revenue', color: 'var(--chart-1)' },
} satisfies ChartConfig;

const specialtyChartConfig = {
    total: { label: 'Bookings', color: 'var(--chart-2)' },
} satisfies ChartConfig;

const peakHoursChartConfig = {
    total: { label: 'Bookings', color: 'var(--chart-3)' },
} satisfies ChartConfig;

const revenueTrendChartConfig = {
    revenue: { label: 'Revenue', color: 'var(--chart-4)' },
} satisfies ChartConfig;

const dayOfWeekChartConfig = {
    total: { label: 'Appointments', color: 'var(--chart-5)' },
} satisfies ChartConfig;

type LoadPoint = { id: number; name: string; appointments: number; schedules: number };

export default function ReportsIndex({
                                         doctorStats = [],
                                         appointmentStats = { pending: 0, confirmed: 0, completed: 0, cancelled: 0, rejected: 0, no_show: 0 },
                                         specialtyCounts = [],
                                         peakHours = [],
                                         revenueTrend = [],
                                         dayOfWeekDistribution = [],
                                         filters,
                                     }: Props) {
    const totalAppointments = STATUS_ORDER.reduce(
        (sum, key) => sum + (appointmentStats[key] ?? 0),
        0,
    );
    const completionRate =
        totalAppointments > 0
            ? Math.round(((appointmentStats.completed ?? 0) / totalAppointments) * 100)
            : 0;
    const totalRevenue = doctorStats.reduce((sum, d) => sum + Number(d.revenue ?? 0), 0);

    const busiestHour = useMemo(() => {
        if (!peakHours.length) return null;
        return [...peakHours].sort((a, b) => b.total - a.total)[0];
    }, [peakHours]);

    const topDoctorsByRevenue = useMemo(
        () =>
            [...doctorStats]
                .map((doctor) => ({ ...doctor, revenueValue: Number(doctor.revenue) }))
                .sort((a, b) => b.revenueValue - a.revenueValue)
                .slice(0, 8),
        [doctorStats],
    );

    const sortedSpecialties = useMemo(
        () => [...specialtyCounts].sort((a, b) => b.total - a.total).slice(0, 8),
        [specialtyCounts],
    );

    const sortedPeakHours = useMemo(
        () =>
            [...peakHours]
                .sort((a, b) => a.appointment_time.localeCompare(b.appointment_time))
                .map((hour) => ({ ...hour, label: hour.appointment_time.slice(0, 5) })),
        [peakHours],
    );



    return (
        <>
            <Head title="Reports" />

            <div className="flex min-w-0 flex-col gap-6 overflow-x-hidden p-4 sm:p-6">
                <section className="rounded-[1.75rem] border border-border bg-card p-5 sm:p-8 shadow-sm">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary">
                                <BarChart3 className="size-3.5" />
                                Clinic analytics
                            </div>
                            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                                Operational reports
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                                Track doctor performance and appointment state distribution for the
                                single-branch clinic workflow.
                            </p>
                        </div>
                        
                        <div className="rounded-xl border bg-muted/30 p-4">
                            <form
                                className="flex flex-wrap items-end gap-3"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const form = e.currentTarget;
                                    const data = new FormData(form);
                                    const from = data.get('date_from') as string;
                                    const to = data.get('date_to') as string;
                                    router.get(adminReports.url(), { date_from: from || undefined, date_to: to || undefined }, { preserveState: true, preserveScroll: true, only: ['appointmentStats', 'doctorStats', 'peakHours', 'revenueTrend', 'dayOfWeekDistribution', 'specialtyCounts', 'filters'] });
                                }}
                            >
                                <div className="w-full space-y-1.5 sm:w-auto">
                                    <label htmlFor="date_from" className="text-xs font-medium text-muted-foreground">From</label>
                                    <Input
                                        id="date_from"
                                        name="date_from"
                                        type="date"
                                        defaultValue={filters?.date_from ?? ''}
                                        className="h-9 w-full sm:w-auto bg-background"
                                    />
                                </div>
                                <div className="w-full space-y-1.5 sm:w-auto">
                                    <label htmlFor="date_to" className="text-xs font-medium text-muted-foreground">To</label>
                                    <Input
                                        id="date_to"
                                        name="date_to"
                                        type="date"
                                        defaultValue={filters?.date_to ?? ''}
                                        className="h-9 w-full sm:w-auto bg-background"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    size="sm"
                                    className="h-9 w-full sm:w-auto inline-flex items-center gap-2"
                                >
                                    <CalendarArrowDown className="size-4" />
                                    Apply Filter
                                </Button>
                            </form>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <StatCard icon={Users2} label="Appointments tracked" value={totalAppointments} />
                    <StatCard icon={ClipboardCheck} label="Completion rate" value={`${completionRate}%`} />
                    <StatCard icon={Wallet} label="Revenue generated" value={formatCurrency(totalRevenue)} />
                    <StatCard
                        icon={Clock3}
                        label="Busiest slot"
                        value={busiestHour ? busiestHour.appointment_time.slice(0, 5) : '—'}
                    />
                </section>



                <section className="grid min-w-0 gap-6 xl:grid-cols-2">
                    <Card className="min-w-0 overflow-hidden border-border shadow-sm">
                        <CardHeader>
                            <CardTitle>Revenue trend</CardTitle>
                            <CardDescription>Monthly paid revenue over the selected period.</CardDescription>
                        </CardHeader>
                        <CardContent className="min-w-0">
                            <Deferred data="revenueTrend" fallback={<Skeleton className="h-64 w-full rounded-2xl" />}>
                                {revenueTrend.length === 0 ? (
                                    <EmptyState
                                        icon={Wallet}
                                        title="No revenue data"
                                        description="Revenue trends will appear once paid bills are recorded."
                                    />
                                ) : (
                                    <ChartContainer config={revenueTrendChartConfig} className="aspect-auto h-64 w-full min-w-0">
                                        <BarChart data={revenueTrend} margin={{ left: 0, right: 12, top: 12 }}>
                                            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
                                            <XAxis
                                                dataKey="month"
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={8}
                                                className="text-xs"
                                            />
                                            <ChartTooltip
                                                cursor={{ fill: 'var(--muted)' }}
                                                content={<ChartTooltipContent indicator="line" />}
                                            />
                                            <Bar dataKey="revenue" radius={[4, 4, 0, 0]} fill="var(--chart-4)">
                                                {revenueTrend.map((entry, idx) => (
                                                    <Cell
                                                        key={idx}
                                                        fill={entry.revenue > 0 ? 'var(--chart-4)' : 'var(--muted)'}
                                                    />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ChartContainer>
                                )}
                            </Deferred>
                        </CardContent>
                    </Card>

                    <Card className="min-w-0 overflow-hidden border-border shadow-sm">
                        <CardHeader>
                            <CardTitle>Bookings by day of week</CardTitle>
                            <CardDescription>Which days of the week see the most appointments.</CardDescription>
                        </CardHeader>
                        <CardContent className="min-w-0">
                            <Deferred data="dayOfWeekDistribution" fallback={<Skeleton className="h-64 w-full rounded-2xl" />}>
                                {dayOfWeekDistribution.length === 0 ? (
                                    <EmptyState
                                        icon={CalendarDays}
                                        title="No day-of-week data"
                                        description="Distribution will appear once appointments are booked."
                                    />
                                ) : (
                                    <ChartContainer config={dayOfWeekChartConfig} className="aspect-auto h-64 w-full min-w-0">
                                        <BarChart data={dayOfWeekDistribution} margin={{ left: 0, right: 12, top: 12 }}>
                                            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
                                            <XAxis 
                                                dataKey="day" 
                                                tickLine={false} 
                                                axisLine={false} 
                                                tickMargin={8} 
                                                className="text-xs"
                                                tickFormatter={(value) => value.slice(0, 3)}
                                                interval={0}
                                            />
                                            <ChartTooltip
                                                cursor={{ fill: 'var(--muted)' }}
                                                content={<ChartTooltipContent indicator="line" />}
                                            />
                                            <Bar dataKey="total" radius={[4, 4, 0, 0]} fill="var(--chart-5)" />
                                        </BarChart>
                                    </ChartContainer>
                                )}
                            </Deferred>
                        </CardContent>
                    </Card>
                </section>

                <section className="grid min-w-0 gap-6 xl:grid-cols-2">
                    <Card className="min-w-0 overflow-hidden border-border shadow-sm">
                        <CardHeader>
                            <CardTitle>Doctor performance</CardTitle>
                            <CardDescription>Revenue generated, ranked highest first.</CardDescription>
                        </CardHeader>
                        <CardContent className="min-w-0">
                            <Deferred data="doctorStats" fallback={<Skeleton className="h-72 w-full rounded-2xl" />}>
                                {topDoctorsByRevenue.length === 0 ? (
                                    <EmptyState
                                        icon={Users2}
                                        title="No doctor analytics"
                                        description="Doctor performance will appear once the clinic starts processing visits."
                                    />
                                ) : (
                                    <ChartContainer config={doctorChartConfig} className="aspect-auto h-72 w-full min-w-0">
                                        <BarChart
                                            data={topDoctorsByRevenue}
                                            layout="vertical"
                                            margin={{ left: 8, right: 16 }}
                                        >
                                            <CartesianGrid horizontal={false} strokeDasharray="3 3" className="stroke-border" />
                                            <XAxis
                                                type="number"
                                                tickLine={false}
                                                axisLine={false}
                                                tickFormatter={(v) => `$${v}`}
                                                className="text-xs"
                                            />
                                            <YAxis
                                                type="category"
                                                dataKey="name"
                                                tickLine={false}
                                                axisLine={false}
                                                width={110}
                                                className="text-xs"
                                            />
                                            <ChartTooltip
                                                cursor={{ fill: 'var(--muted)' }}
                                                content={<ChartTooltipContent />}
                                            />
                                            <Bar dataKey="revenueValue" radius={[0, 6, 6, 0]} fill="var(--chart-1)" />
                                        </BarChart>
                                    </ChartContainer>
                                )}
                            </Deferred>
                        </CardContent>
                    </Card>

                    <Card className="min-w-0 overflow-hidden border-border shadow-sm">
                        <CardHeader>
                            <CardTitle>Most requested specialties</CardTitle>
                            <CardDescription>Specialty demand based on active doctor profiles.</CardDescription>
                        </CardHeader>
                        <CardContent className="min-w-0">
                            <Deferred
                                data="specialtyCounts"
                                fallback={<Skeleton className="h-72 w-full rounded-2xl" />}
                            >
                                {sortedSpecialties.length === 0 ? (
                                    <EmptyState
                                        icon={Stethoscope}
                                        title="No specialty data"
                                        description="Specialty patterns will appear once doctors are configured."
                                    />
                                ) : (
                                    <ChartContainer config={specialtyChartConfig} className="aspect-auto h-72 w-full min-w-0">
                                        <BarChart
                                            data={sortedSpecialties}
                                            layout="vertical"
                                            margin={{ left: 8, right: 16 }}
                                        >
                                            <CartesianGrid horizontal={false} strokeDasharray="3 3" className="stroke-border" />
                                            <XAxis type="number" tickLine={false} axisLine={false} className="text-xs" />
                                            <YAxis
                                                type="category"
                                                dataKey="specialization"
                                                tickLine={false}
                                                axisLine={false}
                                                width={110}
                                                className="text-xs"
                                            />
                                            <ChartTooltip
                                                cursor={{ fill: 'var(--muted)' }}
                                                content={<ChartTooltipContent />}
                                            />
                                            <Bar dataKey="total" radius={[0, 6, 6, 0]} fill="var(--chart-2)" />
                                        </BarChart>
                                    </ChartContainer>
                                )}
                            </Deferred>
                        </CardContent>
                    </Card>
                </section>

                <section className="min-w-0">
                    <Card className="min-w-0 overflow-hidden border-border shadow-sm">
                        <CardHeader>
                            <CardTitle>Peak booking hours</CardTitle>
                            <CardDescription>Most used appointment times across the clinic.</CardDescription>
                        </CardHeader>
                        <CardContent className="min-w-0">
                            <Deferred data="peakHours" fallback={<Skeleton className="h-64 w-full rounded-2xl" />}>
                                {sortedPeakHours.length === 0 ? (
                                    <EmptyState
                                        icon={Clock3}
                                        title="No booking hour data"
                                        description="Peak-hour insights will appear after bookings accumulate."
                                    />
                                ) : (
                                    <ChartContainer config={peakHoursChartConfig} className="aspect-auto h-64 w-full min-w-0">
                                        <AreaChart data={sortedPeakHours} margin={{ left: 0, right: 12, top: 12 }}>
                                            <defs>
                                                <linearGradient id="peakHoursFill" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.4} />
                                                    <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0.03} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
                                            <XAxis
                                                dataKey="label"
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={8}
                                                className="text-xs"
                                            />
                                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                                            <Area
                                                dataKey="total"
                                                type="monotone"
                                                stroke="var(--chart-3)"
                                                strokeWidth={2}
                                                fill="url(#peakHoursFill)"
                                            />
                                        </AreaChart>
                                    </ChartContainer>
                                )}
                            </Deferred>
                        </CardContent>
                    </Card>
                </section>

            </div>
        </>
    );
}

function StatCard({
                      icon: Icon,
                      label,
                      value,
                  }: {
    icon: LucideIcon;
    label: string;
    value: number | string;
}) {
    return (
        <Card className="min-w-0 overflow-hidden border-border shadow-sm">
            <CardContent className="flex items-center gap-4 p-5">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                </div>
                <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">{label}</p>
                    <p className="mt-1 truncate text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
                </div>
            </CardContent>
        </Card>
    );
}

ReportsIndex.layout = {
    breadcrumbs: [{ title: 'Reports', href: adminReports.url() }],
};
