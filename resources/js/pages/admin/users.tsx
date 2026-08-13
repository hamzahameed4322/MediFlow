import { Deferred, Head, router } from '@inertiajs/react';
import {
    AlertTriangle,
    Calendar,
    CheckCircle2,
    Clock,
    Eye,
    FileText,
    Filter,
    Mail,
    Phone,
    RotateCw,
    Search,
    ShieldAlert,
    User,
    UserCheck,
    UserRound,
    Users,
    XCircle,
    type LucideIcon,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EmptyState } from '@/components/empty-state';
import { Pagination } from '@/components/pagination';
import { AppointmentStatusBadge, CancelledByBadge, UserStatusBadge } from '@/components/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
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
import { dashboard as adminDashboard, users as adminUsers } from '@/routes/admin';
import type { PatientProfile } from '@/types';

type Props = {
    filters: {
        search?: string;
        status?: string;
    };
    patients: {
        data: PatientProfile[];
        links: any;
        meta: any;
    };
};

export default function UsersIndex({ patients, filters }: Props) {
    const [patientData, setPatientData] = useState<PatientProfile[]>(patients?.data ?? []);
    const [selectedPatientForHistory, setSelectedPatientForHistory] = useState<PatientProfile | null>(null);

    useEffect(() => {
        setPatientData(patients?.data ?? []);
    }, [patients]);

    const [query, setQuery] = useState(filters?.search ?? '');
    const [statusFilter, setStatusFilter] = useState<string>(filters?.status ?? 'all');
    const [modalStatusFilter, setModalStatusFilter] = useState<string>('all');
    const [updatingUserId, setUpdatingUserId] = useState<number | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    // Trigger router search on query / status filter change
    const triggerSearch = (searchVal: string, statusVal: string) => {
        setIsSearching(true);
        router.get(
            adminUsers.url(),
            {
                search: searchVal || undefined,
                status: statusVal !== 'all' ? statusVal : undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onFinish: () => setIsSearching(false),
            }
        );
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query !== (filters?.search ?? '')) {
                triggerSearch(query, statusFilter);
            }
        }, 400);
        return () => clearTimeout(timer);
    }, [query]);

    const handleStatusFilterChange = (value: string) => {
        setStatusFilter(value);
        triggerSearch(query, value);
    };

    const [retainedPatient, setRetainedPatient] = useState<PatientProfile | null>(null);

    useEffect(() => {
        if (selectedPatientForHistory) {
            setRetainedPatient(selectedPatientForHistory);
        }
    }, [selectedPatientForHistory]);

    const activeHistoryPatient = useMemo(() => {
        const target = selectedPatientForHistory ?? retainedPatient;
        if (!target) return null;
        return patientData.find((p) => p.id === target.id) ?? target;
    }, [selectedPatientForHistory, retainedPatient, patientData]);

    const filteredModalAppointments = useMemo(() => {
        if (!activeHistoryPatient?.appointments) return [];
        if (modalStatusFilter === 'all') return activeHistoryPatient.appointments;
        return activeHistoryPatient.appointments.filter(
            (apt) => apt.status === modalStatusFilter,
        );
    }, [activeHistoryPatient, modalStatusFilter]);

    const activeCount = patientData.filter((patient) => patient.user?.status === 'active').length;
    const suspendedCount = patientData.filter((patient) => patient.user?.status === 'suspended').length;

    const toggleStatus = (userId: number) => {
        const previousPatients = patientData;
        const targetPatient = previousPatients.find((patient) => patient.user?.id === userId);

        if (!targetPatient?.user) {
            return;
        }

        const nextStatus = targetPatient.user.status === 'suspended' ? 'active' : 'suspended';

        setUpdatingUserId(userId);
        setPatientData(
            previousPatients.map((patient) => {
                if (patient.user?.id !== userId || !patient.user) {
                    return patient;
                }

                return {
                    ...patient,
                    user: {
                        ...patient.user,
                        status: nextStatus,
                    },
                };
            }),
        );

        router.post(
            `/admin/users/${userId}/toggle-status`,
            {},
            {
                preserveScroll: true,
                preserveState: true,
                onError: () => {
                    setPatientData(previousPatients);
                },
                onFinish: () => {
                    setUpdatingUserId((current) => (current === userId ? null : current));
                },
            },
        );
    };

    return (
        <>
            <Head title="Manage Patients" />

            <div className="flex min-w-0 flex-col gap-6 overflow-x-hidden p-4 sm:p-6">
                <section className="rounded-[1.5rem] border border-border bg-card p-5 shadow-sm sm:rounded-[1.75rem] sm:p-8">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary">
                            <ShieldAlert className="size-3.5 shrink-0" />
                            Access governance
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                                Patient accounts
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                                Review registered patients, inspect appointment behavior, medical histories, and manage access privileges.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        <MiniStat label="Patients on Page" value={patientData.length} icon={Users} />
                        <MiniStat label="Active" value={activeCount} icon={UserCheck} />
                        <MiniStat label="Suspended" value={suspendedCount} icon={UserRound} />
                    </div>
                </section>

                <Card className="min-w-0 overflow-hidden">
                    <CardHeader>
                        <CardTitle>Patient directory</CardTitle>
                        <CardDescription>
                            Single-clinic user access management and medical profile entry points.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="min-w-0 space-y-4">
                        <div className="grid gap-3 md:grid-cols-[1fr_220px]">
                            <div className="relative">
                                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder="Search patient name, email, phone, ID..."
                                    className="pl-9 pr-9"
                                />
                                {isSearching && (
                                    <RotateCw className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 animate-spin text-muted-foreground" />
                                )}
                            </div>
                            <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All statuses</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="suspended">Suspended</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Deferred data="patients" fallback={
                            <div className="overflow-x-auto rounded-xl border border-border">
                                <Table className="min-w-[880px] table-fixed">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[22%]">Patient</TableHead>
                                            <TableHead className="w-[22%]">Contact</TableHead>
                                            <TableHead className="w-[20%]">Medical Profile</TableHead>
                                            <TableHead className="w-[14%]">Status</TableHead>
                                            <TableHead className="w-[22%] text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <UsersTableSkeleton />
                                </Table>
                            </div>
                        }>
                            <div className="space-y-4">
                                <div className="overflow-x-auto rounded-xl border border-border">
                                    <Table className="min-w-[880px] table-fixed">
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[22%]">Patient</TableHead>
                                                <TableHead className="w-[22%]">Contact</TableHead>
                                                <TableHead className="w-[20%]">Medical Profile</TableHead>
                                                <TableHead className="w-[14%]">Status</TableHead>
                                                <TableHead className="w-[22%] text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <AnimatePresence mode="wait">
                                            {isSearching ? (
                                                <UsersTableSkeleton />
                                            ) : patientData.length === 0 ? (
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell colSpan={5} className="py-8 border-b-0 text-center">
                                                            <EmptyState
                                                                icon={Users}
                                                                title="No patients found"
                                                                description="No patient accounts match your current search criteria."
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            ) : (
                                                <TableBody>
                                                {patientData.map((patient) => (
                                                    <TableRow
                                                        key={patient.id}
                                                        className={
                                                            updatingUserId === patient.user?.id
                                                                ? 'bg-muted/20 opacity-70 transition-all duration-300'
                                                                : 'transition-all duration-300'
                                                        }
                                                    >
                                                        <TableCell>
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                                                                    {patient.user?.name?.charAt(0).toUpperCase()}
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <p className="truncate font-medium">{patient.user?.name}</p>
                                                                    <p className="text-xs text-muted-foreground">
                                                                        Patient #{patient.id}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-muted-foreground text-xs">
                                                            <p className="truncate">{patient.user?.email}</p>
                                                            <p className="truncate">{patient.phone}</p>
                                                        </TableCell>
                                                        <TableCell className="text-muted-foreground text-xs">
                                                            <div className="flex flex-wrap gap-1.5">
                                                                <Badge variant="outline" className="capitalize text-[11px]">
                                                                    {patient.gender}
                                                                </Badge>
                                                                <Badge variant="outline" className="text-[11px]">
                                                                    {patient.age ? `${patient.age} yrs` : patient.dob || 'No DOB'}
                                                                </Badge>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <UserStatusBadge status={patient.user?.status || 'inactive'} />
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <div className="flex items-center justify-end gap-1.5 shrink-0">
                                                                <Button
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    onClick={() => setSelectedPatientForHistory(patient)}
                                                                    className="h-8 gap-1 px-2.5 text-xs text-muted-foreground hover:text-foreground"
                                                                >
                                                                    <Eye className="size-3.5" />
                                                                    <span>History</span>
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    variant={patient.user?.status === 'suspended' ? 'default' : 'outline'}
                                                                    disabled={updatingUserId === patient.user?.id}
                                                                    onClick={() => patient.user && toggleStatus(patient.user.id)}
                                                                    className="h-8 text-xs shrink-0 transition-all duration-300"
                                                                >
                                                                    <RotateCw
                                                                        className={`mr-1 size-3 shrink-0 ${updatingUserId === patient.user?.id ? 'animate-spin' : ''}`}
                                                                    />
                                                                    {patient.user?.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                                </TableBody>
                                            )}
                                        </AnimatePresence>
                                        </Table>
                                    </div>
                                    {!isSearching && patientData.length > 0 && (
                                        <Pagination links={patients?.meta?.links || []} meta={patients?.meta} />
                                    )}
                                </div>
                        </Deferred>
                    </CardContent>
                </Card>

                {/* Patient Appointment History Modal */}
                <Dialog open={selectedPatientForHistory !== null} onOpenChange={(open) => !open && setSelectedPatientForHistory(null)}>
                    <DialogContent className="max-w-4xl sm:max-w-4xl max-h-[88vh] overflow-y-auto overflow-x-hidden p-4 sm:p-8">
                        <DialogHeader className="pb-4 border-b border-border/60">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 font-bold text-lg text-primary shadow-sm">
                                        {activeHistoryPatient?.user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2.5">
                                            <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
                                                {activeHistoryPatient?.user?.name}
                                            </DialogTitle>
                                            <UserStatusBadge status={activeHistoryPatient?.user?.status || 'inactive'} />
                                        </div>
                                        <p className="mt-0.5 text-xs font-medium text-muted-foreground">
                                            Patient #{activeHistoryPatient?.id}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Structured Patient Meta Info Cards */}
                            <div className="mt-4 grid gap-2.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-xl border border-border/80 bg-muted/30 p-3">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
                                    <Mail className="size-3.5 shrink-0 text-primary" />
                                    <span className="truncate">{activeHistoryPatient?.user?.email || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
                                    <Phone className="size-3.5 shrink-0 text-primary" />
                                    <span className="truncate">{activeHistoryPatient?.phone || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
                                    <User className="size-3.5 shrink-0 text-primary" />
                                    <span className="capitalize">{activeHistoryPatient?.gender || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
                                    <Calendar className="size-3.5 shrink-0 text-primary" />
                                    <span className="truncate">DOB: {activeHistoryPatient?.dob || 'N/A'}</span>
                                </div>
                            </div>
                        </DialogHeader>

                        <div className="space-y-6 py-3 min-w-0">
                            {/* Stats Summary Grid */}
                            <div>
                                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Appointment Behavior Overview
                                </h4>
                                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                                    <div className="rounded-xl border border-border bg-muted/40 p-3.5 transition-all hover:bg-muted/60 min-w-0">
                                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground whitespace-nowrap">
                                            <Calendar className="size-4 shrink-0 text-primary" />
                                            <span>Total Booked</span>
                                        </div>
                                        <p className="mt-2 text-2xl font-bold text-foreground">
                                            {activeHistoryPatient?.appointment_stats?.total ?? 0}
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 dark:border-emerald-500/30 transition-all hover:bg-emerald-500/10 min-w-0">
                                        <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 whitespace-nowrap dark:text-emerald-400">
                                            <CheckCircle2 className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                            <span>Completed</span>
                                        </div>
                                        <p className="mt-2 text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                                            {activeHistoryPatient?.appointment_stats?.completed ?? 0}
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-slate-500/20 bg-slate-500/5 p-3.5 dark:border-slate-500/30 transition-all hover:bg-slate-500/10 min-w-0">
                                        <div className="flex items-center gap-2 text-xs font-medium text-slate-700 whitespace-nowrap dark:text-slate-400">
                                            <XCircle className="size-4 shrink-0 text-slate-600 dark:text-slate-400" />
                                            <span>Cancelled</span>
                                        </div>
                                        <p className="mt-2 text-2xl font-bold text-slate-700 dark:text-slate-400">
                                            {activeHistoryPatient?.appointment_stats?.cancelled ?? 0}
                                        </p>
                                        <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground whitespace-nowrap">
                                            <span>Pt: {activeHistoryPatient?.appointment_stats?.cancelled_by_patient ?? 0}</span>
                                            <span>•</span>
                                            <span>Doc: {activeHistoryPatient?.appointment_stats?.cancelled_by_doctor ?? 0}</span>
                                        </div>
                                    </div>

                                    <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3.5 dark:border-rose-500/30 transition-all hover:bg-rose-500/10 min-w-0">
                                        <div className="flex items-center gap-2 text-xs font-medium text-rose-700 whitespace-nowrap dark:text-rose-400">
                                            <AlertTriangle className="size-4 shrink-0 text-rose-600 dark:text-rose-400" />
                                            <span>No-Show Marks</span>
                                        </div>
                                        <p className="mt-2 text-2xl font-bold text-rose-700 dark:text-rose-400">
                                            {activeHistoryPatient?.appointment_stats?.no_show ?? 0}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Appointment Log List */}
                            <div className="min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Appointment Records ({filteredModalAppointments.length})
                                    </h4>
                                    <div className="flex items-center gap-2">
                                        <Filter className="size-3.5 text-muted-foreground shrink-0" />
                                        <Select value={modalStatusFilter} onValueChange={setModalStatusFilter}>
                                            <SelectTrigger className="h-8 w-full sm:w-[150px] text-xs">
                                                <SelectValue placeholder="Filter records" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Statuses</SelectItem>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                                <SelectItem value="completed">Completed</SelectItem>
                                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                                <SelectItem value="no_show">No Show</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {filteredModalAppointments.length === 0 ? (
                                    <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                                        <FileText className="mx-auto mb-2 size-8 text-muted-foreground/60" />
                                        No appointment records found matching the selected filter.
                                    </div>
                                ) : (
                                    <div className="max-h-[360px] overflow-y-auto overflow-x-auto rounded-xl border border-border min-w-0">
                                        <Table className="min-w-[580px] text-xs">
                                            <TableHeader className="bg-muted/40">
                                                <TableRow>
                                                    <TableHead className="w-[30%] font-semibold">Doctor & Specialty</TableHead>
                                                    <TableHead className="w-[22%] font-semibold">Date & Time</TableHead>
                                                    <TableHead className="w-[18%] font-semibold">Status</TableHead>
                                                    <TableHead className="w-[30%] font-semibold">Details & Reason</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredModalAppointments.map((apt) => (
                                                    <TableRow key={apt.id}>
                                                        <TableCell className="font-medium">
                                                            <p className="text-foreground">{apt.doctor?.user?.name || 'Assigned Doctor'}</p>
                                                            <p className="text-[11px] text-muted-foreground">{apt.doctor?.specialization}</p>
                                                        </TableCell>
                                                        <TableCell className="text-muted-foreground">
                                                            <div className="flex flex-col">
                                                                <span className="font-medium text-foreground">{apt.appointment_date}</span>
                                                                <span className="flex items-center gap-1 text-[11px]">
                                                                    <Clock className="size-3" />
                                                                    {apt.appointment_time}
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <AppointmentStatusBadge status={apt.status} />
                                                        </TableCell>
                                                        <TableCell className="text-muted-foreground">
                                                            {apt.status === 'cancelled' && (
                                                                <div className="space-y-1">
                                                                    <CancelledByBadge cancelledBy={apt.cancelled_by} />
                                                                    {apt.cancel_reason && (
                                                                        <p className="text-[11px] italic">"{apt.cancel_reason}"</p>
                                                                    )}
                                                                </div>
                                                            )}
                                                            {apt.status === 'rejected' && (
                                                                <p className="text-[11px] text-rose-600 dark:text-rose-400 italic">
                                                                    Reason: {apt.reject_reason || 'Doctor rejected request'}
                                                                </p>
                                                            )}
                                                            {apt.reason && apt.status !== 'cancelled' && apt.status !== 'rejected' && (
                                                                <p className="line-clamp-2 text-[11px]">{apt.reason}</p>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                            </div>
                        </div>

                        <DialogFooter className="flex items-center justify-between sm:justify-between border-t border-border pt-4">
                            <div className="text-xs text-muted-foreground">
                                Access Governance Action
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    size="sm"
                                    variant={activeHistoryPatient?.user?.status === 'suspended' ? 'default' : 'destructive'}
                                    disabled={updatingUserId === activeHistoryPatient?.user?.id}
                                    onClick={() => activeHistoryPatient?.user && toggleStatus(activeHistoryPatient.user.id)}
                                >
                                    <RotateCw
                                        className={`mr-1.5 size-3.5 shrink-0 ${updatingUserId === activeHistoryPatient?.user?.id ? 'animate-spin' : ''}`}
                                    />
                                    {activeHistoryPatient?.user?.status === 'suspended' ? 'Reactivate Account' : 'Suspend Account'}
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setSelectedPatientForHistory(null)}
                                >
                                    Close
                                </Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}

function MiniStat({ label, value, icon: Icon }: { label: string; value: number; icon: LucideIcon }) {
    return (
        <div className="min-w-0 rounded-2xl border border-border bg-background p-4">
            <Icon className="size-5 text-primary" />
            <p className="mt-3 truncate text-xs tracking-[0.28em] text-muted-foreground uppercase">{label}</p>
            <p className="mt-1 truncate text-2xl font-semibold text-foreground">{value}</p>
        </div>
    );
}

function UsersTableSkeleton() {
    return (
        <motion.tbody key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                    <TableCell>
                        <Skeleton className="mb-1 h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="mb-1 h-4 w-28" />
                        <Skeleton className="h-3 w-16" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="mb-1 h-4 w-24" />
                        <Skeleton className="h-3 w-16" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-6 w-20 rounded-full" />
                    </TableCell>
                    <TableCell>
                        <div className="flex justify-end gap-2">
                            <Skeleton className="h-8 w-24 rounded-md" />
                            <Skeleton className="h-8 w-20 rounded-md" />
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </motion.tbody>
    );
}

UsersIndex.layout = {
    breadcrumbs: [{ title: 'Patients', href: adminUsers.url() }],
};
