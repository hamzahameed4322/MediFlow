import { Deferred, Head, router, useForm } from '@inertiajs/react';
import {
    BriefcaseMedical,
    Edit3,
    LoaderCircle,
    type LucideIcon,
    Plus,
    Power,
    Search,
    SearchX,
    Stethoscope,
    UserCheck,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { EmptyState } from '@/components/empty-state';
import InputError from '@/components/input-error';
import { UserStatusBadge } from '@/components/status-badge';
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
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { doctors as adminDoctors } from '@/routes/admin';
import type { DoctorProfile } from '@/types';

type Props = {
    doctors: DoctorProfile[];
};
/**
 * TODO FOR AI AGENT / BACKEND — read before touching this file:
 * `[propName]` currently arrives as the FULL, un-paginated list from the backend
 * (no page/limit params applied). Fine for dev-seeded rows, but WILL fail in
 * production once this table grows — full table scan on every load, huge
 * payload over the wire, and frontend render (map/filter over whole array)
 * gets slower with every new row.
 *
 * Backend needs to apply real pagination (Laravel's paginate()/cursorPaginate())
 * on this endpoint, and this UI needs to consume page/per_page + a pager control
 * (shadcn Pagination) instead of assuming `[propName]` is the complete dataset.
 * Don't ship this to production as-is.
 */
// Backend only ever reports `active` or `suspended` for a doctor's linked
// user account -- there is no third "inactive" state to filter on.
type StatusFilter = 'all' | 'active' | 'suspended';

export default function DoctorsIndex({ doctors }: Props) {
    const [doctorData, setDoctorData] = useState<DoctorProfile[]>(doctors ?? []);

    // `doctors` is a fresh array reference every time Inertia gets new props
    // from the server (e.g. after createForm.post() or router.post()).
    // useState's initial value only runs once on mount, so without this
    // effect the UI kept showing stale data until a full page refresh.
    useEffect(() => {
        setDoctorData(doctors ?? []);
    }, [doctors]);

    const [updatingDoctorId, setUpdatingDoctorId] = useState<number | null>(null);
    const [editingDoctor, setEditingDoctor] = useState<DoctorProfile | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

    const createForm = useForm({
        name: '',
        email: '',
        password: '',
        specialization: '',
        qualification: '',
        experience: '',
        consultation_fee: '',
    });

    const editForm = useForm({
        name: '',
        email: '',
        specialization: '',
        qualification: '',
        experience: '',
        consultation_fee: '',
    });

    const activeDoctors = doctorData.filter((doctor) => doctor.user?.status === 'active').length;

    const filteredDoctors = useMemo(() => {
        return doctorData.filter((doctor) => {
            const status = doctor.user?.status ?? 'suspended';
            const matchesStatus = statusFilter === 'all' || status === statusFilter;
            const searchableText = [doctor.user?.name, doctor.user?.email, doctor.specialization, doctor.qualification]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();

            return matchesStatus && searchableText.includes(query.toLowerCase());
        });
    }, [doctorData, query, statusFilter]);

    const isFiltering = query.trim().length > 0 || statusFilter !== 'all';

    const openEdit = (doctor: DoctorProfile) => {
        setEditingDoctor(doctor);
        editForm.setData({
            name: doctor.user?.name || '',
            email: doctor.user?.email || '',
            specialization: doctor.specialization,
            qualification: doctor.qualification,
            experience: String(doctor.experience),
            consultation_fee: String(doctor.consultation_fee),
        });
        setIsEditOpen(true);
    };

    const submitCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post('/admin/doctors', {
            preserveScroll: true,
            onSuccess: () => createForm.reset(),
        });
    };

    const submitEdit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!editingDoctor) {
            return;
        }

        editForm.put(`/admin/doctors/${editingDoctor.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsEditOpen(false);
                setEditingDoctor(null);
            },
        });
    };

    const toggleDoctorStatus = (doctor: DoctorProfile) => {
        if (!doctor.user) {
            return;
        }

        const previousDoctors = doctorData;
        const nextStatus = doctor.user.status === 'suspended' ? 'active' : 'suspended';

        setUpdatingDoctorId(doctor.id);
        setDoctorData((currentDoctors) =>
            currentDoctors.map((currentDoctor) => {
                if (currentDoctor.id !== doctor.id || !currentDoctor.user) {
                    return currentDoctor;
                }

                return {
                    ...currentDoctor,
                    user: {
                        ...currentDoctor.user,
                        status: nextStatus,
                    },
                };
            }),
        );

        router.post(
            `/admin/doctors/${doctor.id}/toggle-status`,
            {},
            {
                preserveScroll: true,
                preserveState: true,
                onError: () => setDoctorData(previousDoctors),
                onFinish: () => setUpdatingDoctorId(null),
            },
        );
    };

    return (
        <>
            <Head title="Manage Doctors" />

            <div className="flex flex-col gap-6 p-6">
                <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-sm">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary">
                                <BriefcaseMedical className="size-3.5" />
                                Clinical staffing
                            </div>
                            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                                Doctor management
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                                Create, edit, and control doctor accounts together with their
                                professional profile and active status.
                            </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <MiniStat icon={Stethoscope} label="Doctors" value={doctorData.length} />
                            <MiniStat icon={UserCheck} label="Active" value={activeDoctors} />
                        </div>
                    </div>
                </section>

                <div className="grid items-start gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Plus className="size-5 text-primary" />
                                Create doctor
                            </CardTitle>
                            <CardDescription>Register a new doctor and initial clinic details.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4" onSubmit={submitCreate}>
                                <Field label="Full name" error={createForm.errors.name}>
                                    <Input
                                        value={createForm.data.name}
                                        onChange={(e) => createForm.setData('name', e.target.value)}
                                    />
                                </Field>
                                <Field label="Email" error={createForm.errors.email}>
                                    <Input
                                        type="email"
                                        value={createForm.data.email}
                                        onChange={(e) => createForm.setData('email', e.target.value)}
                                    />
                                </Field>
                                <Field label="Password" error={createForm.errors.password}>
                                    <Input
                                        type="password"
                                        value={createForm.data.password}
                                        onChange={(e) => createForm.setData('password', e.target.value)}
                                    />
                                </Field>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Field label="Specialization" error={createForm.errors.specialization}>
                                        <Input
                                            value={createForm.data.specialization}
                                            onChange={(e) => createForm.setData('specialization', e.target.value)}
                                            placeholder="Cardiologist"
                                        />
                                    </Field>
                                    <Field label="Qualification" error={createForm.errors.qualification}>
                                        <Input
                                            value={createForm.data.qualification}
                                            onChange={(e) => createForm.setData('qualification', e.target.value)}
                                            placeholder="MBBS, MD"
                                        />
                                    </Field>
                                    <Field label="Experience (years)" error={createForm.errors.experience}>
                                        <Input
                                            type="number"
                                            min="0"
                                            value={createForm.data.experience}
                                            onChange={(e) => createForm.setData('experience', e.target.value)}
                                        />
                                    </Field>
                                    <Field label="Consultation fee" error={createForm.errors.consultation_fee}>
                                        <Input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={createForm.data.consultation_fee}
                                            onChange={(e) => createForm.setData('consultation_fee', e.target.value)}
                                        />
                                    </Field>
                                </div>
                                <Button type="submit" className="w-full" disabled={createForm.processing}>
                                    {createForm.processing && <LoaderCircle className="mr-2 size-4 animate-spin" />}
                                    Create doctor
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <CardTitle>Doctor directory</CardTitle>
                                    <CardDescription>
                                        Manage doctor accounts, clinic schedules, and active access.
                                    </CardDescription>
                                </div>
                                <Badge variant="secondary" className="shrink-0 tabular-nums">
                                    {filteredDoctors.length} of {doctorData.length}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4 grid gap-3 md:grid-cols-[1fr_220px]">
                                <div className="relative">
                                    <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        value={query}
                                        onChange={(event) => setQuery(event.target.value)}
                                        placeholder="Search doctor, email, specialization..."
                                        className="pl-9"
                                    />
                                </div>
                                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
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

                            <Deferred data="doctors" fallback={<DoctorsSkeleton />}>
                                {filteredDoctors.length === 0 ? (
                                    isFiltering ? (
                                        <EmptyState
                                            icon={SearchX}
                                            title="No matches"
                                            description="Try a different search term or reset the status filter."
                                        />
                                    ) : (
                                        <EmptyState
                                            icon={BriefcaseMedical}
                                            title="No doctors yet"
                                            description="Doctor profiles will show up here once you create them."
                                        />
                                    )
                                ) : (
                                    <div className="space-y-3">
                                        {filteredDoctors.map((doctor) => (
                                            <div
                                                key={doctor.id}
                                                className={`rounded-2xl border border-border p-4 transition-colors hover:bg-muted/40 ${updatingDoctorId === doctor.id ? 'opacity-70' : ''}`}
                                            >
                                                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                                                                {doctor.user?.name?.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold text-foreground">
                                                                    {doctor.user?.name}
                                                                </p>
                                                                <p className="text-xs text-muted-foreground">
                                                                    {doctor.user?.email}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            <Badge variant="outline">{doctor.specialization}</Badge>
                                                            <Badge variant="outline">{doctor.qualification}</Badge>
                                                            <Badge variant="outline">{doctor.experience} years</Badge>
                                                            <Badge variant="outline" className="text-primary">
                                                                ${Number(doctor.consultation_fee).toFixed(2)}
                                                            </Badge>
                                                        </div>
                                                        <UserStatusBadge status={doctor.user?.status || 'suspended'} />
                                                        {doctor.schedules && doctor.schedules.length > 0 && (
                                                            <div className="flex flex-wrap gap-2 pt-1 text-xs text-muted-foreground">
                                                                {doctor.schedules.map((schedule) => (
                                                                    <Badge key={schedule.id} variant="secondary">
                                                                        {schedule.day} {schedule.start_time.slice(0, 5)}-
                                                                        {schedule.end_time.slice(0, 5)}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 lg:justify-end">
                                                        <Button variant="outline" size="sm" onClick={() => openEdit(doctor)}>
                                                            <Edit3 className="mr-2 size-4" /> Edit
                                                        </Button>
                                                        <Button
                                                            variant={doctor.user?.status === 'suspended' ? 'default' : 'destructive'}
                                                            size="sm"
                                                            disabled={updatingDoctorId === doctor.id}
                                                            onClick={() => toggleDoctorStatus(doctor)}
                                                        >
                                                            {updatingDoctorId === doctor.id ? (
                                                                <LoaderCircle className="mr-2 size-4 animate-spin" />
                                                            ) : (
                                                                <Power className="mr-2 size-4" />
                                                            )}
                                                            {doctor.user?.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Deferred>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit doctor profile</DialogTitle>
                        <DialogDescription>
                            Update the doctor profile that the patient and schedule views use.
                        </DialogDescription>
                    </DialogHeader>

                    <form className="space-y-4" onSubmit={submitEdit}>
                        <div className="grid gap-4 sm:grid-cols-2 max-h-[60vh] overflow-y-auto pr-2 py-1">
                            <Field label="Full name" error={editForm.errors.name}>
                                <Input value={editForm.data.name} onChange={(e) => editForm.setData('name', e.target.value)} />
                            </Field>
                            <Field label="Email" error={editForm.errors.email}>
                                <Input
                                    type="email"
                                    value={editForm.data.email}
                                    onChange={(e) => editForm.setData('email', e.target.value)}
                                />
                            </Field>
                            <Field label="Specialization" error={editForm.errors.specialization}>
                                <Input
                                    value={editForm.data.specialization}
                                    onChange={(e) => editForm.setData('specialization', e.target.value)}
                                />
                            </Field>
                            <Field label="Qualification" error={editForm.errors.qualification}>
                                <Input
                                    value={editForm.data.qualification}
                                    onChange={(e) => editForm.setData('qualification', e.target.value)}
                                />
                            </Field>
                            <Field label="Experience" error={editForm.errors.experience}>
                                <Input
                                    type="number"
                                    min="0"
                                    value={editForm.data.experience}
                                    onChange={(e) => editForm.setData('experience', e.target.value)}
                                />
                            </Field>
                            <Field label="Consultation fee" error={editForm.errors.consultation_fee}>
                                <Input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={editForm.data.consultation_fee}
                                    onChange={(e) => editForm.setData('consultation_fee', e.target.value)}
                                />
                            </Field>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={editForm.processing}>
                                {editForm.processing && <LoaderCircle className="mr-2 size-4 animate-spin" />}
                                Save changes
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            {children}
            <InputError message={error} />
        </div>
    );
}

function MiniStat({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: number }) {
    return (
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-muted/50 p-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-4" />
            </div>
            <div>
                <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">{label}</p>
                <p className="text-xl font-semibold tabular-nums text-foreground">{value}</p>
            </div>
        </div>
    );
}

function DoctorsSkeleton() {
    return (
        <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-28 w-full rounded-2xl" />
            ))}
        </div>
    );
}

DoctorsIndex.layout = {
    breadcrumbs: [{ title: 'Doctors', href: adminDoctors.url() }],
};
