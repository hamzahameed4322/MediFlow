import { Head, router, useForm } from '@inertiajs/react';
import { CalendarDays, Clock3, Plus, Trash2 } from 'lucide-react';
import type { FormEvent } from 'react';
import { EmptyState } from '@/components/empty-state';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import type { DoctorSchedule } from '@/types';

type Props = {
    schedules: DoctorSchedule[];
};

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Schedules({ schedules }: Props) {
    const form = useForm({
        day: 'Monday',
        start_time: '09:00',
        end_time: '17:00',
        duration: 30,
    });

    function submit(e: FormEvent) {
        e.preventDefault();
        form.clearErrors();

        const { start_time, end_time } = form.data;

        // Disallow schedule start time between 12:00 AM and 06:00 AM (00:00 to 05:59)
        if (start_time < '06:00') {
            form.setError('start_time', 'Schedules are only allowed between 06:00 AM and 12:00 AM midnight (12:00 AM - 06:00 AM is not allowed).');
            return;
        }

        // Disallow schedule end time between 12:01 AM and 05:59 AM (00:01 to 05:59)
        if (end_time > '00:00' && end_time < '06:00') {
            form.setError('end_time', 'End time cannot be between 12:00 AM and 06:00 AM.');
            return;
        }

        // Start time must be before end time
        if (end_time !== '00:00' && start_time >= end_time) {
            form.setError('start_time', 'Start time must be before end time.');
            return;
        }

        form.post('/doctor/schedules', {
            preserveScroll: true,
            onSuccess: () => form.reset('start_time', 'end_time', 'duration'),
        });
    }

    function destroy(id: number) {
        router.delete(`/doctor/schedules/${id}`, { preserveScroll: true });
    }

    return (
        <>
            <Head title="Doctor Schedules" />
            <div className="flex flex-col gap-6 p-6">
                <section className="rounded-[1.75rem] border border-primary/10 bg-linear-to-br from-primary/[0.03] to-primary/[0.07] p-8 text-foreground shadow-xs dark:from-card dark:to-card dark:border-border">
                    <div className="flex flex-col gap-3">
                        <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-medium tracking-wide text-primary">
                            <CalendarDays className="size-3.5" />
                            Weekly availability
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight">Doctor schedules</h1>
                        <p className="max-w-2xl text-sm text-muted-foreground">Keep your weekly clinic slots consistent for patient booking and appointment flow.</p>
                    </div>
                </section>

                <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Plus className="size-5 text-(--primary)" />Add schedule</CardTitle>
                            <CardDescription>Create a recurring weekday slot (allowed 06:00 AM to 12:00 AM).</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4" onSubmit={submit}>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="day">Day</Label>
                                        <select id="day" value={form.data.day} onChange={(e) => form.setData('day', e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                            {DAYS.map((day) => <option key={day}>{day}</option>)}
                                        </select>
                                        <InputError message={form.errors.day} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="duration">Duration (mins)</Label>
                                        <Input id="duration" type="number" min="15" step="15" value={form.data.duration} onChange={(e) => form.setData('duration', Number(e.target.value))} />
                                        <InputError message={form.errors.duration} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="start_time">Start time</Label>
                                        <Input id="start_time" type="time" min="06:00" max="23:59" value={form.data.start_time} onChange={(e) => form.setData('start_time', e.target.value)} />
                                        <p className="text-[11px] text-muted-foreground">Allowed window: 06:00 AM - 12:00 AM</p>
                                        <InputError message={form.errors.start_time} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="end_time">End time</Label>
                                        <Input id="end_time" type="time" min="06:00" max="23:59" value={form.data.end_time} onChange={(e) => form.setData('end_time', e.target.value)} />
                                        <InputError message={form.errors.end_time} />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full" disabled={form.processing}>
                                    {form.processing && <Spinner className="mr-2 size-4" />}
                                    Save schedule
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Weekly slots</CardTitle>
                            <CardDescription>All saved availability windows for patients.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {schedules.length === 0 ? (
                                <EmptyState icon={Clock3} title="No schedules yet" description="Create your first clinic slot to open booking." />
                            ) : (
                                <div className="space-y-3">
                                    {schedules.map((schedule) => (
                                        <div key={schedule.id} className="flex items-center justify-between gap-3 rounded-2xl border p-4 hover:bg-muted/40">
                                            <div>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <p className="font-semibold">{schedule.day}</p>
                                                    <Badge variant="outline">{schedule.start_time.slice(0, 5)} - {schedule.end_time.slice(0, 5)}</Badge>
                                                    <Badge className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15">{schedule.duration} min</Badge>
                                                </div>
                                                <p className="mt-1 text-xs text-muted-foreground">Patients can book only inside this window.</p>
                                            </div>
                                            <Button variant="outline" size="sm" onClick={() => destroy(schedule.id)}>
                                                <Trash2 className="mr-2 size-4 text-red-600" /> Remove
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Schedules.layout = { breadcrumbs: [{ title: 'Doctor Schedules', href: '/doctor/schedules' }] };