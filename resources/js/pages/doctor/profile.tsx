import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import {
    Stethoscope,
    Award,
    Calendar,
    Users2,
    DollarSign,
    Activity,
    Mail,
    User,
    GraduationCap,
    Clock,
    BriefcaseMedical,
    CheckCircle2,
    Sparkles,
} from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import SecurityController from '@/actions/App/Http/Controllers/Settings/SecurityController';
import { Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { edit, update } from '@/routes/doctor/profile';

type DoctorData = {
    name: string;
    email: string;
    specialization: string;
    qualification: string;
    experience: number;
    consultation_fee: number;
    schedules_count: number;
    appointments_count: number;
    pending_appointments_count: number;
    completed_appointments_count: number;
};

type Props = {
    doctor: DoctorData;
};

export default function Profile({ doctor }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
        qualification: doctor.qualification,
        experience: doctor.experience,
        consultation_fee: doctor.consultation_fee,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update.url(), {
            onSuccess: () => toast.success('Profile updated successfully.'),
            onError: () => toast.error('Failed to update profile.'),
        });
    };

    // Calculate initials for Avatar
    const initials = doctor.name
        .replace(/^dr\.?\s+/i, '')
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || 'DR';

    return (
        <>
            <Head title="Doctor Profile" />
            
            <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
                
                {/* Profile Header Banner */}
                <div className="relative overflow-hidden rounded-2xl border bg-background shadow-sm">
                    {/* Decorative Background */}
                    <div className="h-32 w-full bg-gradient-to-r from-primary to-primary/70 dark:from-primary/80 dark:to-primary/40 opacity-90" />
                    
                    <div className="relative z-10 px-6 pb-6 pt-0 sm:px-10">
                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between -mt-12">
                            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-end">
                                <Avatar className="h-28 w-28 border-4 border-background shadow-md">
                                    <AvatarImage src="" alt={doctor.name} />
                                    <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">{initials}</AvatarFallback>
                                </Avatar>
                                
                                <div className="text-center sm:text-left mb-2">
                                    <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center justify-center sm:justify-start gap-2">
                                        {doctor.name}
                                        <CheckCircle2 className="h-5 w-5 text-primary" />
                                    </h1>
                                    <p className="text-muted-foreground font-medium flex items-center justify-center sm:justify-start gap-2 mt-1">
                                        {doctor.specialization}
                                        <Separator orientation="vertical" className="h-4" />
                                        {doctor.qualification}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="mb-2 flex items-center gap-2">
                                <Badge className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 px-3 py-1 font-medium shadow-xs flex items-center gap-1.5 transition-colors">
                                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                                    {doctor.experience} Years Exp.
                                </Badge>
                                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-3 py-1 font-medium flex items-center gap-1.5">
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                    On Duty
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Main Content Tabs */}
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-6">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="settings">Settings & Credentials</TabsTrigger>
                    </TabsList>
                    
                    {/* OVERVIEW TAB */}
                    <TabsContent value="overview" className="w-full space-y-6">
                        
                        {/* Stats Grid */}
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <Card className="shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Patients</CardTitle>
                                    <Users2 className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{doctor.appointments_count}</div>
                                    <p className="text-xs text-muted-foreground mt-1">All time consultations</p>
                                </CardContent>
                            </Card>
                            <Card className="shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
                                    <Activity className={`h-4 w-4 ${doctor.pending_appointments_count > 0 ? 'text-amber-500' : 'text-muted-foreground'}`} />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{doctor.pending_appointments_count}</div>
                                    <p className="text-xs text-muted-foreground mt-1">Appointments awaiting action</p>
                                </CardContent>
                            </Card>
                            <Card className="shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Schedules</CardTitle>
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{doctor.schedules_count}</div>
                                    <p className="text-xs text-muted-foreground mt-1">Active weekly slots</p>
                                </CardContent>
                            </Card>
                            <Card className="shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Consultation Fee</CardTitle>
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">${doctor.consultation_fee.toFixed(2)}</div>
                                    <p className="text-xs text-muted-foreground mt-1">Per appointment</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Detailed Information */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card className="shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Stethoscope className="h-5 w-5 text-primary" /> Professional Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b">
                                        <span className="text-muted-foreground font-medium text-sm">Specialization</span>
                                        <span className="font-semibold">{doctor.specialization}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b">
                                        <span className="text-muted-foreground font-medium text-sm">Qualification</span>
                                        <span className="font-semibold">{doctor.qualification}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b">
                                        <span className="text-muted-foreground font-medium text-sm">Experience</span>
                                        <span className="font-semibold">{doctor.experience} Years</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-muted-foreground font-medium text-sm">Registered Email</span>
                                        <span className="font-semibold truncate max-w-[200px]" title={doctor.email}>{doctor.email}</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-sm bg-muted/30 border-dashed">
                                <CardContent className="flex flex-col items-center justify-center h-full min-h-[250px] text-center p-6">
                                    <Award className="h-12 w-12 text-primary/40 mb-4" />
                                    <h3 className="text-lg font-bold mb-2">Verified Practitioner</h3>
                                    <p className="text-sm text-muted-foreground max-w-sm">
                                        Your profile is fully verified and visible to patients in the clinic system. Maintain your schedules to receive appointments.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* SETTINGS TAB */}
                    <TabsContent value="settings" className="w-full space-y-6">
                        <Card className="w-full shadow-sm">
                            <CardHeader>
                                <CardTitle>Profile Settings</CardTitle>
                                <CardDescription>
                                    Update your personal information and consultation details. Changes will be reflected immediately.
                                </CardDescription>
                            </CardHeader>
                            <Separator />
                            <form onSubmit={handleSubmit}>
                                <CardContent className="space-y-8 pt-6">
                                    {/* Personal Info Section */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase flex items-center gap-2">
                                            <User className="h-4 w-4 text-primary" /> Personal Details
                                        </h3>
                                        <div className="grid gap-6 sm:grid-cols-2">
                                            <div className="space-y-2.5">
                                                <Label htmlFor="name">Full Name</Label>
                                                <Input
                                                    id="name"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    required
                                                />
                                                <InputError message={errors.name} />
                                            </div>
                                            <div className="space-y-2.5">
                                                <Label htmlFor="email" className="text-muted-foreground">Email Address (Cannot be changed)</Label>
                                                <Input
                                                    id="email"
                                                    value={data.email}
                                                    readOnly
                                                    disabled
                                                    className="bg-muted/50 text-muted-foreground cursor-not-allowed"
                                                />
                                                <InputError message={errors.email} />
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Professional Info Section */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase flex items-center gap-2">
                                            <BriefcaseMedical className="h-4 w-4 text-primary" /> Professional Credentials
                                        </h3>
                                        <div className="grid gap-6 sm:grid-cols-2">
                                            <div className="space-y-2.5">
                                                <Label htmlFor="specialization">Specialization</Label>
                                                <Input
                                                    id="specialization"
                                                    value={data.specialization}
                                                    onChange={(e) => setData('specialization', e.target.value)}
                                                    required
                                                    placeholder="e.g. Cardiologist"
                                                />
                                                <InputError message={errors.specialization} />
                                            </div>
                                            <div className="space-y-2.5">
                                                <Label htmlFor="qualification">Qualification</Label>
                                                <Input
                                                    id="qualification"
                                                    value={data.qualification}
                                                    onChange={(e) => setData('qualification', e.target.value)}
                                                    required
                                                    placeholder="e.g. MBBS, MD"
                                                />
                                                <InputError message={errors.qualification} />
                                            </div>
                                            <div className="space-y-2.5">
                                                <Label htmlFor="experience">Years of Experience</Label>
                                                <Input
                                                    id="experience"
                                                    type="number"
                                                    min="0"
                                                    value={data.experience}
                                                    onChange={(e) => setData('experience', Number(e.target.value))}
                                                    required
                                                />
                                                <InputError message={errors.experience} />
                                            </div>
                                            <div className="space-y-2.5">
                                                <Label htmlFor="consultation_fee">Consultation Fee ($)</Label>
                                                <div className="relative">
                                                    <DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                    <Input
                                                        id="consultation_fee"
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        value={data.consultation_fee}
                                                        onChange={(e) => setData('consultation_fee', Number(e.target.value))}
                                                        required
                                                        className="pl-9"
                                                    />
                                                </div>
                                                <InputError message={errors.consultation_fee} />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="bg-muted/30 border-t py-4 px-6 justify-end">
                                    <Button type="submit" disabled={processing} className="min-w-[140px]">
                                        {processing && <Spinner className="mr-2 h-4 w-4" />}
                                        Save Changes
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}

Profile.layout = {
    breadcrumbs: [{ title: 'Provider Profile', href: edit.url() }],
};
