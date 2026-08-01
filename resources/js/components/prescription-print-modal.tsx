import { Download, Stethoscope, Pill, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import PdfController from '@/actions/App/Http/Controllers/Patient/PdfController';
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

export function PrescriptionPrintModal({
    open,
    onOpenChange,
    appointment,
    patient,
}: Props) {
    if (!appointment) return null;

    const consultation = appointment.consultation;
    const prescription = consultation?.prescription;
    const doctor = appointment.doctor;
    const rawDoctorName = doctor?.user?.name || '';
    const doctorName = rawDoctorName
        ? rawDoctorName.trim().startsWith('Dr.')
            ? rawDoctorName.trim()
            : `Dr. ${rawDoctorName.trim()}`
        : 'Consultant Doctor';

    const pdfUrl = PdfController.downloadPrescription.url({ appointment: appointment.id });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[88vh] flex flex-col overflow-hidden p-0 sm:rounded-2xl border bg-background shadow-xl">
                {/* Fixed Top Header */}
                <DialogHeader className="no-print px-5 py-4 sm:px-6 border-b bg-card shrink-0">
                    <DialogTitle className="flex items-center gap-2.5 text-lg sm:text-xl font-bold text-foreground">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <FileText className="size-4 sm:size-5" />
                        </div>
                        Prescription & Consultation Pass
                    </DialogTitle>
                    <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
                        Save as PDF directly to your device downloads folder.
                    </DialogDescription>
                </DialogHeader>

                {/* Scrollable Modal Body */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-card-foreground">
                    {/* Header Banner */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
                        <div className="flex items-center gap-3">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold shadow-sm">
                                <Stethoscope className="size-6" />
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-primary">MediFlow Clinic</h2>
                                <p className="text-xs text-muted-foreground">Healthcare & Consultation Management</p>
                            </div>
                        </div>
                        <div className="text-left sm:text-right">
                            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                                Official Medical Prescription
                            </span>
                            <p className="mt-1 text-xs text-muted-foreground font-medium">
                                Date: {appointment.appointment_date}
                            </p>
                        </div>
                    </div>

                    {/* Patient & Doctor Information Grid */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-xl bg-muted/40 p-4 text-xs border border-border">
                        <div className="space-y-1">
                            <p className="font-bold uppercase tracking-wider text-muted-foreground text-[10px]">Patient Information</p>
                            <p className="font-bold text-sm text-foreground">{patient?.name || 'Patient'}</p>
                            {patient?.gender && <p className="text-muted-foreground">Gender: <span className="font-semibold text-foreground capitalize">{patient.gender}</span></p>}
                            {patient?.phone && <p className="text-muted-foreground">Phone: <span className="font-semibold text-foreground">{patient.phone}</span></p>}
                            {patient?.dob && <p className="text-muted-foreground">DOB: <span className="font-semibold text-foreground">{patient.dob}</span></p>}
                        </div>
                        <div className="space-y-1 text-left sm:text-right">
                            <p className="font-bold uppercase tracking-wider text-muted-foreground text-[10px]">Consultant Doctor</p>
                            <p className="font-bold text-sm text-foreground">{doctorName}</p>
                            {doctor?.specialization && <p className="text-muted-foreground">Dept: <span className="font-semibold text-foreground">{doctor.specialization}</span></p>}
                            {doctor?.qualification && <p className="text-muted-foreground">Qual: <span className="font-semibold text-foreground">{doctor.qualification}</span></p>}
                            <p className="text-muted-foreground">Visit Time: <span className="font-semibold text-foreground">{appointment.appointment_time?.slice(0, 5)}</span></p>
                        </div>
                    </div>

                    {/* Symptoms & Diagnosis */}
                    {consultation && (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
                            <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5">
                                <p className="font-bold text-primary text-[11px] uppercase tracking-wide mb-1">Symptoms Reported</p>
                                <p className="text-foreground leading-relaxed">{consultation.symptoms || 'None specified'}</p>
                            </div>
                            <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-3.5">
                                <p className="font-bold text-purple-600 dark:text-purple-400 text-[11px] uppercase tracking-wide mb-1">Diagnosis</p>
                                <p className="text-foreground leading-relaxed">{consultation.diagnosis || 'None specified'}</p>
                            </div>
                        </div>
                    )}

                    {/* Doctor's Notes */}
                    {consultation?.notes && (
                        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5 text-xs">
                            <p className="font-bold text-amber-700 dark:text-amber-400 text-[11px] uppercase tracking-wide mb-1">Doctor's Clinical Notes</p>
                            <p className="text-foreground italic leading-relaxed">{consultation.notes}</p>
                        </div>
                    )}

                    {/* Prescribed Medicines Table */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Pill className="size-4 text-primary" />
                            <h3 className="font-bold text-sm text-foreground">Rx — Prescribed Medicines</h3>
                        </div>

                        {prescription && prescription.items && prescription.items.length > 0 ? (
                            <div className="rounded-xl border overflow-x-auto">
                                <table className="w-full text-xs min-w-[480px]">
                                    <thead className="bg-muted/80 text-foreground">
                                        <tr>
                                            <th className="py-2.5 px-3 text-left font-bold border-b">#</th>
                                            <th className="py-2.5 px-3 text-left font-bold border-b">Medicine Name</th>
                                            <th className="py-2.5 px-3 text-left font-bold border-b">Dosage</th>
                                            <th className="py-2.5 px-3 text-left font-bold border-b">Frequency</th>
                                            <th className="py-2.5 px-3 text-left font-bold border-b">Duration</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y bg-background">
                                        {prescription.items.map((item, index) => (
                                            <tr key={item.id || index}>
                                                <td className="py-2.5 px-3 text-muted-foreground font-medium">{index + 1}</td>
                                                <td className="py-2.5 px-3 font-bold text-foreground">{item.medicine_name}</td>
                                                <td className="py-2.5 px-3 text-muted-foreground">{item.dosage}</td>
                                                <td className="py-2.5 px-3 text-muted-foreground">{item.frequency}</td>
                                                <td className="py-2.5 px-3 text-muted-foreground">{item.duration}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="rounded-xl border border-dashed p-4 text-center text-xs text-muted-foreground">
                                No medicines prescribed for this visit.
                            </div>
                        )}

                        {prescription?.instructions && (
                            <div className="mt-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-3.5 text-xs">
                                <p className="font-bold text-blue-600 dark:text-blue-400 mb-0.5">Special Instructions:</p>
                                <p className="text-foreground leading-relaxed">{prescription.instructions}</p>
                            </div>
                        )}
                    </div>

                    {/* Footer / Doctor Signature Block */}
                    <div className="pt-6 border-t flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end text-xs">
                        <div className="text-muted-foreground text-[10px]">
                            <p>MediFlow Healthcare System — Electronic Medical Record</p>
                            <p>Generated on: {new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="text-center w-full sm:w-48 space-y-1">
                            <div className="border-b border-foreground/40 pb-1 mb-1">
                                <p className="font-serif italic text-sm text-foreground">{doctorName}</p>
                            </div>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Authorized Doctor Signature</p>
                        </div>
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
