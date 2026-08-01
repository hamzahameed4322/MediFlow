import { useRef } from 'react';
import { Download, Ticket, Stethoscope, User, Calendar, Clock, CheckCircle, MapPin } from 'lucide-react';
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

export function AppointmentTokenModal({
    open,
    onOpenChange,
    appointment,
    patient,
}: Props) {
    const printableRef = useRef<HTMLDivElement>(null);

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

    // Direct PDF file download to device downloads folder
    const handleDownloadPdf = () => {
        if (!printableRef.current) return;
        const opt = {
            margin: [10, 10, 10, 10],
            filename: `Entry_Token_${tokenNumber}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, logging: false },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };
        html2pdf().set(opt).from(printableRef.current).save();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto sm:max-w-lg lg:max-w-xl">
                <DialogHeader className="no-print">
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <Ticket className="size-5 text-primary" />
                        Appointment Token Pass
                    </DialogTitle>
                    <DialogDescription>
                        Save as PDF directly to your device downloads folder.
                    </DialogDescription>
                </DialogHeader>

                {/* Printable Document Container */}
                <div
                    ref={printableRef}
                    className="space-y-5 rounded-2xl border-2 border-dashed border-teal-500/50 bg-white p-5 sm:p-6 lg:p-7 shadow-xs dark:bg-white dark:text-slate-900"
                >
                    {/* Header */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white font-bold">
                                <Stethoscope className="size-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-base leading-tight text-slate-900">MediFlow Clinic</h3>
                                <p className="text-xs text-slate-500">Waiting Lounge Entry Pass</p>
                            </div>
                        </div>
                        <span className="inline-self-start sm:inline-self-auto rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-300">
                            CONFIRMED TOKEN
                        </span>
                    </div>

                    {/* Token Number Card */}
                    <div className="rounded-xl bg-teal-50 border border-teal-200 p-4 text-center">
                        <p className="text-xs font-bold tracking-wider text-teal-800 uppercase">Queue Token Number</p>
                        <p className="mt-1 text-4xl font-black tracking-tight text-teal-900 font-mono">#{tokenNumber}</p>
                        <p className="mt-1.5 flex items-center justify-center gap-1.5 text-xs text-emerald-700 font-medium">
                            <CheckCircle className="size-4" /> Authorized Clinic Visit
                        </p>
                    </div>

                    {/* Patient & Doctor Details Grid */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs rounded-xl bg-slate-50 p-4 border border-slate-200">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Patient Information</p>
                            <p className="font-bold text-slate-900 text-base">{patient?.name || 'Patient'}</p>
                            {patient?.phone && <p className="text-slate-600 text-xs">Phone: <span className="font-semibold text-slate-900">{patient.phone}</span></p>}
                            {patient?.gender && <p className="text-slate-600 text-xs">Gender: <span className="font-semibold text-slate-900 capitalize">{patient.gender}</span></p>}
                        </div>
                        <div className="space-y-1 text-left sm:text-right">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Consultant Doctor</p>
                            <p className="font-bold text-slate-900 text-base">{doctorName}</p>
                            {doctor?.specialization && <p className="text-slate-600 text-xs">Dept: <span className="font-semibold text-slate-900">{doctor.specialization}</span></p>}
                            {doctor?.consultation_fee && <p className="text-slate-600 text-xs">Fee: <span className="font-semibold text-slate-900">${Number(doctor.consultation_fee).toFixed(2)}</span></p>}
                        </div>
                    </div>

                    {/* Schedule Row */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 rounded-xl border border-slate-200 bg-white p-4 text-xs">
                        <div className="flex items-center gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                                <Calendar className="size-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Appointment Date</p>
                                <p className="font-bold text-slate-900 text-sm">{appointment.appointment_date}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 sm:justify-end">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                                <Clock className="size-5" />
                            </div>
                            <div className="text-left sm:text-right">
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Time Slot</p>
                                <p className="font-bold text-teal-700 text-sm">{formatTime(appointment.appointment_time)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Guidance Box */}
                    <div className="flex items-start gap-3 rounded-xl bg-sky-50 border border-sky-200 p-3 text-xs text-sky-900">
                        <MapPin className="size-4 shrink-0 mt-0.5 text-sky-600" />
                        <p className="text-xs leading-relaxed">
                            Please show this token slip to the clinic reception desk upon arrival 10 minutes prior to your time slot to enter the waiting lounge.
                        </p>
                    </div>
                </div>

                <DialogFooter className="no-print gap-2 sm:gap-0">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Close
                    </Button>
                    <Button onClick={handleDownloadPdf} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                        <Download className="size-4" />
                        Download PDF
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
