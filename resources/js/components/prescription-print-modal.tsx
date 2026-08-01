import { useRef } from 'react';
import { Download, Printer, Stethoscope, Pill, FileText, Calendar, User } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
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
    const printableRef = useRef<HTMLDivElement>(null);

    const reactToPrintFn = useReactToPrint({
        contentRef: printableRef,
        documentTitle: appointment ? `Prescription_${patient?.name || 'Patient'}_${appointment.appointment_date}` : 'Prescription',
    });

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

    // Direct PDF file download to device downloads folder
    const handleDownloadPdf = () => {
        if (!printableRef.current) return;
        const opt = {
            margin: [10, 10, 10, 10],
            filename: `Prescription_${patient?.name ? patient.name.replace(/\s+/g, '_') : 'Patient'}_${appointment.appointment_date}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, logging: false },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };
        html2pdf().set(opt).from(printableRef.current).save();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader className="no-print">
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <FileText className="size-5 text-primary" />
                        Prescription & Consultation Pass
                    </DialogTitle>
                    <DialogDescription>
                        Save as PDF directly to your device or send to printer.
                    </DialogDescription>
                </DialogHeader>

                {/* Printable Document Container */}
                <div
                    ref={printableRef}
                    className="space-y-6 rounded-xl border bg-white p-5 sm:p-8 text-slate-900 shadow-xs dark:bg-white dark:text-slate-900"
                >
                    {/* Header Banner */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-teal-600 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white font-bold">
                                <Stethoscope className="size-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black tracking-tight text-teal-700">MediFlow Clinic</h2>
                                <p className="text-xs text-slate-500">Healthcare & Consultation Management</p>
                            </div>
                        </div>
                        <div className="text-left sm:text-right">
                            <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-800">
                                Official Medical Prescription
                            </span>
                            <p className="mt-1 text-xs text-slate-500 font-medium">
                                Date: {appointment.appointment_date}
                            </p>
                        </div>
                    </div>

                    {/* Patient & Doctor Information Grid */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-lg bg-slate-50 p-4 text-xs border border-slate-200">
                        <div className="space-y-1">
                            <p className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">Patient Information</p>
                            <p className="font-bold text-sm text-slate-900">{patient?.name || 'Patient'}</p>
                            {patient?.gender && <p className="text-slate-600">Gender: <span className="font-semibold text-slate-900 capitalize">{patient.gender}</span></p>}
                            {patient?.phone && <p className="text-slate-600">Phone: <span className="font-semibold text-slate-900">{patient.phone}</span></p>}
                            {patient?.dob && <p className="text-slate-600">DOB: <span className="font-semibold text-slate-900">{patient.dob}</span></p>}
                        </div>
                        <div className="space-y-1 text-left sm:text-right">
                            <p className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">Consultant Doctor</p>
                            <p className="font-bold text-sm text-slate-900">{doctorName}</p>
                            {doctor?.specialization && <p className="text-slate-600">Dept: <span className="font-semibold text-slate-900">{doctor.specialization}</span></p>}
                            {doctor?.qualification && <p className="text-slate-600">Qual: <span className="font-semibold text-slate-900">{doctor.qualification}</span></p>}
                            <p className="text-slate-600">Visit Time: <span className="font-semibold text-slate-900">{appointment.appointment_time?.slice(0, 5)}</span></p>
                        </div>
                    </div>

                    {/* Symptoms & Diagnosis */}
                    {consultation && (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
                            <div className="rounded-lg border border-teal-100 bg-teal-50/50 p-3">
                                <p className="font-bold text-teal-700 text-[11px] uppercase tracking-wide mb-1">Symptoms Reported</p>
                                <p className="text-slate-800">{consultation.symptoms || 'None specified'}</p>
                            </div>
                            <div className="rounded-lg border border-purple-100 bg-purple-50/50 p-3">
                                <p className="font-bold text-purple-700 text-[11px] uppercase tracking-wide mb-1">Diagnosis</p>
                                <p className="text-slate-800">{consultation.diagnosis || 'None specified'}</p>
                            </div>
                        </div>
                    )}

                    {/* Doctor's Notes */}
                    {consultation?.notes && (
                        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs">
                            <p className="font-bold text-amber-800 text-[11px] uppercase tracking-wide mb-1">Doctor's Clinical Notes</p>
                            <p className="text-slate-800 italic">{consultation.notes}</p>
                        </div>
                    )}

                    {/* Prescribed Medicines Table */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Pill className="size-4 text-teal-600" />
                            <h3 className="font-bold text-sm text-slate-900">Rx — Prescribed Medicines</h3>
                        </div>

                        {prescription && prescription.items && prescription.items.length > 0 ? (
                            <div className="rounded-lg border border-slate-200 overflow-x-auto">
                                <table className="w-full text-xs min-w-[500px]">
                                    <thead className="bg-slate-100 text-slate-700">
                                        <tr>
                                            <th className="py-2.5 px-3 text-left font-bold border-b border-slate-200">#</th>
                                            <th className="py-2.5 px-3 text-left font-bold border-b border-slate-200">Medicine Name</th>
                                            <th className="py-2.5 px-3 text-left font-bold border-b border-slate-200">Dosage</th>
                                            <th className="py-2.5 px-3 text-left font-bold border-b border-slate-200">Frequency</th>
                                            <th className="py-2.5 px-3 text-left font-bold border-b border-slate-200">Duration</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {prescription.items.map((item, index) => (
                                            <tr key={item.id || index}>
                                                <td className="py-2.5 px-3 text-slate-500 font-medium">{index + 1}</td>
                                                <td className="py-2.5 px-3 font-bold text-slate-900">{item.medicine_name}</td>
                                                <td className="py-2.5 px-3 text-slate-600">{item.dosage}</td>
                                                <td className="py-2.5 px-3 text-slate-600">{item.frequency}</td>
                                                <td className="py-2.5 px-3 text-slate-600">{item.duration}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="rounded-lg border border-dashed border-slate-300 p-4 text-center text-xs text-slate-500">
                                No medicines prescribed for this visit.
                            </div>
                        )}

                        {prescription?.instructions && (
                            <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs">
                                <p className="font-bold text-blue-700 mb-0.5">Special Instructions:</p>
                                <p className="text-slate-800">{prescription.instructions}</p>
                            </div>
                        )}
                    </div>

                    {/* Footer / Doctor Signature Block */}
                    <div className="pt-6 border-t border-slate-200 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end text-xs">
                        <div className="text-slate-400 text-[10px]">
                            <p>MediFlow Healthcare System — Automated Electronic Medical Record</p>
                            <p>Generated on: {new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="text-center w-full sm:w-48 space-y-1">
                            <div className="border-b border-slate-900 pb-1 mb-1">
                                <p className="font-serif italic text-sm text-slate-900">{doctorName}</p>
                            </div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Authorized Doctor Signature</p>
                        </div>
                    </div>
                </div>

                <DialogFooter className="no-print gap-2 sm:gap-0">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Close
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => reactToPrintFn()}
                        className="gap-2"
                    >
                        <Printer className="size-4" />
                        Print
                    </Button>
                    <Button
                        onClick={handleDownloadPdf}
                        className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                    >
                        <Download className="size-4" />
                        Download PDF
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
