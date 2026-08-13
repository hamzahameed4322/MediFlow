import { Deferred, Head, useForm, router } from '@inertiajs/react';
import { Users, Star, Stethoscope, Clock, Calendar, CalendarDays, ChevronRight, DollarSign, MessageSquare, TriangleAlert } from 'lucide-react';
import { useDeferredValue, useMemo, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { EmptyState } from '@/components/empty-state';
import InputError from '@/components/input-error';
import { StarDisplay } from '@/components/star-rating';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
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
    const [selectedDoctorReviews, setSelectedDoctorReviews] = useState<DoctorProfile | null>(null);
    const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
    const [bookingOpen, setBookingOpen] = useState(false);
    const [slots, setSlots] = useState<string[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [query, setQuery] = useState(filters.search || '');

    const handleOpenReviewsModal = (doc: DoctorProfile) => {
        setSelectedDoctorReviews(doc);
        setIsReviewsModalOpen(true);
    };

    const handleReviewsModalChange = (open: boolean) => {
        setIsReviewsModalOpen(open);
        if (!open) {
            setTimeout(() => {
                setSelectedDoctorReviews(null);
            }, 300);
        }
    };

    const [isSearching, setIsSearching] = useState(false);

    // Server-side search with debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (query !== (filters.search || '')) {
                setIsSearching(true);
                router.get('/patient/doctors', { search: query }, {
                    preserveState: true,
                    replace: true,
                    onFinish: () => setIsSearching(false),
                });
            }
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [query]);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        doctor_id: '',
        appointment_date: '',
        appointment_time: '',
        reason: '',
    });

    const handleBookingModalChange = (open: boolean) => {
        setBookingOpen(open);
        if (!open) {
            clearErrors();
            reset();
            setSlots([]);
        }
    };

    const openBooking = (doctor: DoctorProfile) => {
        clearErrors();
        reset();
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
        clearErrors('appointment_date', 'appointment_time');
        fetchSlots(date);
    };

    const handleBook = (e: React.FormEvent) => {
        e.preventDefault();
        post('/patient/appointments', {
            onSuccess: () => {
                toast.success('Appointment booked successfully!');
                handleBookingModalChange(false);
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

    // Compute which days of week this doctor works (e.g. ['Monday', 'Tuesday'])
    const availableDays = selectedDoctor?.schedules?.map((s) => s.day) ?? [];

    // Check if a chosen date falls on a day the doctor doesn't work
    const pickedDayName = data.appointment_date
        ? new Date(data.appointment_date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long' })
        : null;
    const isDateUnavailable =
        pickedDayName !== null &&
        availableDays.length > 0 &&
        !availableDays.includes(pickedDayName as any);

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
                <Deferred data="doctors" fallback={<DoctorsSkeleton />}>
                    {isSearching ? (
                        <DoctorsSkeleton />
                    ) : !doctors || (doctors?.total === 0 && !query) ? (
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

                                    {/* Rating */}
                                    <div className="flex items-center gap-1.5">
                                        {doctor.reviews_count && doctor.reviews_count > 0 ? (
                                            <button
                                                type="button"
                                                onClick={() => setSelectedDoctorReviews(doctor)}
                                                className="flex items-center gap-1.5 text-left hover:underline cursor-pointer"
                                            >
                                                <Star className="size-3.5 fill-primary text-primary shrink-0" />
                                                <span className="text-sm font-semibold">
                                                    {Number(doctor.average_rating ?? 0).toFixed(1)}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    ({doctor.reviews_count} review{doctor.reviews_count !== 1 ? 's' : ''})
                                                </span>
                                            </button>
                                        ) : (
                                            <span className="text-xs text-muted-foreground italic">No reviews yet</span>
                                        )}
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="rounded-lg bg-muted/50 p-2 text-center">
                                            <p className="text-xs text-muted-foreground">Experience</p>
                                            <p className="text-sm font-semibold">{doctor.experience} yr{doctor.experience !== 1 ? 's' : ''}</p>
                                        </div>
                                        <div className="rounded-lg bg-muted/50 p-2 text-center">
                                            <p className="text-xs text-muted-foreground">Fee</p>
                                            <p className="text-sm font-semibold text-primary">${doctor.consultation_fee}</p>
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

                                    {/* Recent public feedback (show 1 latest comment to keep card compact and responsive) */}
                                    {doctor.reviews && doctor.reviews.length > 0 && (
                                        <div className="rounded-lg bg-muted/40 p-2.5 text-xs space-y-1.5 border border-border/60">
                                            <div className="flex items-center justify-between">
                                                <span className="font-semibold text-foreground flex items-center gap-1">
                                                    <MessageSquare className="size-3 text-primary" /> Patient Feedback
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleOpenReviewsModal(doctor)}
                                                    className="text-[11px] text-primary hover:underline font-medium"
                                                >
                                                    View All ({doctor.reviews_count})
                                                </button>
                                            </div>
                                            <div className="space-y-1">
                                                {doctor.reviews.slice(0, 1).map((rev) => (
                                                    <div key={rev.id} className="text-muted-foreground">
                                                        <div className="flex items-center justify-between gap-1 mb-0.5">
                                                            <span className="font-medium text-foreground truncate">{rev.patient?.user?.name || 'Patient'}</span>
                                                            <span className="flex items-center text-[10px] font-semibold text-primary shrink-0">
                                                                <Star className="size-2.5 fill-primary text-primary mr-0.5" />
                                                                {rev.rating}
                                                            </span>
                                                        </div>
                                                        {rev.comment ? (
                                                            <p className="line-clamp-2 text-foreground/90 italic">"{rev.comment}"</p>
                                                        ) : (
                                                            <p className="text-muted-foreground/60 italic">No comment provided</p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-2 pt-2 border-t border-border mt-auto">
                                        <Button
                                            className="w-full"
                                            size="sm"
                                            onClick={() => openBooking(doctor)}
                                            disabled={doctor.user?.status === 'suspended'}
                                        >
                                            <Calendar className="mr-1.5 size-3.5" />
                                            Book Appointment
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    )}
                </Deferred>
            </div>

            {/* Booking Dialog Modal */}
            <Dialog open={bookingOpen} onOpenChange={handleBookingModalChange}>
                <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Book Appointment</DialogTitle>
                        <DialogDescription>
                            Schedule a consultation with {selectedDoctor?.user?.name?.startsWith('Dr') ? selectedDoctor.user.name : `Dr. ${selectedDoctor?.user?.name}`} ({selectedDoctor?.specialization})
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleBook} className="space-y-3.5">

                        {/* Available Days Info Banner */}
                        {availableDays.length > 0 && (
                            <div className="flex flex-col gap-2 rounded-xl border border-primary/20 bg-primary/5 px-3.5 py-2.5">
                                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                                    <CalendarDays className="size-3.5 shrink-0" />
                                    Doctor is available on
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {availableDays.map((day) => (
                                        <span
                                            key={day}
                                            className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-medium text-primary"
                                        >
                                            {day}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-[11px] text-muted-foreground">
                                    Please select a date that falls on one of the days above.
                                </p>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <Label htmlFor="date">Appointment Date</Label>
                            <Input
                                id="date"
                                type="date"
                                min={today}
                                max={maxDate}
                                value={data.appointment_date}
                                onChange={(e) => handleDateChange(e.target.value)}
                                required
                            />
                            {/* Warn if the picked date is not a day the doctor works */}
                            {isDateUnavailable && (
                                <div className="flex items-start gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-700 dark:border-amber-700/40 dark:bg-amber-900/20 dark:text-amber-400">
                                    <TriangleAlert className="mt-0.5 size-3.5 shrink-0" />
                                    <span>
                                        <strong>{pickedDayName}</strong> is not an available day for this doctor.
                                        Please pick a <strong>{availableDays.join(', ')}</strong> instead.
                                    </span>
                                </div>
                            )}
                            {errors.appointment_date && (
                                <div className="flex items-start gap-1.5 rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">
                                    <TriangleAlert className="mt-0.5 size-3.5 shrink-0" />
                                    <span>{errors.appointment_date}</span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <Label>Available Time Slot</Label>
                            {loadingSlots ? (
                                <div className="grid grid-cols-3 gap-2 max-h-36 overflow-y-auto p-1">
                                    {Array.from({ length: 6 }).map((_, idx) => (
                                        <Skeleton key={idx} className="h-8 w-full rounded-md" />
                                    ))}
                                </div>
                            ) : !data.appointment_date ? (
                                <p className="text-xs text-muted-foreground italic">Please select a date first</p>
                            ) : slots.length === 0 ? (
                                <p className="text-xs text-destructive italic">No slots available for this date</p>
                            ) : (
                                <div className="grid grid-cols-3 gap-2 max-h-36 overflow-y-auto p-1">
                                    {slots.map((slot) => (
                                        <Button
                                            key={slot}
                                            type="button"
                                            variant={data.appointment_time === slot ? 'default' : 'outline'}
                                            size="sm"
                                            className="text-xs"
                                            onClick={() => {
                                                setData('appointment_time', slot);
                                                clearErrors('appointment_time');
                                            }}
                                        >
                                            {slot.slice(0, 5)}
                                        </Button>
                                    ))}
                                </div>
                            )}
                            {errors.appointment_time && (
                                <div className="flex items-start gap-1.5 rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">
                                    <TriangleAlert className="mt-0.5 size-3.5 shrink-0" />
                                    <span>{errors.appointment_time}</span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="reason">Reason for Visit</Label>
                            <Input
                                id="reason"
                                placeholder="e.g. Regular checkup, Follow-up consultation"
                                value={data.reason}
                                onChange={(e) => {
                                    setData('reason', e.target.value);
                                    clearErrors('reason');
                                }}
                                required
                            />
                            {errors.reason && (
                                <div className="flex items-start gap-1.5 rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">
                                    <TriangleAlert className="mt-0.5 size-3.5 shrink-0" />
                                    <span>{errors.reason}</span>
                                </div>
                            )}
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => handleBookingModalChange(false)}>Cancel</Button>
                            <Button type="submit" disabled={processing || !data.appointment_time}>
                                {processing && <Spinner className="mr-2 size-4" />}
                                Confirm Booking
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Reviews Dialog Modal */}
            <Dialog open={isReviewsModalOpen} onOpenChange={handleReviewsModalChange}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Patient Reviews & Ratings</DialogTitle>
                        <DialogDescription>
                            Recent feedback for Dr. {selectedDoctorReviews?.user?.name} ({selectedDoctorReviews?.specialization})
                        </DialogDescription>
                    </DialogHeader>

                    {selectedDoctorReviews && (
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                            <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase">Overall Rating</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-2xl font-bold">
                                            {Number(selectedDoctorReviews.average_rating ?? 0).toFixed(1)}
                                        </span>
                                        <StarDisplay rating={Math.round(selectedDoctorReviews.average_rating ?? 0)} size="sm" />
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-muted-foreground font-medium uppercase">Total Reviews</p>
                                    <p className="text-lg font-semibold">{selectedDoctorReviews.reviews_count || 0}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {selectedDoctorReviews.reviews && selectedDoctorReviews.reviews.length > 0 ? (
                                    selectedDoctorReviews.reviews.map((rev) => (
                                        <div key={rev.id} className="rounded-lg border border-border p-3 space-y-1.5 text-sm">
                                            <div className="flex items-center justify-between">
                                                <span className="font-semibold text-foreground">
                                                    {rev.patient?.user?.name || 'Patient'}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    <StarDisplay rating={rev.rating} size="sm" />
                                                </div>
                                            </div>
                                            {rev.comment ? (
                                                <p className="text-muted-foreground italic text-xs">"{rev.comment}"</p>
                                            ) : (
                                                <p className="text-muted-foreground/60 italic text-xs">No written comment provided</p>
                                            )}
                                            <p className="text-[10px] text-muted-foreground/70">
                                                {rev.created_at?.slice(0, 10)}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-sm text-muted-foreground py-4">
                                        No reviews have been submitted for this doctor yet.
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button type="button" onClick={() => handleReviewsModalChange(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

function DoctorsSkeleton() {
    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="flex flex-col">
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                            <Skeleton className="size-12 rounded-full shrink-0" />
                            <div className="min-w-0 flex-1 space-y-1.5">
                                <Skeleton className="h-4 w-3/4 rounded" />
                                <Skeleton className="h-3 w-1/2 rounded" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-1 gap-4">
                        <div className="flex items-center gap-2">
                            <Skeleton className="size-4 rounded shrink-0" />
                            <Skeleton className="h-4 w-1/2 rounded" />
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Skeleton className="h-4 w-24 rounded" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <Skeleton className="h-14 rounded-lg" />
                            <Skeleton className="h-14 rounded-lg" />
                        </div>
                        <div className="space-y-1.5">
                            <Skeleton className="h-3 w-24 rounded" />
                            <div className="flex gap-1">
                                <Skeleton className="h-5 w-10 rounded-full" />
                                <Skeleton className="h-5 w-10 rounded-full" />
                                <Skeleton className="h-5 w-10 rounded-full" />
                            </div>
                        </div>
                        <Skeleton className="h-16 w-full rounded-lg" />
                        <div className="pt-2 border-t border-border mt-auto">
                            <Skeleton className="h-9 w-full rounded-md" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

Doctors.layout = {
    breadcrumbs: [
        { title: 'Browse Doctors', href: '/patient/doctors' },
    ],
};
