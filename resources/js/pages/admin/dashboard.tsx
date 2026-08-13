import { Deferred, Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    CalendarDays,
    CircleDollarSign,
    HeartPulse,
    type LucideIcon,
    Stethoscope,
    Users,
} from 'lucide-react';
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, XAxis } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import {
    dashboard as adminDashboard,
    doctors as adminDoctors,
    reports as adminReports,
} from '@/routes/admin';
import type { AdminDashboardStats, MonthlyBookingStat } from '@/types';

type Props = {
    stats: AdminDashboardStats;
    monthlyBookings: MonthlyBookingStat[];
    statusDistribution: Record<string, number>;
};

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(value);
}

const bookingsChartConfig = {
    count: {
        label: 'Appointments',
        color: 'hsl(var(--chart-1))',
    },
} satisfies ChartConfig;

// Status -> semantic color. Keep this list in sync with your appointment status enum.
const STATUS_COLORS: Record<string, string> = {
    pending: '#f59e0b',   // Amber
    confirmed: '#3b82f6', // Blue
    completed: '#0d9488', // Teal (Primary)
    cancelled: '#64748b', // Slate
    rejected: '#f43f5e',  // Rose / Red
    no_show: '#e11d48',   // Crimson / Dark Red
};
const FALLBACK_COLORS = ['#3b82f6', '#0d9488', '#f59e0b', '#f43f5e', '#64748b', '#e11d48'];


const CARD_CLASSES = 'min-w-0 overflow-hidden border-border shadow-sm';

const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.06, duration: 0.35, ease: 'easeOut' as const },
    }),
};

export default function Dashboard({ stats, monthlyBookings, statusDistribution }: Props) {
    const bookingData = monthlyBookings ?? [];
    const statusEntries = Object.entries(statusDistribution ?? {}) as Array<[string, number]>;
    const statusTotal = statusEntries.reduce((sum, [, count]) => sum + count, 0);
    const pieData = statusEntries.map(([status, count], index) => ({
        status,
        count,
        fill: STATUS_COLORS[status] ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length],
    }));

    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="flex min-w-0 flex-col gap-6 overflow-x-hidden p-4 sm:gap-8 sm:p-6">
                {/* Hero */}
                <section className="relative overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-sm sm:rounded-[2rem]">
                    <PulseLine />
                    <div className="relative z-10 grid gap-6 p-5 pb-14 sm:gap-8 sm:p-8 sm:pb-16 lg:grid-cols-[1.35fr_0.65fr] lg:p-10">
                        <div className="min-w-0 space-y-5 sm:space-y-6">
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary">
                                <HeartPulse className="size-3.5 shrink-0" />
                                MediFlow Clinic Operations
                            </div>
                            <div className="space-y-3">
                                <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                                    Clinic control center
                                </h1>
                                <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                                    Monitor doctors, appointments, consults, billing, and operational
                                    health from one single-branch command surface.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Button asChild>
                                    <Link href={adminDoctors.url()}>
                                        Manage doctors <ArrowRight className="ml-2 size-4" />
                                    </Link>
                                </Button>
                                <Button asChild variant="outline">
                                    <Link href={adminReports.url()}>View reports</Link>
                                </Button>
                            </div>
                        </div>

                        <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                            <div className="min-w-0 rounded-2xl border border-border bg-background p-4">
                                <p className="truncate text-xs uppercase tracking-[0.3em] text-muted-foreground">
                                    Appointments
                                </p>
                                <p className="mt-2 truncate text-2xl font-semibold tabular-nums text-foreground sm:text-3xl">
                                    {stats.totalAppointments}
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">Total clinic visits tracked</p>
                            </div>
                            <div className="min-w-0 rounded-2xl border border-border bg-background p-4">
                                <p className="truncate text-xs uppercase tracking-[0.3em] text-muted-foreground">
                                    Revenue
                                </p>
                                <p className="mt-2 truncate text-2xl font-semibold tabular-nums text-foreground sm:text-3xl">
                                    {formatCurrency(stats.revenuePaid)}
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">Confirmed payment receipts</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Primary KPIs */}
                <section className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <MetricCard index={0} icon={Users} label="Patients" value={stats.totalPatients} helper="Registered patient accounts" tone="blue" />
                    <MetricCard index={1} icon={Stethoscope} label="Doctors" value={stats.totalDoctors} helper="Active doctor profiles" tone="teal" />
                    <MetricCard index={2} icon={CalendarDays} label="Today's appointments" value={stats.todayAppointments} helper="Scheduled clinic visits today" tone="amber" />
                    <MetricCard index={3} icon={CircleDollarSign} label="Unpaid bills" value={formatCurrency(stats.revenueUnpaid)} helper="Awaiting settlement" tone="rose" />
                </section>

                {/* Charts */}
                <section className="grid min-w-0 gap-4 sm:gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <Card className={`${CARD_CLASSES} flex flex-col`}>
                        <CardHeader>
                            <CardTitle>Monthly bookings</CardTitle>
                            <CardDescription>Appointment volume across the clinic calendar.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex min-w-0 flex-1 flex-col">
                            <Deferred data="monthlyBookings" fallback={<Skeleton className="h-60 sm:h-64 w-full rounded-2xl" />}>
                                {bookingData.length === 0 ? (
                                    <div className="flex h-60 sm:h-64 w-full items-center justify-center rounded-2xl border border-dashed text-sm text-muted-foreground">
                                        No booking data yet.
                                    </div>
                                ) : (
                                    <ChartContainer config={bookingsChartConfig} className="aspect-auto h-60 sm:h-64 w-full min-w-0">
                                        <AreaChart data={bookingData} margin={{ left: 0, right: 8, top: 12 }}>
                                            <defs>
                                                <linearGradient id="bookingsFill" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                                                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.02} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
                                            <XAxis
                                                dataKey="month"
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={8}
                                                interval="preserveStartEnd"
                                                minTickGap={24}
                                                className="text-xs"
                                            />
                                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                                            <Area
                                                dataKey="count"
                                                type="monotone"
                                                stroke="var(--color-primary)"
                                                strokeWidth={2}
                                                fill="url(#bookingsFill)"
                                            />
                                        </AreaChart>
                                    </ChartContainer>
                                )}
                            </Deferred>
                        </CardContent>
                    </Card>

                    <Card className={CARD_CLASSES}>
                        <CardHeader>
                            <CardTitle>Appointment distribution</CardTitle>
                            <CardDescription>Current status split across the clinic pipeline.</CardDescription>
                        </CardHeader>
                        <CardContent className="min-w-0">
                            <Deferred
                                data="statusDistribution"
                                fallback={
                                    <div className="space-y-3">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Skeleton key={i} className="h-10 w-full rounded-xl" />
                                        ))}
                                    </div>
                                }
                            >
                                <div className="flex min-w-0 flex-col items-center gap-6 sm:flex-row sm:items-center">
                                    <ChartContainer config={bookingsChartConfig} className="mx-auto aspect-square h-44 shrink-0 sm:h-48">
                                        <PieChart>
                                            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                            <Pie
                                                data={pieData}
                                                dataKey="count"
                                                nameKey="status"
                                                innerRadius={44}
                                                outerRadius={68}
                                                paddingAngle={2}
                                                strokeWidth={2}
                                                className="stroke-background"
                                            >
                                                {pieData.map((entry) => (
                                                    <Cell key={entry.status} fill={entry.fill} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ChartContainer>

                                    <div className="flex-1 w-full min-w-0 space-y-1.5">
                                        {pieData.map((entry) => (
                                            <div
                                                key={entry.status}
                                                className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-border px-3 py-1.5"
                                            >
                                                <div className="flex min-w-0 items-center gap-2.5">
                                                    <span
                                                        className="size-2.5 shrink-0 rounded-full"
                                                        style={{ backgroundColor: entry.fill }}
                                                    />
                                                    <span className="text-sm font-medium capitalize text-foreground whitespace-nowrap">
                                                        {entry.status.replaceAll('_', ' ')}
                                                    </span>
                                                </div>
                                                <span className="text-xs font-semibold text-muted-foreground tabular-nums">
                                                    {statusTotal > 0 ? Math.round((entry.count / statusTotal) * 100) : 0}%
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Deferred>
                        </CardContent>
                    </Card>
                </section>

                {/* Secondary KPIs */}
                <section className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <MetricCard index={4} icon={CalendarDays} label="Pending" value={stats.pendingAppointments} helper="Awaiting doctor action" tone="amber" />
                    <MetricCard index={5} icon={CircleDollarSign} label="Today's revenue" value={formatCurrency(stats.todayRevenue)} helper="Paid consultations today" tone="teal" />
                    <MetricCard index={6} icon={Users} label="New registrations" value={stats.newRegistrations} helper="Users joined today" tone="blue" />
                    <MetricCard index={7} icon={HeartPulse} label="Completed consults" value={stats.completedConsultations} helper="Finished consultations" tone="rose" />
                </section>
            </div>
        </>
    );
}

type Tone = 'blue' | 'teal' | 'amber' | 'rose';

const TONE_CLASSES: Record<Tone, string> = {
    blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    teal: 'bg-primary/10 text-primary',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
};

function MetricCard({
    icon: Icon,
    label,
    value,
    helper,
    tone,
    index,
}: {
    icon: LucideIcon;
    label: string;
    value: number | string;
    helper: string;
    tone: Tone;
    index: number;
}) {
    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={index}
            className="h-full"
        >
            <Card className={`${CARD_CLASSES} h-full transition-colors hover:border-border`}>
                <CardContent className="flex h-full min-w-0 items-center gap-4 p-4 sm:p-5">
                    <div className={`flex size-11 shrink-0 items-center justify-center rounded-2xl sm:size-12 ${TONE_CLASSES[tone]}`}>
                        <Icon className="size-5 sm:size-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
                        <p className="mt-1 text-xl font-semibold tracking-tight tabular-nums sm:text-2xl">{value}</p>
                        <p className="text-xs text-muted-foreground">{helper}</p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

/**
 * Signature element: a faint animated vitals line across the hero, echoing
 * the HeartPulse brand mark. Purely decorative -- aria-hidden.
 */
function PulseLine() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 800 60"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 bottom-1 z-0 h-12 w-full opacity-50 sm:bottom-2 sm:h-14"
        >
            <path
                d="M0 30 H260 L280 30 L295 10 L310 50 L325 30 L340 30 H500 L520 30 L535 12 L550 48 L565 30 L580 30 H800"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="900"
                strokeDashoffset="900"
                style={{ animation: 'mediflow-pulse-draw 6s linear infinite' }}
            />
            <style>{`
                @keyframes mediflow-pulse-draw {
                    0% { stroke-dashoffset: 900; }
                    50% { stroke-dashoffset: 0; }
                    100% { stroke-dashoffset: -900; }
                }
            `}</style>
        </svg>
    );
}

Dashboard.layout = {
    breadcrumbs: [{ title: 'Admin Dashboard', href: adminDashboard.url() }],
};