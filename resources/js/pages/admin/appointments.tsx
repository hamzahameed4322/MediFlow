import { Head } from '@inertiajs/react';
import { Pagination } from '@/components/pagination';
import {
    Calendar,
    CircleX,
    Clock,
    Filter,
    type LucideIcon,
    Search,
    Stethoscope,
    UserCheck,
    UserRoundX,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { EmptyState } from '@/components/empty-state';
import { AppointmentStatusBadge } from '@/components/status-badge';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

    const filtered = useMemo(() => {
        const list = appointments?.data ?? [];
        return list.filter((appointment) => {
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
    }, [appointments, filter, query]);

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
                        <MiniStat label="Pending" value={counts.pending} icon={Calendar} />
                        <MiniStat label="Confirmed" value={counts.confirmed} icon={UserCheck} />
                        <MiniStat label="Completed" value={counts.completed} icon={Stethoscope} />
                        <MiniStat label="Cancelled" value={counts.cancelled} icon={CircleX} />
                        <MiniStat label="Rejected" value={counts.rejected} icon={CircleX} />
                        <MiniStat label="No show" value={counts.noShow} icon={UserRoundX} />
                    </div>
                </section>

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

                <Card>
                    <CardHeader>
                        <CardTitle>Clinic appointment log</CardTitle>
                        <CardDescription>
                            Full appointment history including cancellations and consultation outcomes.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {filtered.length === 0 ? (
                            <EmptyState
                                icon={Calendar}
                                title="No appointments found"
                                description="There are no records for the selected filter."
                            />
                        ) : (
                            <div>
                                <div className="overflow-x-auto rounded-xl border border-border">
                                    <Table className="min-w-[800px] table-fixed">
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[18%]">Patient</TableHead>
                                                <TableHead className="w-[18%]">Doctor</TableHead>
                                                <TableHead className="w-[16%]">Schedule</TableHead>
                                                <TableHead className="w-[13%]">Status</TableHead>
                                                <TableHead className="w-[35%]">Reason / Notes</TableHead>
                                            </TableRow>
                                        </TableHeader>
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
                                                                <Badge variant="outline">
                                                                    Cancelled: {appointment.cancel_reason}
                                                                </Badge>
                                                            )}
                                                            {appointment.reject_reason && (
                                                                <Badge variant="outline">
                                                                    Rejected: {appointment.reject_reason}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <Pagination links={appointments?.meta?.links || []} meta={appointments?.meta} />
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

function MiniStat({ label, value, icon: Icon }: { label: string; value: number; icon: LucideIcon }) {
    return (
        <div className="min-w-[110px] rounded-2xl border border-border bg-background p-4">
            <Icon className="size-5 text-primary" />
            <p className="mt-3 text-xs tracking-[0.28em] text-muted-foreground uppercase">{label}</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">{value}</p>
        </div>
    );
}

AppointmentsIndex.layout = {
    breadcrumbs: [{ title: 'Appointments', href: adminAppointments.url() }],
};
