import { Head, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
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
    RotateCw,
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
import { dashboard as adminDashboard, appointments as adminAppointments } from '@/routes/admin';
import type { Appointment, AppointmentStatus } from '@/types';

type Props = {
    filters?: {
        search?: string;
        status?: string;
        doctor_id?: string;
        date_from?: string;
        date_to?: string;
        sort_by?: string;
        sort_order?: string;
    };
    appointments: {
        data: Appointment[];
        links: any;
        meta: any;
    };
};

const FILTERS: { key: AppointmentStatus | 'all'; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'completed', label: 'Completed' },
    { key: 'cancelled', label: 'Cancelled' },
    { key: 'rejected', label: 'Rejected' },
    { key: 'no_show', label: 'No Show' },
];

export default function AppointmentsIndex({ appointments, filters }: Props) {
    const appointmentData = appointments?.data ?? [];
    const [filter, setFilter] = useState<AppointmentStatus | 'all'>((filters?.status as any) ?? 'all');
    const [query, setQuery] = useState(filters?.search ?? '');
    const [sortBy, setSortBy] = useState<string>(filters?.sort_by ?? 'appointment_date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>((filters?.sort_order as any) ?? 'desc');
    const [isSearching, setIsSearching] = useState(false);

    const triggerSearch = (searchVal: string, statusVal: string, sortVal: string, orderVal: string) => {
        setIsSearching(true);
        router.get(
            adminAppointments.url(),
            {
                search: searchVal || undefined,
                status: statusVal !== 'all' ? statusVal : undefined,
                sort_by: sortVal,
                sort_order: orderVal,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onFinish: () => setIsSearching(false),
            }
        );
    };

    // 400ms Debounce to reduce excessive search request hits and prevent system lag
    useEffect(() => {
        const timer = setTimeout(() => {
            if (
                query !== (filters?.search ?? '') ||
                filter !== (filters?.status ?? 'all') ||
                sortBy !== (filters?.sort_by ?? 'appointment_date') ||
                sortOrder !== (filters?.sort_order ?? 'desc')
            ) {
                triggerSearch(query, filter, sortBy, sortOrder);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [query, filter, sortBy, sortOrder]);

    const handleSortToggle = (column: string) => {
        if (sortBy === column) {
            const nextOrder = sortOrder === 'asc' ? 'desc' : 'asc';
            setSortOrder(nextOrder);
            triggerSearch(query, filter, column, nextOrder);
        } else {
            setSortBy(column);
            setSortOrder('desc');
            triggerSearch(query, filter, column, 'desc');
        }
    };

    const counts = useMemo(() => {
        return {
            pending: appointmentData.filter((a) => a.status === 'pending').length,
            confirmed: appointmentData.filter((a) => a.status === 'confirmed').length,
            completed: appointmentData.filter((a) => a.status === 'completed').length,
            cancelled: appointmentData.filter((a) => a.status === 'cancelled').length,
            rejected: appointmentData.filter((a) => a.status === 'rejected').length,
            noShow: appointmentData.filter((a) => a.status === 'no_show').length,
        };
    }, [appointmentData]);

    const hasActiveFilter = filter !== 'all' || query.trim() !== '';

    return (
        <>
            <Head title="Appointments" />

            <div className="flex flex-col gap-6 p-6">
                <section className="rounded-[1.75rem] border border-border bg-card p-5 sm:p-8 shadow-sm">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary">
                            <Filter className="size-3.5" />
                            Operations monitoring
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                                Appointments
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                                Track appointment states across the clinic workflow and audit the consultation pipeline.
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
                                className="border-0 pl-9 pr-8 shadow-none focus-visible:ring-0"
                            />
                            {isSearching ? (
                                <RotateCw className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 animate-spin text-muted-foreground" />
                            ) : query ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setQuery('');
                                        triggerSearch('', filter, sortBy, sortOrder);
                                    }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
                                >
                                    <X className="size-3.5" />
                                </button>
                            ) : null}
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
                            <button
                                type="button"
                                onClick={() => {
                                    setFilter('all');
                                    setQuery('');
                                    triggerSearch('', 'all', 'appointment_date', 'desc');
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
                        <motion.div
                            className="overflow-x-auto rounded-xl border border-border"
                            animate={{ opacity: isSearching ? 0.45 : 1 }}
                            transition={{ duration: 0.18, ease: 'easeInOut' }}
                            style={{ pointerEvents: isSearching ? 'none' : 'auto' }}
                        >
                            <Table className="min-w-[850px] table-fixed">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead
                                            className="w-[10%] cursor-pointer select-none transition-colors hover:text-foreground"
                                            onClick={() => handleSortToggle('id')}
                                        >
                                            <div className="flex items-center gap-1 font-semibold text-xs uppercase">
                                                <span>ID</span>
                                                {sortBy === 'id' && isSearching ? (
                                                    <RotateCw className="size-3 animate-spin text-primary" />
                                                ) : sortBy === 'id' ? (
                                                    sortOrder === 'asc' ? <ArrowUp className="size-3 text-primary" /> : <ArrowDown className="size-3 text-primary" />
                                                ) : (
                                                    <ArrowUpDown className="size-3 text-muted-foreground/40" />
                                                )}
                                            </div>
                                        </TableHead>
                                        <TableHead className="w-[18%]">Patient</TableHead>
                                        <TableHead className="w-[18%]">Doctor</TableHead>
                                        <TableHead
                                            className="w-[18%] cursor-pointer select-none transition-colors hover:text-foreground"
                                            onClick={() => handleSortToggle('appointment_date')}
                                        >
                                            <div className="flex items-center gap-1.5 font-semibold text-xs uppercase">
                                                <span>Schedule</span>
                                                {sortBy === 'appointment_date' && isSearching ? (
                                                    <RotateCw className="size-3.5 animate-spin text-primary" />
                                                ) : sortBy === 'appointment_date' ? (
                                                    sortOrder === 'asc' ? <ArrowUp className="size-3.5 text-primary" /> : <ArrowDown className="size-3.5 text-primary" />
                                                ) : (
                                                    <ArrowUpDown className="size-3.5 text-muted-foreground/40" />
                                                )}
                                            </div>
                                        </TableHead>
                                        <TableHead
                                            className="w-[14%] cursor-pointer select-none transition-colors hover:text-foreground"
                                            onClick={() => handleSortToggle('status')}
                                        >
                                            <div className="flex items-center gap-1 font-semibold text-xs uppercase">
                                                <span>Status</span>
                                                {sortBy === 'status' && isSearching ? (
                                                    <RotateCw className="size-3 animate-spin text-primary" />
                                                ) : sortBy === 'status' ? (
                                                    sortOrder === 'asc' ? <ArrowUp className="size-3 text-primary" /> : <ArrowDown className="size-3 text-primary" />
                                                ) : (
                                                    <ArrowUpDown className="size-3 text-muted-foreground/40" />
                                                )}
                                            </div>
                                        </TableHead>
                                        <TableHead className="w-[22%]">Reason / Notes</TableHead>
                                    </TableRow>
                                </TableHeader>
                                {appointmentData.length === 0 && !isSearching ? (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan={6} className="py-8 text-center">
                                                <EmptyState
                                                    icon={Calendar}
                                                    title={query || filter !== 'all' ? 'No matching appointments' : 'No appointments found'}
                                                    description="There are no records matching your current filter or search criteria."
                                                    variant={query || filter !== 'all' ? 'no-results' : 'no-data'}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                ) : (
                                    <TableBody>
                                        {appointmentData.map((appointment) => (
                                            <TableRow key={appointment.id}>
                                                <TableCell className="align-top font-mono text-xs text-muted-foreground">
                                                    #{appointment.id}
                                                </TableCell>
                                                <TableCell className="align-top">
                                                    <p className="truncate font-medium text-xs text-foreground">
                                                        {appointment.patient?.user?.name || 'Patient'}
                                                    </p>
                                                    <p className="truncate text-[11px] text-muted-foreground">
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
                        </motion.div>
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
            {Array.from({ length: 7 }).map((_, index) => (
                <TableRow key={index} className="animate-pulse">
                    <TableCell><Skeleton className="h-4 w-10" /></TableCell>
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
    breadcrumbs: [
        { title: 'Admin Dashboard', href: adminDashboard.url() },
        { title: 'Appointments', href: adminAppointments.url() },
    ],
};
