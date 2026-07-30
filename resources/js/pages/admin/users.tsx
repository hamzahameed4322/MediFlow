import { Deferred, Head, router } from '@inertiajs/react';
import { type LucideIcon, RotateCw, Search, ShieldAlert, UserCheck, UserRound, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Pagination } from '@/components/pagination';
import { EmptyState } from '@/components/empty-state';
import { UserStatusBadge } from '@/components/status-badge';
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
import { users as adminUsers } from '@/routes/admin';
import type { PatientProfile } from '@/types';

type Props = {
    patients: {
        data: PatientProfile[];
        links: any;
        meta: any;
    };
};

export default function UsersIndex({ patients }: Props) {
    const [patientData, setPatientData] = useState<PatientProfile[]>(patients?.data ?? []);

    useEffect(() => {
        setPatientData(patients?.data ?? []);
    }, [patients]);
    const [query, setQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all');
    const [updatingUserId, setUpdatingUserId] = useState<number | null>(null);

    const filteredPatients = useMemo(() => {
        return patientData.filter((patient) => {
            const status = patient.user?.status ?? 'inactive';
            const matchesStatus = statusFilter === 'all' || status === statusFilter;
            const searchableText = [patient.user?.name, patient.user?.email, patient.phone, patient.gender, patient.dob]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();

            return matchesStatus && searchableText.includes(query.toLowerCase());
        });
    }, [patientData, query, statusFilter]);

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
                                Review registered patients, monitor account status, and suspend access
                                when needed.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        <MiniStat label="Patients" value={patientData.length} icon={Users} />
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
                    <CardContent className="min-w-0">
                        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_220px]">
                            <div className="relative">
                                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder="Search patient, email, phone..."
                                    className="pl-9"
                                />
                            </div>
                            {/* "Inactive" intentionally omitted — see NOTE above toggleStatus(). */}
                            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as typeof statusFilter)}>
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

                        <Deferred data="patients" fallback={<UsersSkeleton />}>
                            {filteredPatients.length === 0 ? (
                                <EmptyState
                                    icon={Users}
                                    title="No patients registered"
                                    description="Patient accounts will appear here once users sign up."
                                />
                            ) : (
                                // overflow-x-auto is the actual mobile fix: table-fixed columns can't
                                // shrink past their content's intrinsic width (buttons, badges, avatars
                                // don't wrap), so without this wrapper the table pushes the whole Card
                                // off-screen to the right on narrow viewports. This lets it scroll
                                // horizontally within its own box instead of breaking the page layout.
                                <div>
                                    <div className="overflow-x-auto rounded-xl border border-border">
                                        <Table className="min-w-[720px] table-fixed">
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[26%]">Patient</TableHead>
                                                    <TableHead className="w-[24%]">Contact</TableHead>
                                                    <TableHead className="w-[20%]">Medical Profile</TableHead>
                                                    <TableHead className="w-[14%]">Status</TableHead>
                                                    <TableHead className="w-[16%] text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredPatients.map((patient) => (
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
                                                        <TableCell className="text-muted-foreground">
                                                            <p className="truncate">{patient.user?.email}</p>
                                                            <p className="truncate">{patient.phone}</p>
                                                        </TableCell>
                                                        <TableCell className="text-muted-foreground">
                                                            <div className="flex flex-wrap gap-2">
                                                                <Badge variant="outline">{patient.gender}</Badge>
                                                                <Badge variant="outline">{patient.dob || 'No DOB'}</Badge>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <UserStatusBadge status={patient.user?.status || 'inactive'} />
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <Button
                                                                size="sm"
                                                                variant={patient.user?.status === 'suspended' ? 'default' : 'outline'}
                                                                disabled={updatingUserId === patient.user?.id}
                                                                onClick={() => patient.user && toggleStatus(patient.user.id)}
                                                                className="transition-all duration-300"
                                                            >
                                                                <RotateCw
                                                                    className={`mr-2 size-4 shrink-0 ${updatingUserId === patient.user?.id ? 'animate-spin' : ''}`}
                                                                />
                                                                {patient.user?.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <Pagination links={patients?.meta?.links || []} meta={patients?.meta} />
                                </div>
                            )}
                        </Deferred>
                    </CardContent>
                </Card>
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

function UsersSkeleton() {
    return (
        <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-20 w-full rounded-2xl" />
            ))}
        </div>
    );
}

UsersIndex.layout = {
    breadcrumbs: [{ title: 'Patients', href: adminUsers.url() }],
};
