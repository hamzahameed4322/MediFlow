
import { Deferred, Head, router } from '@inertiajs/react';
import {
    BarChart3,
    CalendarArrowDown,
    CalendarDays,
    ClipboardCheck,
    Clock3,
    type LucideIcon,
    Star,
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
    doctorReviewStats?: {
        total_reviews: number;
        average_rating: number;
        five_star_percentage: number;
        with_comments_count: number;
        rating_distribution: Array<{ name: string; count: number; fill: string }>;
    };
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
    total: { label: 'Bookings', color: 'var(--chart-1)' },
} satisfies ChartConfig;

const peakHoursChartConfig = {
    total: { label: 'Bookings', color: 'var(--chart-1)' },
} satisfies ChartConfig;

const revenueTrendChartConfig = {
    revenue: { label: 'Revenue', color: 'var(--chart-1)' },
} satisfies ChartConfig;

const dayOfWeekChartConfig = {
    total: { label: 'Appointments', color: 'var(--chart-1)' },
} satisfies ChartConfig;

type LoadPoint = { id: number; name: string; appointments: number; schedules: number };

export default function ReportsIndex({
    doctorStats = [],
    appointmentStats = { pending: 0, confirmed: 0, completed: 0, cancelled: 0, rejected: 0, no_show: 0 },
    specialtyCounts = [],
    peakHours = [],
    revenueTrend = [],
    dayOfWeekDistribution = [],
    doctorReviewStats,
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
                                            <Bar dataKey="revenue" radius={[4, 4, 0, 0]} fill="var(--chart-1)">
                                                {revenueTrend.map((entry, idx) => (
                                                    <Cell
                                                        key={idx}
                                                        fill={entry.revenue > 0 ? 'var(--chart-1)' : 'var(--muted)'}
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
                                            <Bar dataKey="total" radius={[4, 4, 0, 0]} fill="var(--chart-1)" />
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
                                            <Bar dataKey="total" radius={[0, 6, 6, 0]} fill="var(--chart-1)" />
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
                                                    <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                                                    <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.03} />
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
                                                stroke="var(--chart-1)"
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

                {/* Doctor Reviews & Ratings Analytics Card */}
                {doctorReviewStats && (
                    <section className="min-w-0">
                        <Card className="min-w-0 overflow-hidden border-border shadow-sm">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                                        <Star className="size-4 text-primary fill-primary shrink-0" />
                                        Doctor Reviews & Ratings Distribution Analytics
                                    </CardTitle>
                                    <Badge variant="outline" className="text-xs font-normal">
                                        Total: {doctorReviewStats.total_reviews} Reviews
                                    </Badge>
                                </div>
                                <CardDescription>
                                    Patient satisfaction scores and star rating breakdown across the clinic
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-2">
                                {/* 4 Summary Pills */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <div className="rounded-xl border border-border bg-muted/20 p-3">
                                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Total Reviews</p>
                                        <p className="text-xl font-bold text-foreground mt-0.5">{doctorReviewStats.total_reviews}</p>
                                    </div>
                                    <div className="rounded-xl border border-border bg-muted/20 p-3">
                                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Average Rating</p>
                                        <p className="text-xl font-bold text-foreground mt-0.5 flex items-center">
                                            {doctorReviewStats.average_rating > 0 ? doctorReviewStats.average_rating : '0.0'}
                                            <Star className="size-4 text-primary fill-primary ml-1.5" />
                                        </p>
                                    </div>
                                    <div className="rounded-xl border border-border bg-muted/20 p-3">
                                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">5-Star Ratio</p>
                                        <p className="text-xl font-bold text-foreground mt-0.5">{doctorReviewStats.five_star_percentage}%</p>
                                    </div>
                                    <div className="rounded-xl border border-border bg-muted/20 p-3">
                                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">With Comments</p>
                                        <p className="text-xl font-bold text-foreground mt-0.5">{doctorReviewStats.with_comments_count}</p>
                                    </div>
                                </div>

                                {/* Progress Bars for Rating Distribution */}
                                <div className="space-y-3">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Star Rating Distribution Breakdown
                                    </p>
                                    {doctorReviewStats.rating_distribution.map((dist) => {
                                        const total = doctorReviewStats.total_reviews || 1;
                                        const percentage = Math.round((dist.count / total) * 100);
                                        return (
                                            <div key={dist.name} className="flex items-center gap-3 text-xs sm:text-sm">
                                                <div className="w-16 sm:w-20 font-medium text-foreground shrink-0">
                                                    {dist.name}
                                                </div>
                                                <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden relative">
                                                    <div
                                                        className="h-full rounded-full bg-primary transition-all duration-500"
                                                        style={{
                                                            width: `${percentage}%`,
                                                        }}
                                                    />
                                                </div>
                                                <div className="w-16 sm:w-20 text-right font-semibold text-foreground shrink-0">
                                                    {dist.count} <span className="text-muted-foreground font-normal text-xs">({percentage}%)</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                )}

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
