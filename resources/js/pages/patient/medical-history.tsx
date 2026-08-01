import { Head } from '@inertiajs/react';
import { History, Stethoscope, Pill, ChevronDown, ChevronUp, Calendar, User, Printer } from 'lucide-react';
import { useState } from 'react';
import { EmptyState } from '@/components/empty-state';
import { PrescriptionPrintModal } from '@/components/prescription-print-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Appointment } from '@/types';

type Props = {
    history: Appointment[];
    patient?: {
        name?: string;
        email?: string;
        phone?: string;
        gender?: string;
        dob?: string;
    };
};

export default function MedicalHistory({ history, patient }: Props) {
    const [expanded, setExpanded] = useState<number | null>(null);
    const [selectedApptForPrint, setSelectedApptForPrint] = useState<Appointment | null>(null);

    const toggle = (id: number) => setExpanded(prev => (prev === id ? null : id));

    return (
        <>
            <Head title="Medical History" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight">Medical History</h1>
                    <p className="text-muted-foreground">A complete record of your past clinic visits, diagnoses, and prescriptions.</p>
                </div>

                {history.length === 0 ? (
                    <EmptyState icon={History} title="No medical history yet" description="Your completed consultations will appear here." />
                ) : (
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-5 top-0 h-full w-px bg-border" />

                        <div className="flex flex-col gap-6 pl-14">
                            {history.map((appt, idx) => {
                                const isOpen = expanded === appt.id;
                                const consultation = appt.consultation;
                                const prescription = consultation?.prescription;

                                return (
                                    <div key={appt.id} className="relative">
                                        {/* Timeline dot */}
                                        <div className="absolute -left-9 flex size-8 items-center justify-center rounded-full border-2 border-primary bg-background text-primary text-xs font-bold">
                                            {idx + 1}
                                        </div>

                                        <Card className="transition-shadow hover:shadow-md">
                                            <CardHeader className="pb-3">
                                                <div className="flex items-start justify-between gap-3 flex-wrap">
                                                    <div>
                                                        <CardTitle className="text-base">Visit — {appt.appointment_date}</CardTitle>
                                                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                                            <User className="size-3" />
                                                            <span>Dr. {appt.doctor?.user?.name}</span>
                                                            <span className="text-muted-foreground/40">•</span>
                                                            <span>{appt.doctor?.specialization}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-8 gap-1.5 text-xs"
                                                            onClick={() => setSelectedApptForPrint(appt)}
                                                        >
                                                            <Printer className="size-3.5" />
                                                            Print Prescription
                                                        </Button>
                                                        <Badge className="bg-primary/10 text-primary border border-primary/20 text-xs">
                                                            Completed
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </CardHeader>

                                            {consultation && (
                                                <CardContent className="space-y-3 pt-0">
                                                    {/* Diagnosis & Symptoms */}
                                                    <div className="grid gap-3 sm:grid-cols-2">
                                                        <div className="rounded-lg bg-primary/5 border border-primary/10 p-3">
                                                            <p className="text-[10px] font-semibold uppercase tracking-wide text-primary mb-1">Symptoms</p>
                                                            <p className="text-sm text-foreground">{consultation.symptoms}</p>
                                                        </div>
                                                        <div className="rounded-lg bg-purple-500/5 border border-purple-500/10 p-3">
                                                            <p className="text-[10px] font-semibold uppercase tracking-wide text-purple-600 mb-1">Diagnosis</p>
                                                            <p className="text-sm text-foreground">{consultation.diagnosis}</p>
                                                        </div>
                                                    </div>

                                                    {consultation.notes && (
                                                        <p className="text-xs text-muted-foreground italic border-l-2 border-muted pl-3">
                                                            Doctor's notes: {consultation.notes}
                                                        </p>
                                                    )}

                                                    {/* Prescription toggle */}
                                                    {prescription && prescription.items && prescription.items.length > 0 && (
                                                        <>
                                                            <button
                                                                onClick={() => toggle(appt.id)}
                                                                className="flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm font-medium hover:bg-muted/50 transition-colors"
                                                            >
                                                                <span className="flex items-center gap-2 text-primary">
                                                                    <Pill className="size-4" />
                                                                    {prescription.items.length} Medicine{prescription.items.length !== 1 ? 's' : ''} Prescribed
                                                                </span>
                                                                {isOpen ? <ChevronUp className="size-4 text-muted-foreground" /> : <ChevronDown className="size-4 text-muted-foreground" />}
                                                            </button>

                                                            {isOpen && (
                                                                <div className="rounded-lg border overflow-hidden">
                                                                    <table className="w-full text-xs">
                                                                        <thead className="bg-muted/60">
                                                                            <tr>
                                                                                <th className="py-2 px-3 text-left font-semibold text-muted-foreground">Medicine</th>
                                                                                <th className="py-2 px-3 text-left font-semibold text-muted-foreground">Dosage</th>
                                                                                <th className="py-2 px-3 text-left font-semibold text-muted-foreground">Frequency</th>
                                                                                <th className="py-2 px-3 text-left font-semibold text-muted-foreground">Duration</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className="divide-y">
                                                                            {prescription.items.map((item) => (
                                                                                <tr key={item.id} className="hover:bg-muted/30">
                                                                                    <td className="py-2 px-3 font-medium">{item.medicine_name}</td>
                                                                                    <td className="py-2 px-3 text-muted-foreground">{item.dosage}</td>
                                                                                    <td className="py-2 px-3 text-muted-foreground">{item.frequency}</td>
                                                                                    <td className="py-2 px-3 text-muted-foreground">{item.duration}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                    {prescription.instructions && (
                                                                        <div className="border-t bg-muted/30 px-3 py-2">
                                                                            <p className="text-xs text-muted-foreground"><span className="font-medium">Instructions: </span>{prescription.instructions}</p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </>
                                                    )}
                                                </CardContent>
                                            )}
                                        </Card>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            <PrescriptionPrintModal
                open={!!selectedApptForPrint}
                onOpenChange={(open) => !open && setSelectedApptForPrint(null)}
                appointment={selectedApptForPrint}
                patient={patient}
            />
        </>
    );
}

MedicalHistory.layout = {
    breadcrumbs: [
        { title: 'Medical History', href: '/patient/medical-history' },
    ],
};
