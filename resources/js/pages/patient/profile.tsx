import { Head, useForm } from '@inertiajs/react';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Shield,
    HeartPulse,
    AlertTriangle,
    Stethoscope,
    CheckCircle2,
    Clock,
    CalendarCheck,
    Lock,
    Activity,
} from 'lucide-react';
import { toast } from 'sonner';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

type Props = {
    patient: {
        name: string;
        email: string;
        phone: string;
        gender: string;
        dob: string | null;
        address: string | null;
        allergies: string | null;
        major_diseases: string | null;
    };
    stats: {
        totalAppointments: number;
        upcomingAppointments: number;
        completedAppointments: number;
    };
};

function getInitials(name: string) {
    return name
        .replace(/^dr\.?\s+/i, '')
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join('');
}

function getAge(dob: string | null): string {
    if (!dob) return 'n/a';
    const birth = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    return String(m < 0 || (m === 0 && today.getDate() < birth.getDate()) ? age - 1 : age);
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
            <div className={cn('flex size-10 shrink-0 items-center justify-center rounded-xl', color)}>{icon}</div>
            <div>
                <p className="text-2xl font-bold leading-none">{value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
            </div>
        </div>
    );
}

function FieldIcon({ icon }: { icon: React.ReactNode }) {
    return (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4 flex items-center justify-center">
            {icon}
        </div>
    );
}

export default function Profile({ patient, stats }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: patient.name,
        phone: patient.phone || '',
        gender: patient.gender || 'male',
        dob: patient.dob || '',
        address: patient.address || '',
        allergies: patient.allergies || '',
        major_diseases: patient.major_diseases || '',
    });

    const initials = getInitials(patient.name);
    const age = getAge(patient.dob);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/patient/profile', {
            onSuccess: () => toast.success('Medical profile updated successfully!'),
            onError: () => toast.error('Failed to update profile. Please verify your inputs.'),
        });
    };

    return (
        <>
            <Head title="My Profile" />
            <div className="flex flex-col gap-6 p-6">
                {/* Hero Banner */}
                <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
                    <div className="h-24 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
                    <div className="flex flex-col gap-5 px-6 pb-6 sm:flex-row sm:items-end sm:gap-6">
                        <div className="-mt-10 flex size-20 shrink-0 items-center justify-center rounded-2xl border-4 border-background bg-primary text-primary-foreground text-2xl font-extrabold shadow-lg">
                            {initials}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <h1 className="text-2xl font-bold tracking-tight truncate">{patient.name}</h1>
                                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                                    <Activity className="size-3" /> Active Patient
                                </span>
                            </div>
                            <p className="mt-0.5 text-sm text-muted-foreground">{patient.email}</p>
                            {patient.dob && (
                                <p className="mt-0.5 text-xs text-muted-foreground">
                                    {age} years old &middot; {patient.gender ? patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1) : 'N/A'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <StatCard icon={<CalendarCheck className="size-5 text-primary" />} label="Total Appointments" value={stats.totalAppointments} color="bg-primary/10" />
                    <StatCard icon={<Clock className="size-5 text-amber-600 dark:text-amber-400" />} label="Upcoming Appointments" value={stats.upcomingAppointments} color="bg-amber-500/10" />
                    <StatCard icon={<CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400" />} label="Completed Consultations" value={stats.completedAppointments} color="bg-emerald-500/10" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                        {/* Personal */}
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
                                        <User className="size-4 text-primary" />
                                    </div>
                                    Personal Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="name">Full Name</Label>
                                    <div className="relative">
                                        <FieldIcon icon={<User className="size-3.5" />} />
                                        <Input id="name" className="pl-9" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Your full name" required />
                                    </div>
                                    <InputError message={errors.name} />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="dob">Date of Birth</Label>
                                    <div className="relative">
                                        <FieldIcon icon={<Calendar className="size-3.5" />} />
                                        <Input id="dob" type="date" className="pl-9" value={data.dob} onChange={(e) => setData('dob', e.target.value)} />
                                    </div>
                                    {data.dob && (
                                        <p className="text-[11px] text-muted-foreground">Age: <span className="font-semibold text-foreground">{getAge(data.dob)} years</span></p>
                                    )}
                                    <InputError message={errors.dob} />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="gender">Gender</Label>
                                    <div className="relative">
                                        <FieldIcon icon={<Shield className="size-3.5" />} />
                                        <Select value={data.gender} onValueChange={(val) => setData('gender', val)}>
                                            <SelectTrigger id="gender" className="pl-9">
                                                <SelectValue placeholder="Select gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <InputError message={errors.gender} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact */}
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <div className="flex size-7 items-center justify-center rounded-lg bg-blue-500/10">
                                        <Phone className="size-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    Contact Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="relative">
                                        <FieldIcon icon={<Mail className="size-3.5" />} />
                                        <Input id="email" className="pl-9 pr-9 bg-muted text-muted-foreground cursor-not-allowed" value={patient.email} disabled />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            <Lock className="size-3.5 text-muted-foreground" />
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground">Email address cannot be changed.</p>
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <div className="relative">
                                        <FieldIcon icon={<Phone className="size-3.5" />} />
                                        <Input
                                            id="phone"
                                            type="tel"
                                            className="pl-9"
                                            value={data.phone}
                                            onChange={(e) => {
                                                const cleaned = e.target.value.replace(/\D/g, '').slice(0, 11);
                                                setData('phone', cleaned);
                                            }}
                                            placeholder="03001234567"
                                            maxLength={11}
                                            required
                                        />
                                    </div>
                                    <p className="text-[10px] text-muted-foreground flex justify-between">
                                        <span>Must be 11 digits starting with 03 (e.g. 03001234567)</span>
                                        <span className={data.phone.length === 11 && data.phone.startsWith('03') ? 'text-emerald-600 font-semibold' : ''}>
                                            {data.phone.length}/11
                                        </span>
                                    </p>
                                    <InputError message={errors.phone} />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="address">Residential Address</Label>
                                    <div className="relative">
                                        <FieldIcon icon={<MapPin className="size-3.5" />} />
                                        <Input id="address" className="pl-9" value={data.address} onChange={(e) => setData('address', e.target.value)} placeholder="Your home address" />
                                    </div>
                                    <InputError message={errors.address} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Clinical History */}
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <div className="flex size-7 items-center justify-center rounded-lg bg-rose-500/10">
                                    <HeartPulse className="size-4 text-rose-600 dark:text-rose-400" />
                                </div>
                                Clinical Health Record
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-5 md:grid-cols-2">
                                <div className="space-y-1.5">
                                    <Label htmlFor="allergies" className="flex items-center gap-1.5">
                                        <AlertTriangle className="size-3.5 text-amber-500" /> Known Allergies
                                    </Label>
                                    <textarea
                                        id="allergies"
                                        value={data.allergies}
                                        onChange={(e) => setData('allergies', e.target.value)}
                                        rows={4}
                                        className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                                        placeholder={"List any food or drug allergies\ne.g. Penicillin, Peanuts, Sulfa drugs"}
                                    />
                                    <InputError message={errors.allergies} />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="major_diseases" className="flex items-center gap-1.5">
                                        <Stethoscope className="size-3.5 text-primary" /> Chronic Conditions
                                    </Label>
                                    <textarea
                                        id="major_diseases"
                                        value={data.major_diseases}
                                        onChange={(e) => setData('major_diseases', e.target.value)}
                                        rows={4}
                                        className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                                        placeholder={"List chronic conditions or major illnesses\ne.g. Hypertension, Diabetes Type 2, Asthma"}
                                    />
                                    <InputError message={errors.major_diseases} />
                                </div>
                            </div>
                            <p className="mt-3 flex items-start gap-1.5 text-[11px] text-muted-foreground">
                                <Shield className="mt-0.5 size-3 shrink-0 text-primary" />
                                This information is strictly confidential and only visible to your treating doctors.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Save */}
                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing} className="h-11 min-w-40 gap-2 text-sm font-semibold">
                            {processing ? (
                                <><Spinner className="size-4" /> Saving...</>
                            ) : (
                                <><CheckCircle2 className="size-4" /> Save Profile Changes</>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

Profile.layout = {
    breadcrumbs: [{ title: 'My Profile', href: '/patient/profile' }],
};
