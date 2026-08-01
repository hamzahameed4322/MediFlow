import { Printer, Stethoscope, User, Calendar, Pill, FileText } from 'lucide-react';
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

    const handlePrint = () => {
        const printWindow = window.open('', '_blank', 'width=800,height=900');
        if (!printWindow) {
            window.print();
            return;
        }

        const itemsHtml = prescription?.items && prescription.items.length > 0
            ? prescription.items.map((item, i) => `
                <tr>
                    <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${i + 1}</td>
                    <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">${item.medicine_name}</td>
                    <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">${item.dosage}</td>
                    <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">${item.frequency}</td>
                    <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">${item.duration}</td>
                </tr>
            `).join('')
            : `<tr><td colspan="5" style="padding: 16px; text-align: center; color: #6b7280;">No medicines prescribed for this visit.</td></tr>`;

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Prescription - ${patient?.name || 'Patient'} - ${appointment.appointment_date}</title>
                    <meta charset="utf-8" />
                    <style>
                        @page { size: A4; margin: 15mm; }
                        body {
                            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                            color: #111827;
                            background: #ffffff;
                            margin: 0;
                            padding: 24px;
                            font-size: 13px;
                            line-height: 1.5;
                        }
                        .header {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            border-bottom: 2px solid #0d9488;
                            padding-bottom: 16px;
                            margin-bottom: 20px;
                        }
                        .clinic-title { font-size: 24px; font-weight: 800; color: #0d9488; margin: 0; }
                        .clinic-sub { font-size: 11px; color: #6b7280; margin-top: 2px; }
                        .badge {
                            background: #ccfbf1;
                            color: #0f766e;
                            padding: 4px 12px;
                            border-radius: 9999px;
                            font-size: 11px;
                            font-weight: 600;
                            display: inline-block;
                        }
                        .info-grid {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 16px;
                            background: #f9fafb;
                            border: 1px solid #e5e7eb;
                            border-radius: 8px;
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
                        .val-name { font-size: 15px; font-weight: 700; color: #111827; margin: 0 0 4px 0; }
                        .val-line { margin-top: 2px; color: #4b5563; font-size: 12px; }
                        .text-right { text-align: right; }
                        .boxes {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 12px;
                            margin-bottom: 20px;
                        }
                        .box {
                            border: 1px solid #e5e7eb;
                            border-radius: 8px;
                            padding: 12px;
                            background: #ffffff;
                        }
                        .box-title { font-size: 10px; font-weight: 700; text-transform: uppercase; margin-bottom: 4px; }
                        .symptoms { color: #0d9488; }
                        .diagnosis { color: #7e22ce; }
                        .notes-box {
                            border: 1px solid #fef3c7;
                            background: #fffbeb;
                            border-radius: 8px;
                            padding: 12px;
                            margin-bottom: 20px;
                            color: #92400e;
                        }
                        .section-heading { font-weight: 700; font-size: 13px; margin-bottom: 8px; color: #111827; }
                        .table-container { border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 20px; }
                        table { width: 100%; border-collapse: collapse; text-align: left; font-size: 12px; }
                        th { background: #f3f4f6; padding: 10px 12px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb; }
                        .instructions { background: #eff6ff; border: 1px solid #dbeafe; border-radius: 8px; padding: 12px; margin-top: 12px; color: #1e40af; font-size: 12px; }
                        .footer {
                            margin-top: 40px;
                            border-top: 1px solid #e5e7eb;
                            padding-top: 20px;
                            display: flex;
                            justify-content: space-between;
                            align-items: flex-end;
                        }
                        .footer-left { font-size: 10px; color: #9ca3af; }
                        .sig-box { text-align: center; width: 200px; }
                        .sig-line { border-bottom: 1px solid #374151; padding-bottom: 4px; margin-bottom: 4px; font-family: Georgia, serif; font-style: italic; font-size: 14px; }
                        .sig-title { font-size: 9px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <div>
                            <h1 class="clinic-title">MediFlow Clinic</h1>
                            <p class="clinic-sub">Healthcare & Consultation Management System</p>
                        </div>
                        <div class="text-right">
                            <span class="badge">Official Prescription Slip</span>
                            <p style="margin-top: 6px; font-size: 11px; color: #6b7280;">Date: ${appointment.appointment_date}</p>
                        </div>
                    </div>

                    <div class="info-grid">
                        <div>
                            <div class="label">Patient Information</div>
                            <div class="val-name">${patient?.name || 'Patient'}</div>
                            ${patient?.gender ? `<div class="val-line">Gender: <strong>${patient.gender}</strong></div>` : ''}
                            ${patient?.phone ? `<div class="val-line">Phone: <strong>${patient.phone}</strong></div>` : ''}
                            ${patient?.dob ? `<div class="val-line">DOB: <strong>${patient.dob}</strong></div>` : ''}
                        </div>
                        <div class="text-right">
                            <div class="label">Consultant Doctor</div>
                            <div class="val-name">${doctorName}</div>
                            ${doctor?.specialization ? `<div class="val-line">Specialization: <strong>${doctor.specialization}</strong></div>` : ''}
                            ${doctor?.qualification ? `<div class="val-line">Qualification: <strong>${doctor.qualification}</strong></div>` : ''}
                            <div class="val-line">Visit Time: <strong>${appointment.appointment_time?.slice(0, 5)}</strong></div>
                        </div>
                    </div>

                    ${consultation ? `
                        <div class="boxes">
                            <div class="box">
                                <div class="box-title symptoms">Symptoms Reported</div>
                                <div>${consultation.symptoms || 'None specified'}</div>
                            </div>
                            <div class="box">
                                <div class="box-title diagnosis">Diagnosis</div>
                                <div>${consultation.diagnosis || 'None specified'}</div>
                            </div>
                        </div>
                    ` : ''}

                    ${consultation?.notes ? `
                        <div class="notes-box">
                            <strong style="display:block; margin-bottom: 2px; font-style: normal; text-transform: uppercase; font-size: 9px; letter-spacing: 0.05em;">Doctor's Clinical Notes</strong>
                            ${consultation.notes}
                        </div>
                    ` : ''}

                    <div class="section-heading">Prescribed Medicines</div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th style="width: 30px;">#</th>
                                    <th>Medicine Name</th>
                                    <th>Dosage</th>
                                    <th>Frequency</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${itemsHtml}
                            </tbody>
                        </table>
                    </div>

                    ${prescription?.instructions ? `
                        <div class="instructions">
                            <strong>Special Instructions:</strong> ${prescription.instructions}
                        </div>
                    ` : ''}

                    <div class="footer">
                        <div class="footer-left">
                            <p>MediFlow Healthcare System — Automated Electronic Medical Record</p>
                            <p>Printed on: ${new Date().toLocaleDateString()}</p>
                        </div>
                        <div class="sig-box">
                            <div class="sig-line">${doctorName}</div>
                            <div class="sig-title">Authorized Doctor Signature</div>
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
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader className="no-print">
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <Printer className="size-5 text-primary" />
                        Print Prescription & Visit Details
                    </DialogTitle>
                    <DialogDescription>
                        Review the consultation record and click print to generate a printable slip.
                    </DialogDescription>
                </DialogHeader>

                {/* Content Container (Modal UI Preview) */}
                <div className="space-y-6 rounded-xl border bg-card p-4 sm:p-6 shadow-xs">
                    {/* Header Banner */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
                                <Stethoscope className="size-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold tracking-tight text-foreground">MediFlow Clinic</h2>
                                <p className="text-xs text-muted-foreground">Healthcare & Consultation Management</p>
                            </div>
                        </div>
                        <div className="text-left sm:text-right">
                            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                Official Prescription Slip
                            </span>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Date: {appointment.appointment_date}
                            </p>
                        </div>
                    </div>

                    {/* Patient & Doctor Information Grid */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-lg bg-muted/40 p-4 text-xs">
                        <div className="space-y-1">
                            <p className="font-semibold uppercase tracking-wider text-muted-foreground text-[10px]">Patient Information</p>
                            <p className="font-bold text-sm text-foreground">{patient?.name || 'Patient'}</p>
                            {patient?.gender && <p className="text-muted-foreground">Gender: <span className="font-medium text-foreground capitalize">{patient.gender}</span></p>}
                            {patient?.phone && <p className="text-muted-foreground">Phone: <span className="font-medium text-foreground">{patient.phone}</span></p>}
                            {patient?.dob && <p className="text-muted-foreground">DOB: <span className="font-medium text-foreground">{patient.dob}</span></p>}
                        </div>
                        <div className="space-y-1 text-left sm:text-right">
                            <p className="font-semibold uppercase tracking-wider text-muted-foreground text-[10px]">Consultant Doctor</p>
                            <p className="font-bold text-sm text-foreground">{doctorName}</p>
                            {doctor?.specialization && <p className="text-muted-foreground">Specialization: <span className="font-medium text-foreground">{doctor.specialization}</span></p>}
                            {doctor?.qualification && <p className="text-muted-foreground">Qualification: <span className="font-medium text-foreground">{doctor.qualification}</span></p>}
                            <p className="text-muted-foreground">Visit Time: <span className="font-medium text-foreground">{appointment.appointment_time?.slice(0, 5)}</span></p>
                        </div>
                    </div>

                    {/* Symptoms & Diagnosis */}
                    {consultation && (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
                            <div className="rounded-lg border bg-background p-3">
                                <p className="font-semibold text-primary text-[11px] uppercase tracking-wide mb-1">Symptoms Reported</p>
                                <p className="text-foreground">{consultation.symptoms || 'None specified'}</p>
                            </div>
                            <div className="rounded-lg border bg-background p-3">
                                <p className="font-semibold text-purple-600 text-[11px] uppercase tracking-wide mb-1">Diagnosis</p>
                                <p className="text-foreground">{consultation.diagnosis || 'None specified'}</p>
                            </div>
                        </div>
                    )}

                    {/* Doctor's Notes */}
                    {consultation?.notes && (
                        <div className="rounded-lg border bg-amber-500/5 p-3 text-xs">
                            <p className="font-semibold text-amber-700 dark:text-amber-400 text-[11px] uppercase tracking-wide mb-1">Doctor's Clinical Notes</p>
                            <p className="text-foreground italic">{consultation.notes}</p>
                        </div>
                    )}

                    {/* Prescribed Medicines Table */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Pill className="size-4 text-primary" />
                            <h3 className="font-semibold text-sm">Prescribed Medicines</h3>
                        </div>

                        {prescription && prescription.items && prescription.items.length > 0 ? (
                            <div className="rounded-lg border overflow-x-auto">
                                <table className="w-full text-xs min-w-[480px] sm:min-w-full">
                                    <thead className="bg-muted/80">
                                        <tr>
                                            <th className="py-2.5 px-3 text-left font-semibold text-foreground">#</th>
                                            <th className="py-2.5 px-3 text-left font-semibold text-foreground">Medicine Name</th>
                                            <th className="py-2.5 px-3 text-left font-semibold text-foreground">Dosage</th>
                                            <th className="py-2.5 px-3 text-left font-semibold text-foreground">Frequency</th>
                                            <th className="py-2.5 px-3 text-left font-semibold text-foreground">Duration</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y bg-background">
                                        {prescription.items.map((item, index) => (
                                            <tr key={item.id || index}>
                                                <td className="py-2.5 px-3 text-muted-foreground">{index + 1}</td>
                                                <td className="py-2.5 px-3 font-semibold text-foreground">{item.medicine_name}</td>
                                                <td className="py-2.5 px-3 text-muted-foreground">{item.dosage}</td>
                                                <td className="py-2.5 px-3 text-muted-foreground">{item.frequency}</td>
                                                <td className="py-2.5 px-3 text-muted-foreground">{item.duration}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="rounded-lg border border-dashed p-4 text-center text-xs text-muted-foreground">
                                No medicines prescribed for this visit.
                            </div>
                        )}

                        {prescription?.instructions && (
                            <div className="mt-3 rounded-lg border bg-blue-500/5 p-3 text-xs">
                                <p className="font-semibold text-blue-600 mb-0.5">Special Instructions:</p>
                                <p className="text-foreground">{prescription.instructions}</p>
                            </div>
                        )}
                    </div>

                    {/* Footer / Doctor Signature Block */}
                    <div className="pt-6 border-t flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end text-xs">
                        <div className="text-muted-foreground text-[10px]">
                            <p>MediFlow Healthcare System — Automated Electronic Medical Record</p>
                            <p>Printed on: {new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="text-center w-full sm:w-48 space-y-1">
                            <div className="border-b border-foreground/40 pb-1 mb-1">
                                <p className="font-serif italic text-sm">{doctorName}</p>
                            </div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Authorized Doctor Signature</p>
                        </div>
                    </div>
                </div>

                <DialogFooter className="no-print gap-2 sm:gap-0">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Close
                    </Button>
                    <Button onClick={handlePrint} className="gap-2">
                        <Printer className="size-4" />
                        Print Prescription
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
