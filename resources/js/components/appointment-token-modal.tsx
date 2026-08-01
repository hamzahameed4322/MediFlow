import { useState } from 'react';
import { Download, Ticket, Stethoscope, User, Calendar, Clock, CheckCircle, MapPin } from 'lucide-react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
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

// React-PDF Stylesheet for Token Pass
const tokenPdfStyles = StyleSheet.create({
    page: { padding: 30, fontFamily: 'Helvetica', fontSize: 9, color: '#0f172a', backgroundColor: '#ffffff' },
    card: { border: 2, borderColor: '#0d9488', borderRadius: 12, padding: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', paddingBottom: 10, marginBottom: 15 },
    clinicTitle: { fontSize: 18, fontWeight: 'bold', color: '#0d9488' },
    clinicSub: { fontSize: 8, color: '#64748b', marginTop: 2 },
    badge: { backgroundColor: '#ccfbf1', color: '#0f766e', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8, fontSize: 8, fontWeight: 'bold' },
    tokenBox: { textAlign: 'center', backgroundColor: '#f0fdf4', borderWidth: 1, borderColor: '#bbf7d0', borderRadius: 10, padding: 14, marginBottom: 15, alignItems: 'center' },
    tokenLabel: { fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', color: '#15803d', letterSpacing: 1 },
    tokenNum: { fontSize: 30, fontWeight: 'bold', color: '#166534', fontFamily: 'Courier', marginVertical: 4 },
    tokenStatus: { fontSize: 9, color: '#15803d', fontWeight: 'bold' },
    grid: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, padding: 12, marginBottom: 12 },
    column: { width: '48%' },
    columnRight: { width: '48%', textAlign: 'right' },
    label: { textTransform: 'uppercase', fontSize: 7, fontWeight: 'bold', color: '#94a3b8', marginBottom: 3 },
    valMain: { fontSize: 12, fontWeight: 'bold', color: '#0f172a', marginBottom: 2 },
    valSub: { fontSize: 9, color: '#475569', marginTop: 1 },
    scheduleGrid: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, padding: 12, marginBottom: 15 },
    notice: { backgroundColor: '#eff6ff', borderWidth: 1, borderColor: '#dbeafe', borderRadius: 8, padding: 10, marginBottom: 15 },
    noticeText: { fontSize: 9, color: '#1e40af' },
    footer: { borderTopWidth: 1, borderTopColor: '#e2e8f0', paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    footerText: { fontSize: 8, color: '#94a3b8' },
    stubText: { fontFamily: 'Courier', fontSize: 12, fontWeight: 'bold', color: '#334155', letterSpacing: 2 },
});

// React PDF Document Component for Token Pass
function TokenPdfDocument({
    appointment,
    patient,
    doctorName,
    tokenNumber,
    formatTime,
}: {
    appointment: Appointment;
    patient?: PatientInfo | null;
    doctorName: string;
    tokenNumber: string;
    formatTime: (t: string) => string;
}) {
    const doctor = appointment.doctor;

    return (
        <Document title={`Token_Pass_${tokenNumber}`}>
            <Page size="A4" style={tokenPdfStyles.page}>
                <View style={tokenPdfStyles.card}>
                    {/* Header */}
                    <View style={tokenPdfStyles.header}>
                        <View>
                            <Text style={tokenPdfStyles.clinicTitle}>MediFlow Clinic</Text>
                            <Text style={tokenPdfStyles.clinicSub}>Patient Waiting Lounge & Consultation Entry Pass</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={tokenPdfStyles.badge}>CONFIRMED TOKEN</Text>
                        </View>
                    </View>

                    {/* Token Number Box */}
                    <View style={tokenPdfStyles.tokenBox}>
                        <Text style={tokenPdfStyles.tokenLabel}>Waiting Room Queue Token</Text>
                        <Text style={tokenPdfStyles.tokenNum}>#{tokenNumber}</Text>
                        <Text style={tokenPdfStyles.tokenStatus}>✓ Entry Authorized for Consultation</Text>
                    </View>

                    {/* Patient & Doctor Grid */}
                    <View style={tokenPdfStyles.grid}>
                        <View style={tokenPdfStyles.column}>
                            <Text style={tokenPdfStyles.label}>Patient Information</Text>
                            <Text style={tokenPdfStyles.valMain}>{patient?.name || 'Patient'}</Text>
                            {patient?.phone && <Text style={tokenPdfStyles.valSub}>Phone: {patient.phone}</Text>}
                            {patient?.gender && <Text style={tokenPdfStyles.valSub}>Gender: {patient.gender}</Text>}
                        </View>
                        <View style={tokenPdfStyles.columnRight}>
                            <Text style={tokenPdfStyles.label}>Consultant Doctor</Text>
                            <Text style={tokenPdfStyles.valMain}>{doctorName}</Text>
                            {doctor?.specialization && <Text style={tokenPdfStyles.valSub}>Dept: {doctor.specialization}</Text>}
                            {doctor?.consultation_fee && <Text style={tokenPdfStyles.valSub}>Fee: ${Number(doctor.consultation_fee).toFixed(2)}</Text>}
                        </View>
                    </View>

                    {/* Scheduled Visit */}
                    <View style={tokenPdfStyles.scheduleGrid}>
                        <View style={tokenPdfStyles.column}>
                            <Text style={tokenPdfStyles.label}>Appointment Date</Text>
                            <Text style={tokenPdfStyles.valMain}>{appointment.appointment_date}</Text>
                        </View>
                        <View style={tokenPdfStyles.columnRight}>
                            <Text style={tokenPdfStyles.label}>Scheduled Time Slot</Text>
                            <Text style={[tokenPdfStyles.valMain, { color: '#0d9488' }]}>{formatTime(appointment.appointment_time)}</Text>
                        </View>
                    </View>

                    {/* Notice */}
                    <View style={tokenPdfStyles.notice}>
                        <Text style={tokenPdfStyles.noticeText}>
                            <Text style={{ fontWeight: 'bold' }}>Notice for Patient: </Text>
                            Please arrive 10 minutes prior to your time slot and show this Token Entry Pass to the reception desk.
                        </Text>
                    </View>

                    {/* Footer */}
                    <View style={tokenPdfStyles.footer}>
                        <View>
                            <Text style={tokenPdfStyles.footerText}>MediFlow Electronic Health Systems</Text>
                            <Text style={[tokenPdfStyles.footerText, { marginTop: 2 }]}>Generated: {new Date().toLocaleString()}</Text>
                        </View>
                        <Text style={tokenPdfStyles.stubText}>|||| ||| ||||| || |||</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}

export function AppointmentTokenModal({
    open,
    onOpenChange,
    appointment,
    patient,
}: Props) {
    const [isGenerating, setIsGenerating] = useState(false);

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

    // Direct PDF Blob Download powered by @react-pdf/renderer (Ultra fast vector PDF)
    const handleDownloadPdf = async () => {
        try {
            setIsGenerating(true);
            const doc = (
                <TokenPdfDocument
                    appointment={appointment}
                    patient={patient}
                    doctorName={doctorName}
                    tokenNumber={tokenNumber}
                    formatTime={formatTime}
                />
            );
            const blob = await pdf(doc).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Entry_Token_${tokenNumber}.pdf`;
            link.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Failed to generate Token PDF:', err);
        } finally {
            setIsGenerating(false);
        }
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

                {/* Modal Preview Container */}
                <div className="space-y-5 rounded-2xl border-2 border-dashed border-primary/40 bg-card p-5 sm:p-6 lg:p-7 shadow-xs text-card-foreground">
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
                    <div className="flex items-start gap-3 rounded-xl bg-sky-500/5 border border-sky-500/15 p-3 text-xs text-sky-800 dark:text-sky-300">
                        <MapPin className="size-4 shrink-0 mt-0.5 text-sky-600" />
                        <p className="text-xs leading-relaxed">
                            Please show this token slip to the clinic reception desk upon arrival 10 minutes prior to your time slot to enter the waiting lounge.
                        </p>
                    </div>
                </div>

                <DialogFooter className="no-print flex-col gap-2 sm:flex-row sm:justify-end sm:gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
                        Close
                    </Button>
                    <Button
                        disabled={isGenerating}
                        onClick={handleDownloadPdf}
                        className="w-full sm:w-auto gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold min-w-[160px]"
                    >
                        {isGenerating ? (
                            <>
                                <Spinner className="size-4 text-white" />
                                <span>Generating PDF...</span>
                            </>
                        ) : (
                            <>
                                <Download className="size-4" />
                                <span>Download PDF</span>
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
