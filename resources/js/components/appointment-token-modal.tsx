import { Ticket, Stethoscope, Calendar, Clock, CheckCircle, MapPin, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import PdfController from '@/actions/App/Http/Controllers/Pdf/PdfController';
import type { Appointment } from '@/types';

type PatientInfo = {
    name?: string;
    email?: string;
    phone?: string;
    gender?: string;
    dob?: string;
};

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    appointment: Appointment | null;
    patient?: PatientInfo | null;
};

export function AppointmentTokenModal({
    open,
    onOpenChange,
    appointment,
    patient,
}: Props) {
    if (!appointment) return null;

    const doctor = appointment.doctor;
    const rawDoctorName = doctor?.user?.name || '';
    const doctorName = rawDoctorName
        ? rawDoctorName.trim().startsWith('Dr.')
            ? rawDoctorName.trim()
            : `Dr. ${rawDoctorName.trim()}`
        : 'Consultant Doctor';

    // Unique sequential token ID based on appointment reference
    const tokenNumber = `TK-${String(appointment.id).padStart(4, '0')}`;

    const formatTime = (time: string) => {
        if (!time) return '';
        const [h, m] = time.split(':');
        const hour = parseInt(h);
        return `${hour > 12 ? hour - 12 : hour || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
    };

    const pdfUrl = PdfController.downloadToken.url({ appointment: appointment.id });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl max-h-[88vh] flex flex-col overflow-hidden p-0 sm:rounded-2xl border bg-background shadow-xl sm:max-w-lg lg:max-w-xl">
                {/* Fixed Top Header */}
                <DialogHeader className="no-print px-5 py-4 sm:px-6 border-b bg-card shrink-0">
                    <DialogTitle className="flex items-center gap-2.5 text-lg sm:text-xl font-bold text-foreground">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Ticket className="size-4 sm:size-5" />
                        </div>
                        Appointment Token Pass
                    </DialogTitle>
                    <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
                        Save as PDF directly to your device downloads folder.
                    </DialogDescription>
                </DialogHeader>

                {/* Scrollable Modal Body */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-card-foreground">
                    {/* Header */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
                        <div className="flex items-center gap-3">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold shadow-sm">
                                <Stethoscope className="size-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-base leading-tight text-foreground">MediFlow Clinic</h3>
                                <p className="text-xs text-muted-foreground">Waiting Lounge Entry Pass</p>
                            </div>
                        </div>
                        <span className="inline-self-start sm:inline-self-auto rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            CONFIRMED TOKEN
                        </span>
                    </div>

                    {/* Token Number Card */}
                    <div className="rounded-xl bg-primary/5 border border-primary/15 p-4 text-center">
                        <p className="text-xs font-bold tracking-wider text-primary uppercase">Queue Token Number</p>
                        <p className="mt-1 text-4xl font-black tracking-tight text-primary font-mono">#{tokenNumber}</p>
                        <p className="mt-1.5 flex items-center justify-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                            <CheckCircle className="size-4" /> Authorized Clinic Visit
                        </p>
                    </div>

                    {/* Patient & Doctor Details Grid */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs rounded-xl bg-muted/40 p-4 border border-border">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Patient Information</p>
                            <p className="font-bold text-foreground text-base">{patient?.name || 'Patient'}</p>
                            {patient?.phone && <p className="text-muted-foreground text-xs">Phone: <span className="font-semibold text-foreground">{patient.phone}</span></p>}
                            {patient?.gender && <p className="text-muted-foreground text-xs">Gender: <span className="font-semibold text-foreground capitalize">{patient.gender}</span></p>}
                        </div>
                        <div className="space-y-1 text-left sm:text-right">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Consultant Doctor</p>
                            <p className="font-bold text-foreground text-base">{doctorName}</p>
                            {doctor?.specialization && <p className="text-muted-foreground text-xs">Dept: <span className="font-semibold text-foreground">{doctor.specialization}</span></p>}
                            {doctor?.consultation_fee && <p className="text-muted-foreground text-xs">Fee: <span className="font-semibold text-foreground">${Number(doctor.consultation_fee).toFixed(2)}</span></p>}
                        </div>
                    </div>

                    {/* Schedule Row */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 rounded-xl border bg-background p-4 text-xs">
                        <div className="flex items-center gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Calendar className="size-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase">Appointment Date</p>
                                <p className="font-bold text-foreground text-sm">{appointment.appointment_date}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 sm:justify-end">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600">
                                <Clock className="size-5" />
                            </div>
                            <div className="text-left sm:text-right">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase">Time Slot</p>
                                <p className="font-bold text-primary text-sm">{formatTime(appointment.appointment_time)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Guidance Box */}
                    <div className="flex items-start gap-3 rounded-xl bg-sky-500/5 border border-sky-500/15 p-3.5 text-xs text-sky-800 dark:text-sky-300">
                        <MapPin className="size-4 shrink-0 mt-0.5 text-sky-600" />
                        <p className="text-xs leading-relaxed">
                            Please show this token slip to the clinic reception desk upon arrival 10 minutes prior to your time slot to enter the waiting lounge.
                        </p>
                    </div>
                </div>

                {/* Sticky Bottom Footer - Always Visible on Mobile */}
                <DialogFooter className="no-print px-5 py-3.5 sm:px-6 border-t bg-muted/20 shrink-0 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-2.5">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto font-medium">
                        Close
                    </Button>
                    <Button asChild className="w-full sm:w-auto gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm">
                        <a href={pdfUrl} target="_blank" rel="noreferrer" download>
                            <Download className="size-4" />
                            <span>Download PDF</span>
                        </a>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
