import { Head } from '@inertiajs/react';
import { Pagination } from '@/components/pagination';
import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
    Calendar,
    CircleX,
    Clock,
    Filter,
    type LucideIcon,
    Search,
    Stethoscope,
    UserCheck,
    UserRoundX,
    X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { EmptyState } from '@/components/empty-state';
import { AppointmentStatusBadge, CancelledByBadge } from '@/components/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { appointments as adminAppointments } from '@/routes/admin';
import type { Appointment, AppointmentStatus } from '@/types';

type Props = {
    appointments: {
        data: Appointment[];
        links: any;
        meta: any;
    };
};

type SortOrder = 'asc' | 'desc';

const FILTERS: { key: AppointmentStatus | 'all'; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'completed', label: 'Completed' },
    { key: 'cancelled', label: 'Cancelled' },
    { key: 'rejected', label: 'Rejected' },
    { key: 'no_show', label: 'No Show' },
];

export default function AppointmentsIndex({ appointments }: Props) {
    const [filter, setFilter] = useState<AppointmentStatus | 'all'>('all');
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [sortSchedule, setSortSchedule] = useState<SortOrder | null>(null);

    // Handle debounced search / filter loading skeleton state
    useEffect(() => {
        if (!query.trim() && filter === 'all') {
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        const timer = setTimeout(() => {
            setIsSearching(false);
        }, 250);

        return () => clearTimeout(timer);
    }, [query, filter]);

    // Single inline Schedule sorting (toggle: asc -> desc -> null)
    const toggleScheduleSort = () => {
        if (sortSchedule === null) {
            setSortSchedule('asc');
        } else if (sortSchedule === 'asc') {
            setSortSchedule('desc');
        } else {
            setSortSchedule(null);
        }
    };

    const filtered = useMemo(() => {
        const list = appointments?.data ?? [];
        let result = list.filter((appointment) => {
            const matchesStatus = filter === 'all' || appointment.status === filter;
            const searchableText = [
                appointment.patient?.user?.name,
                appointment.doctor?.user?.name,
                appointment.reason,
                appointment.cancel_reason,
                appointment.reject_reason,
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();

            return matchesStatus && searchableText.includes(query.toLowerCase());
        });

        if (sortSchedule) {
            result = [...result].sort((a, b) => {
                const valA = `${a.appointment_date} ${a.appointment_time}`;
                const valB = `${b.appointment_date} ${b.appointment_time}`;

                if (valA < valB) return sortSchedule === 'asc' ? -1 : 1;
                if (valA > valB) return sortSchedule === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [appointments, filter, query, sortSchedule]);

    const counts = useMemo(
        () => {
            const list = appointments?.data ?? [];
            return {
                pending: list.filter((a) => a.status === 'pending').length,
                confirmed: list.filter((a) => a.status === 'confirmed').length,
                completed: list.filter((a) => a.status === 'completed').length,
                cancelled: list.filter((a) => a.status === 'cancelled').length,
                rejected: list.filter((a) => a.status === 'rejected').length,
                noShow: list.filter((a) => a.status === 'no_show').length,
            };
        },
        [appointments],
    );

    const hasActiveFilter = filter !== 'all' || query.trim() !== '' || sortSchedule !== null;

    return (
        <>
            <Head title="Appointments" />

            <div className="flex flex-col gap-6 p-6">
                <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-sm">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary">
                            <Filter className="size-3.5" />
                            Operations monitoring
                        </div>
                        <div>
                            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                                Appointments
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                                Track appointment states across the clinic workflow and audit the
                                consultation pipeline.
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                        <MiniStat label="Pending" value={counts.pending} icon={Calendar} variant="pending" />
                        <MiniStat label="Confirmed" value={counts.confirmed} icon={UserCheck} variant="confirmed" />
                        <MiniStat label="Completed" value={counts.completed} icon={Stethoscope} variant="completed" />
                        <MiniStat label="Cancelled" value={counts.cancelled} icon={CircleX} variant="cancelled" />
                        <MiniStat label="Rejected" value={counts.rejected} icon={CircleX} variant="rejected" />
                        <MiniStat label="No show" value={counts.noShow} icon={UserRoundX} variant="no_show" />
                    </div>
                </section>

                <div className="flex flex-col gap-3">
                    <div className="grid gap-3 md:grid-cols-[1fr_220px]">
                        <div className="relative rounded-2xl border border-border bg-background">
                            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Search patient, doctor, reason..."
                                className="border-0 pl-9 shadow-none focus-visible:ring-0"
                            />
                        </div>
                        <Select value={filter} onValueChange={(value) => setFilter(value as AppointmentStatus | 'all')}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter status" />
                            </SelectTrigger>
                            <SelectContent>
                                {FILTERS.map((entry) => (
                                    <SelectItem key={entry.key} value={entry.key}>
                                        {entry.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Professional Active Filter Chips Bar */}
                    {hasActiveFilter && (
                        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                            {filter !== 'all' && (
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-medium text-primary shadow-2xs">
                                    Status: {FILTERS.find((f) => f.key === filter)?.label}
                                    <button
                                        type="button"
                                        onClick={() => setFilter('all')}
                                        className="ml-0.5 rounded-full p-0.5 hover:bg-primary/20 transition-colors cursor-pointer"
                                        aria-label="Remove status filter"
                                    >
                                        <X className="size-3" />
                                    </button>
                                </span>
                            )}
                            {query.trim() !== '' && (
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-medium text-primary shadow-2xs">
                                    Search: "{query}"
                                    <button
                                        type="button"
                                        onClick={() => setQuery('')}
                                        className="ml-0.5 rounded-full p-0.5 hover:bg-primary/20 transition-colors cursor-pointer"
                                        aria-label="Remove search query"
                                    >
                                        <X className="size-3" />
                                    </button>
                                </span>
                            )}
                            {sortSchedule && (
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-medium text-primary shadow-2xs">
                                    Schedule: {sortSchedule === 'asc' ? 'Earliest first' : 'Latest first'}
                                    <button
                                        type="button"
                                        onClick={() => setSortSchedule(null)}
                                        className="ml-0.5 rounded-full p-0.5 hover:bg-primary/20 transition-colors cursor-pointer"
                                        aria-label="Remove schedule sorting"
                                    >
                                        <X className="size-3" />
                                    </button>
                                </span>
                            )}
                            <button
                                type="button"
                                onClick={() => {
                                    setFilter('all');
                                    setQuery('');
                                    setSortSchedule(null);
                                }}
                                className="ml-1 text-xs font-semibold text-muted-foreground hover:text-destructive transition-colors underline-offset-4 hover:underline cursor-pointer"
                            >
                                Reset all
                            </button>
                        </div>
                    )}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Clinic appointment log</CardTitle>
                        <CardDescription>
                            Full appointment history including cancellations and consultation outcomes.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto rounded-xl border border-border">
                            <Table className="min-w-[800px] table-fixed">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[18%]">Patient</TableHead>
                                        <TableHead className="w-[18%]">Doctor</TableHead>
                                        <TableHead
                                            className="w-[16%] cursor-pointer select-none transition-colors hover:text-foreground"
                                            onClick={toggleScheduleSort}
                                        >
                                            <div className="flex items-center gap-1.5">
                                                <span>Schedule</span>
                                                {sortSchedule === 'asc' ? (
                                                    <ArrowUp className="size-3.5 text-primary shrink-0" />
                                                ) : sortSchedule === 'desc' ? (
                                                    <ArrowDown className="size-3.5 text-primary shrink-0" />
                                                ) : (
                                                    <ArrowUpDown className="size-3.5 text-muted-foreground/50 shrink-0" />
                                                )}
                                            </div>
                                        </TableHead>
                                        <TableHead className="w-[13%]">Status</TableHead>
                                        <TableHead className="w-[35%]">Reason / Notes</TableHead>
                                    </TableRow>
                                </TableHeader>
                                {isSearching ? (
                                    <TableSkeleton />
                                ) : filtered.length === 0 ? (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan={5} className="py-8 text-center">
                                                <EmptyState
                                                    icon={Calendar}
                                                    title={query || filter !== 'all' ? "No matching appointments" : "No appointments found"}
                                                    description="There are no records matching your current filter or search criteria."
                                                />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                ) : (
                                    <TableBody>
                                        {filtered.map((appointment) => (
                                            <TableRow key={appointment.id}>
                                                <TableCell className="align-top">
                                                    <p className="truncate font-medium">
                                                        {appointment.patient?.user?.name}
                                                    </p>
                                                    <p className="truncate text-xs text-muted-foreground">
                                                        {appointment.patient?.phone}
                                                    </p>
                                                </TableCell>
                                                <TableCell className="align-top">
                                                    <p className="truncate font-medium">
                                                        {appointment.doctor?.user?.name}
                                                    </p>
                                                    <p className="truncate text-xs text-muted-foreground">
                                                        {appointment.doctor?.specialization}
                                                    </p>
                                                </TableCell>
                                                <TableCell className="align-top text-muted-foreground">
                                                    <p>{appointment.appointment_date}</p>
                                                    <p className="flex items-center gap-1">
                                                        <Clock className="size-3.5" />
                                                        {appointment.appointment_time.slice(0, 5)}
                                                    </p>
                                                </TableCell>
                                                <TableCell className="align-top">
                                                    <AppointmentStatusBadge status={appointment.status} />
                                                </TableCell>
                                                <TableCell className="align-top whitespace-normal break-words text-muted-foreground">
                                                    <p className="text-xs">
                                                        {appointment.reason || 'No reason provided.'}
                                                    </p>
                                                    <div className="mt-1 flex flex-wrap gap-1">
                                                        {appointment.cancel_reason && (
                                                            <>
                                                                <CancelledByBadge cancelledBy={appointment.cancelled_by} />
                                                                <Badge variant="outline" className="border-slate-500/30 bg-slate-500/10 text-slate-700 dark:text-slate-300">
                                                                    Cancelled: {appointment.cancel_reason}
                                                                </Badge>
                                                            </>
                                                        )}
                                                        {appointment.reject_reason && (
                                                            <Badge variant="outline" className="border-destructive/30 bg-destructive/10 text-destructive">
                                                                Rejected: {appointment.reject_reason}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                )}
                            </Table>
                        </div>
                        <Pagination links={appointments?.meta?.links || []} meta={appointments?.meta} />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

function TableSkeleton() {
    return (
        <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                    <TableCell><Skeleton className="mb-1 h-4 w-28" /><Skeleton className="h-3 w-20" /></TableCell>
                    <TableCell><Skeleton className="mb-1 h-4 w-28" /><Skeleton className="h-3 w-20" /></TableCell>
                    <TableCell><Skeleton className="mb-1 h-4 w-24" /><Skeleton className="h-3 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

const miniStatColors: Record<string, { icon: string; border: string; bg: string }> = {
    pending: { icon: 'text-amber-600 dark:text-amber-400', border: 'border-amber-500/25', bg: 'bg-amber-500/5' },
    confirmed: { icon: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500/25', bg: 'bg-blue-500/5' },
    completed: { icon: 'text-primary', border: 'border-primary/25', bg: 'bg-primary/5' },
    cancelled: { icon: 'text-slate-600 dark:text-slate-400', border: 'border-slate-500/25', bg: 'bg-slate-500/5' },
    rejected: { icon: 'text-destructive', border: 'border-destructive/25', bg: 'bg-destructive/5' },
    no_show: { icon: 'text-destructive-foreground', border: 'border-destructive/40', bg: 'bg-destructive/15' },
};

function MiniStat({
    label,
    value,
    icon: Icon,
    variant,
}: {
    label: string;
    value: number;
    icon: LucideIcon;
    variant?: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rejected' | 'no_show';
}) {
    const config = variant ? miniStatColors[variant] : { icon: 'text-primary', border: 'border-border', bg: 'bg-background' };

    return (
        <div className={`min-w-[110px] rounded-2xl border p-4 transition-colors ${config.border} ${config.bg}`}>
            <Icon className={`size-5 ${config.icon}`} />
            <p className="mt-3 text-xs tracking-[0.28em] text-muted-foreground uppercase">{label}</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">{value}</p>
        </div>
    );
}

AppointmentsIndex.layout = {
    breadcrumbs: [{ title: 'Appointments', href: adminAppointments.url() }],
};
