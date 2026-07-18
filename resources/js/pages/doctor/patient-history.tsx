import { Head } from '@inertiajs/react';
import { Activity, FileText } from 'lucide-react';
import { EmptyState } from '@/components/empty-state';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Appointment, PatientProfile } from '@/types';

type Props = {
    patient: PatientProfile;
    history: Appointment[];
};

export default function PatientHistory({ patient, history }: Props) {
    return (
        <>
            <Head title={`${patient.user?.name ?? 'Patient'} History`} />
            <div className="flex flex-col gap-6 p-6">
                <section className="rounded-[1.75rem] border border-primary/10 bg-linear-to-br from-primary/[0.03] to-primary/[0.07] p-8 text-foreground shadow-xs dark:from-card dark:to-card dark:border-border">
                    <div className="space-y-3">
                        <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-medium tracking-wide text-primary">
                            <Activity className="size-3.5" /> Clinical history
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight">{patient.user?.name}</h1>
                        <p className="max-w-2xl text-sm text-muted-foreground">Patient visit history, consultations, and prescriptions in one detailed timeline.</p>
                    </div>
                </section>

                {history.length === 0 ? (
                    <EmptyState icon={FileText} title="No history found" description="Completed appointments will appear here." />
                ) : (
                    <div className="space-y-4">
                        {history.map((appointment) => (
                            <Card key={appointment.id}>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between gap-3 text-lg">
                                        <span>Visit - {appointment.appointment_date}</span>
                                        <Badge variant="outline">{appointment.status}</Badge>
                                    </CardTitle>
                                    <CardDescription>{appointment.appointment_time.slice(0, 5)} • {appointment.reason || 'General consultation'}</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2 rounded-2xl border bg-muted/30 p-4">
                                        <p className="text-xs uppercase tracking-wide text-muted-foreground">Consultation</p>
                                        <p className="text-sm"><strong>Symptoms:</strong> {appointment.consultation?.symptoms || 'N/A'}</p>
                                        <p className="text-sm"><strong>Diagnosis:</strong> {appointment.consultation?.diagnosis || 'N/A'}</p>
                                        <p className="text-sm"><strong>Notes:</strong> {appointment.consultation?.notes || 'N/A'}</p>
                                    </div>
                                    <div className="space-y-2 rounded-2xl border bg-muted/30 p-4">
                                        <p className="text-xs uppercase tracking-wide text-muted-foreground">Prescription</p>
                                        {appointment.consultation?.prescription?.items?.length ? appointment.consultation.prescription.items.map((item) => (
                                            <div key={item.id} className="rounded-xl border bg-background p-3">
                                                <p className="font-semibold">{item.medicine_name}</p>
                                                <p className="text-sm text-muted-foreground">{item.dosage} • {item.frequency} • {item.duration}</p>
                                            </div>
                                        )) : <p className="text-sm text-muted-foreground">No prescription items recorded.</p>}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

PatientHistory.layout = { breadcrumbs: [{ title: 'Doctor Patient History', href: '/doctor/patient-history' }] };