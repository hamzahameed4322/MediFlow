import { Ticket, Stethoscope, User, Calendar, Clock, Printer, CheckCircle, MapPin } from 'lucide-react';
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

    const handlePrint = () => {
        const printWindow = window.open('', '_blank', 'width=800,height=900');
        if (!printWindow) {
            window.print();
            return;
        }

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Clinic Entry Token Pass - ${tokenNumber}</title>
                    <meta charset="utf-8" />
                    <style>
                        @page { size: A4 portrait; margin: 15mm; }
                        body {
                            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                            color: #111827;
                            background: #ffffff;
                            margin: 0;
                            padding: 24px;
                            font-size: 13px;
                            line-height: 1.5;
                        }
                        .ticket-card {
                            border: 2px dashed #0d9488;
                            border-radius: 16px;
                            padding: 28px;
                            background: #ffffff;
                            max-width: 650px;
                            margin: 0 auto;
                            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                        }
                        .header {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            border-bottom: 2px solid #e5e7eb;
                            padding-bottom: 16px;
                            margin-bottom: 20px;
                        }
                        .clinic-title { font-size: 24px; font-weight: 800; color: #0d9488; margin: 0; }
                        .clinic-sub { font-size: 12px; color: #6b7280; margin-top: 2px; }
                        .token-box {
                            text-align: center;
                            background: #f0fdf4;
                            border: 1px solid #bbf7d0;
                            border-radius: 12px;
                            padding: 20px;
                            margin-bottom: 20px;
                        }
                        .token-label { font-size: 11px; font-weight: 800; text-transform: uppercase; color: #15803d; letter-spacing: 0.1em; }
                        .token-num { font-size: 36px; font-weight: 900; color: #166534; font-family: monospace; margin: 4px 0; }
                        .token-status { font-size: 12px; font-weight: 600; color: #15803d; }
                        .info-grid {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 16px;
                            background: #f9fafb;
                            border: 1px solid #f3f4f6;
                            border-radius: 12px;
                            padding: 16px;
                            margin-bottom: 20px;
                        }
                        .label {
                            text-transform: uppercase;
                            font-size: 9px;
                            font-weight: 700;
                            color: #6b7280;
                            letter-spacing: 0.05em;
                            margin-bottom: 4px;
                        }
                        .val-main { font-size: 15px; font-weight: 700; color: #111827; margin: 0 0 2px 0; }
                        .val-sub { color: #4b5563; font-size: 12px; }
                        .text-right { text-align: right; }
                        .instructions-box {
                            background: #eff6ff;
                            border: 1px solid #dbeafe;
                            border-radius: 10px;
                            padding: 14px 18px;
                            font-size: 12px;
                            color: #1e40af;
                            margin-bottom: 20px;
                        }
                        .footer {
                            border-top: 1px solid #e5e7eb;
                            padding-top: 16px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            font-size: 10px;
                            color: #9ca3af;
                        }
                        .barcode-stub {
                            font-family: monospace;
                            letter-spacing: 4px;
                            font-size: 14px;
                            font-weight: bold;
                            color: #374151;
                        }
                    </style>
                </head>
                <body>
                    <div class="ticket-card">
                        <div class="header">
                            <div>
                                <h1 class="clinic-title">MediFlow Clinic</h1>
                                <p class="clinic-sub">Patient Waiting Lounge & Consultation Entry Pass</p>
                            </div>
                            <div class="text-right">
                                <span style="background: #ccfbf1; color: #0f766e; padding: 5px 14px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase;">
                                    Confirmed Token
                                </span>
                            </div>
                        </div>

                        <div class="token-box">
                            <div class="token-label">Waiting Room Queue Token</div>
                            <div class="token-num">#${tokenNumber}</div>
                            <div class="token-status">✓ Entry Authorized for Consultation</div>
                        </div>

                        <div class="info-grid">
                            <div>
                                <div class="label">Patient Information</div>
                                <div class="val-main">${patient?.name || 'Patient'}</div>
                                ${patient?.phone ? `<div class="val-sub">Phone: <strong>${patient.phone}</strong></div>` : ''}
                                ${patient?.gender ? `<div class="val-sub">Gender: <strong>${patient.gender}</strong></div>` : ''}
                            </div>
                            <div class="text-right">
                                <div class="label">Consultant Doctor</div>
                                <div class="val-main">${doctorName}</div>
                                ${doctor?.specialization ? `<div class="val-sub">Department: <strong>${doctor.specialization}</strong></div>` : ''}
                                ${doctor?.consultation_fee ? `<div class="val-sub">Fee: <strong>$${Number(doctor.consultation_fee).toFixed(2)}</strong></div>` : ''}
                            </div>
                        </div>

                        <div class="info-grid" style="grid-template-columns: 1fr 1fr; margin-bottom: 20px;">
                            <div>
                                <div class="label">Appointment Date</div>
                                <div class="val-main">${appointment.appointment_date}</div>
                            </div>
                            <div class="text-right">
                                <div class="label">Scheduled Time Slot</div>
                                <div class="val-main" style="color: #0d9488;">${formatTime(appointment.appointment_time)}</div>
                            </div>
                        </div>

                        <div class="instructions-box">
                            <strong>Notice for Patient:</strong> Please arrive 10 minutes prior to your time slot and show this Token Entry Pass to the reception desk.
                        </div>

                        <div class="footer">
                            <div>
                                <p style="margin: 0;">MediFlow Electronic Health Systems</p>
                                <p style="margin: 2px 0 0 0;">Generated: ${new Date().toLocaleString()}</p>
                            </div>
                            <div class="barcode-stub">|||| ||| ||||| || |||</div>
                        </div>
                    </div>

                    <script>
                        window.onload = function() {
                            window.print();
                            window.onafterprint = function() {
                                window.close();
                            };
                        };
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto sm:max-w-lg lg:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <Ticket className="size-5 text-primary" />
                        Appointment Token Pass
                    </DialogTitle>
                    <DialogDescription>
                        Present this Entry Pass at the clinic reception and waiting lounge.
                    </DialogDescription>
                </DialogHeader>

                {/* Token Preview Slip UI - Responsive for Laptop & Mobile */}
                <div className="space-y-5 rounded-2xl border-2 border-dashed border-primary/40 bg-card p-5 sm:p-6 lg:p-7 shadow-xs">
                    {/* Header */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
                        <div className="flex items-center gap-3">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
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
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs rounded-xl bg-muted/40 p-4">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Patient Information</p>
                            <p className="font-bold text-foreground text-base">{patient?.name || 'Patient'}</p>
                            {patient?.phone && <p className="text-muted-foreground text-xs">Phone: <span className="font-medium text-foreground">{patient.phone}</span></p>}
                            {patient?.gender && <p className="text-muted-foreground text-xs">Gender: <span className="font-medium text-foreground capitalize">{patient.gender}</span></p>}
                        </div>
                        <div className="space-y-1 text-left sm:text-right">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Consultant Doctor</p>
                            <p className="font-bold text-foreground text-base">{doctorName}</p>
                            {doctor?.specialization && <p className="text-muted-foreground text-xs">Dept: <span className="font-medium text-foreground">{doctor.specialization}</span></p>}
                            {doctor?.consultation_fee && <p className="text-muted-foreground text-xs">Fee: <span className="font-medium text-foreground">${Number(doctor.consultation_fee).toFixed(2)}</span></p>}
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
                                <p className="font-semibold text-foreground text-sm">{appointment.appointment_date}</p>
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
                    <div className="flex items-start gap-3 rounded-xl bg-sky-500/5 border border-sky-500/15 p-3 text-xs text-sky-800 dark:text-sky-300">
                        <MapPin className="size-4 shrink-0 mt-0.5 text-sky-600" />
                        <p className="text-xs leading-relaxed">
                            Please show this token slip to the clinic reception desk upon arrival 10 minutes prior to your time slot to enter the waiting lounge.
                        </p>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Close
                    </Button>
                    <Button onClick={handlePrint} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                        <Printer className="size-4" />
                        Print Token Slip
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
