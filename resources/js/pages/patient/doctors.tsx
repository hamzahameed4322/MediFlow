import { Head, useForm, router } from '@inertiajs/react';
import { Users, Star, Stethoscope, Clock, Calendar, ChevronRight, DollarSign } from 'lucide-react';
import { useDeferredValue, useMemo, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { EmptyState } from '@/components/empty-state';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import type { DoctorProfile } from '@/types';

type Props = {
    doctors: {
        data: DoctorProfile[];
        links: { url: string | null; label: string; active: boolean }[];
        total: number;
    };
    filters: { search?: string };
};

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Doctors({ doctors, filters }: Props) {
    const doctorData = doctors?.data ?? [];
    const [selectedDoctor, setSelectedDoctor] = useState<DoctorProfile | null>(null);
    const [bookingOpen, setBookingOpen] = useState(false);
    const [slots, setSlots] = useState<string[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [query, setQuery] = useState(filters.search || '');

    // Server-side search with debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (query !== (filters.search || '')) {
                router.get('/patient/doctors', { search: query }, { preserveState: true, replace: true });
            }
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [query]);

    const { data, setData, post, processing, errors, reset } = useForm({
        doctor_id: '',
        appointment_date: '',
        appointment_time: '',
        reason: '',
    });

    const openBooking = (doctor: DoctorProfile) => {
        setSelectedDoctor(doctor);
        setData({ doctor_id: String(doctor.id), appointment_date: '', appointment_time: '', reason: '' });
        setSlots([]);
        setBookingOpen(true);
    };

    const fetchSlots = async (date: string) => {
        if (!selectedDoctor || !date) {
return;
}

        setLoadingSlots(true);
        setSlots([]);
        setData('appointment_time', '');

        try {
            const res = await fetch(`/patient/doctors/${selectedDoctor.id}/slots?date=${date}`);
            const data = await res.json();
            setSlots(data);
        } catch {
            toast.error('Could not load available slots.');
        } finally {
            setLoadingSlots(false);
        }
    };

    const handleDateChange = (date: string) => {
        setData('appointment_date', date);
        fetchSlots(date);
    };

    const handleBook = (e: React.FormEvent) => {
        e.preventDefault();
        post('/patient/appointments', {
            onSuccess: () => {
                toast.success('Appointment booked successfully!');
                setBookingOpen(false);
                reset();
            },
            onError: () => toast.error('Failed to book appointment. Please check your inputs.'),
        });
    };

    const formatTime = (time: string) => {
        const [h, m] = time.split(':');
        const hour = parseInt(h);

        return `${hour > 12 ? hour - 12 : hour || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
    };

    const todayDate = new Date();
    const today = new Intl.DateTimeFormat('en-CA').format(todayDate);
    const maxDateObj = new Date(todayDate);
    maxDateObj.setMonth(maxDateObj.getMonth() + 2);
    const maxDate = new Intl.DateTimeFormat('en-CA').format(maxDateObj);

    return (
        <>
            <Head title="Browse Doctors" />
            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight">Browse Doctors</h1>
                    <p className="text-muted-foreground">Find and book appointments with our specialist doctors.</p>
                </div>

                {/* Stats bar */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="size-4" />
                    <span>{doctors?.total || 0} active doctor{doctors?.total !== 1 ? 's' : ''} available</span>
                </div>

                <div className="grid gap-3 md:grid-cols-[1fr_220px]">
                    <div className="relative rounded-2xl border bg-background">
                        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search doctor, specialization, qualification..." className="border-0 pl-4 shadow-none focus-visible:ring-0" />
                    </div>
                    <div className="flex items-center rounded-2xl border bg-muted/30 px-4 text-sm text-muted-foreground">
                        {doctorData.length} shown
                    </div>
                </div>

                {/* Doctor Grid */}
                {doctors?.total === 0 && !query ? (
                    <EmptyState icon={Users} title="No doctors available" description="No active doctors are registered yet. Please check back later." />
                ) : doctorData.length === 0 ? (
                    <EmptyState icon={Users} title="No doctors matched your search" description="Try a different name, specialty, or qualification." />
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {doctorData.map((doctor) => (
                            <Card key={doctor.id} className="flex flex-col hover:shadow-md transition-shadow">
                                <CardHeader className="pb-3">
                                    {/* Avatar placeholder */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg shrink-0">
                                            {doctor.user?.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <CardTitle className="text-base truncate">{doctor.user?.name}</CardTitle>
                                            <p className="text-xs text-muted-foreground truncate">{doctor.qualification}</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex flex-col flex-1 gap-4">
                                    {/* Specialization */}
                                    <div className="flex items-center gap-2">
                                        <Stethoscope className="size-4 text-primary shrink-0" />
                                        <span className="text-sm font-medium">{doctor.specialization}</span>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="rounded-lg bg-muted/50 p-2 text-center">
                                            <p className="text-xs text-muted-foreground">Experience</p>
                                            <p className="text-sm font-semibold">{doctor.experience} yr{doctor.experience !== 1 ? 's' : ''}</p>
                                        </div>
                                        <div className="rounded-lg bg-muted/50 p-2 text-center">
                                            <p className="text-xs text-muted-foreground">Fee</p>
                                            <p className="text-sm font-semibold text-green-600">${doctor.consultation_fee}</p>
                                        </div>
                                    </div>

                                    {/* Available days */}
                                    {doctor.schedules && doctor.schedules.length > 0 && (
                                        <div>
                                            <p className="mb-1.5 text-xs text-muted-foreground font-medium uppercase tracking-wide">Available Days</p>
                                            <div className="flex flex-wrap gap-1">
                                                {DAYS.map((day) => {
                                                    const hasSchedule = doctor.schedules?.some(s => s.day === day);

                                                    return hasSchedule ? (
                                                        <Badge key={day} variant="outline" className="text-[10px] px-1.5 py-0 bg-primary/5 text-primary border-primary/20">
                                                            {day.slice(0, 3)}
                                                        </Badge>
                                                    ) : null;
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-auto">
                                        <Button className="w-full" onClick={() => openBooking(doctor)}>
                                            Book Appointment <ChevronRight className="ml-1 size-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Pagination Controls */}
                {doctors?.links && doctors.links.length > 3 && (
                    <div className="flex items-center justify-center gap-2 pt-6">
                        {doctors.links.map((link, i) => {
                            if (!link.url) return null;
                            const isPrevOrNext = link.label.includes('Previous') || link.label.includes('Next');
                            return (
                                <Button
                                    key={i}
                                    variant={link.active ? "default" : "outline"}
                                    size={isPrevOrNext ? "sm" : "icon"}
                                    className={isPrevOrNext ? "px-4" : ""}
                                    onClick={() => router.get(link.url!, { search: query }, { preserveState: true })}
                                >
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                </Button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Booking Dialog */}
            <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Book Appointment</DialogTitle>
                        <DialogDescription>
                            With <strong>{selectedDoctor?.user?.name}</strong> — {selectedDoctor?.specialization}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleBook} className="space-y-4">
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 py-1">
                        {/* Date */}
                        <div className="space-y-2">
                            <Label htmlFor="appointment_date">Appointment Date</Label>
                            <Input
                                id="appointment_date"
                                type="date"
                                min={today}
                                max={maxDate}
                                value={data.appointment_date}
                                onChange={(e) => handleDateChange(e.target.value)}
                                required
                            />
                            <InputError message={errors.appointment_date} />
                        </div>

                        {/* Time Slot */}
                        <div className="space-y-2">
                            <Label htmlFor="appointment_time">Available Time Slot</Label>
                            {loadingSlots ? (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
                                    <Spinner className="size-4" /> Loading slots...
                                </div>
                            ) : slots.length > 0 ? (
                                <Select value={data.appointment_time} onValueChange={(v) => setData('appointment_time', v)}>
                                    <SelectTrigger id="appointment_time">
                                        <SelectValue placeholder="Select a time slot" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {slots.map((slot) => (
                                            <SelectItem key={slot} value={slot}>{formatTime(slot)}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : data.appointment_date ? (
                                <p className="text-sm text-muted-foreground py-2 italic">No available slots for this date.</p>
                            ) : (
                                <p className="text-sm text-muted-foreground py-2 italic">Please select a date first.</p>
                            )}
                            <InputError message={errors.appointment_time} />
                        </div>

                        {/* Reason */}
                        <div className="space-y-2">
                            <Label htmlFor="reason">Reason for Visit <span className="text-muted-foreground text-xs">(optional)</span></Label>
                            <textarea
                                id="reason"
                                value={data.reason}
                                onChange={(e) => setData('reason', e.target.value)}
                                rows={3}
                                placeholder="Describe your symptoms or reason..."
                                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            />
                            <InputError message={errors.reason} />
                        </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setBookingOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={processing || !data.appointment_time}>
                                {processing && <Spinner className="mr-2 size-4" />}
                                Confirm Booking
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

Doctors.layout = {
    breadcrumbs: [
        { title: 'Browse Doctors', href: '/patient/doctors' },
    ],
};
