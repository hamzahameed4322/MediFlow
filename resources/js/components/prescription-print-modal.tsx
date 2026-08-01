import { useState } from 'react';
import { Download, Stethoscope, Pill, FileText } from 'lucide-react';
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

// React-PDF Stylesheet
const pdfStyles = StyleSheet.create({
    page: { padding: 30, fontFamily: 'Helvetica', fontSize: 9, color: '#0f172a', backgroundColor: '#ffffff' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#0d9488', paddingBottom: 10, marginBottom: 15 },
    clinicTitle: { fontSize: 20, fontWeight: 'bold', color: '#0d9488' },
    clinicSub: { fontSize: 8, color: '#64748b', marginTop: 2 },
    badge: { backgroundColor: '#ccfbf1', color: '#0f766e', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8, fontSize: 9, fontWeight: 'bold' },
    dateText: { fontSize: 8, color: '#64748b', marginTop: 3 },
    grid: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 6, padding: 12, marginBottom: 12 },
    column: { width: '48%' },
    columnRight: { width: '48%', textAlign: 'right' },
    label: { textTransform: 'uppercase', fontSize: 7, fontWeight: 'bold', color: '#94a3b8', marginBottom: 3 },
    valMain: { fontSize: 13, fontWeight: 'bold', color: '#0f172a', marginBottom: 2 },
    valSub: { fontSize: 9, color: '#475569', marginTop: 1 },
    boxGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    symptomsBox: { width: '48%', borderWidth: 1, borderColor: '#ccfbf1', backgroundColor: '#f0fdf4', borderRadius: 6, padding: 10 },
    diagnosisBox: { width: '48%', borderWidth: 1, borderColor: '#f3e8ff', backgroundColor: '#faf5ff', borderRadius: 6, padding: 10 },
    boxTitle: { fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 3 },
    symptomsTitle: { color: '#0d9488' },
    diagnosisTitle: { color: '#7e22ce' },
    notesBox: { borderWidth: 1, borderColor: '#fef3c7', backgroundColor: '#fffbeb', borderRadius: 6, padding: 10, marginBottom: 12 },
    notesTitle: { fontSize: 8, fontWeight: 'bold', color: '#b45309', textTransform: 'uppercase', marginBottom: 2 },
    notesText: { fontSize: 9, color: '#92400e', fontStyle: 'italic' },
    sectionHeading: { fontSize: 11, fontWeight: 'bold', color: '#0f172a', marginBottom: 6 },
    table: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 6, marginBottom: 12 },
    tableHeader: { flexDirection: 'row', backgroundColor: '#f1f5f9', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', paddingVertical: 6, paddingHorizontal: 8 },
    tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingVertical: 6, paddingHorizontal: 8 },
    th: { fontWeight: 'bold', color: '#334155', fontSize: 8 },
    td: { color: '#0f172a', fontSize: 9 },
    col1: { width: '7%' },
    col2: { width: '38%' },
    col3: { width: '18%' },
    col4: { width: '20%' },
    col5: { width: '17%' },
    instructions: { backgroundColor: '#eff6ff', borderWidth: 1, borderColor: '#dbeafe', borderRadius: 6, padding: 10, marginBottom: 15 },
    footer: { marginTop: 20, borderTopWidth: 1, borderTopColor: '#e2e8f0', paddingTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
    footerLeft: { color: '#94a3b8', fontSize: 8 },
    sigBox: { width: 140, alignItems: 'center' },
    sigLine: { borderBottomWidth: 1, borderBottomColor: '#0f172a', paddingBottom: 2, marginBottom: 2, fontSize: 11, fontWeight: 'bold', textAlign: 'center', width: '100%' },
    sigTitle: { fontSize: 7, color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold' },
});

// React PDF Document Component
function PrescriptionPdfDocument({
    appointment,
    patient,
    doctorName,
}: {
    appointment: Appointment;
    patient?: PatientInfo | null;
    doctorName: string;
}) {
    const consultation = appointment.consultation;
    const prescription = consultation?.prescription;
    const doctor = appointment.doctor;

    return (
        <Document title={`Prescription_${patient?.name || 'Patient'}_${appointment.appointment_date}`}>
            <Page size="A4" style={pdfStyles.page}>
                {/* Header */}
                <View style={pdfStyles.header}>
                    <View>
                        <Text style={pdfStyles.clinicTitle}>MediFlow Clinic</Text>
                        <Text style={pdfStyles.clinicSub}>Healthcare & Consultation Management</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={pdfStyles.badge}>Official Medical Prescription</Text>
                        <Text style={pdfStyles.dateText}>Date: {appointment.appointment_date}</Text>
                    </View>
                </View>

                {/* Patient & Doctor Grid */}
                <View style={pdfStyles.grid}>
                    <View style={pdfStyles.column}>
                        <Text style={pdfStyles.label}>Patient Information</Text>
                        <Text style={pdfStyles.valMain}>{patient?.name || 'Patient'}</Text>
                        {patient?.gender && <Text style={pdfStyles.valSub}>Gender: {patient.gender}</Text>}
                        {patient?.phone && <Text style={pdfStyles.valSub}>Phone: {patient.phone}</Text>}
                        {patient?.dob && <Text style={pdfStyles.valSub}>DOB: {patient.dob}</Text>}
                    </View>
                    <View style={pdfStyles.columnRight}>
                        <Text style={pdfStyles.label}>Consultant Doctor</Text>
                        <Text style={pdfStyles.valMain}>{doctorName}</Text>
                        {doctor?.specialization && <Text style={pdfStyles.valSub}>Dept: {doctor.specialization}</Text>}
                        {doctor?.qualification && <Text style={pdfStyles.valSub}>Qual: {doctor.qualification}</Text>}
                        <Text style={pdfStyles.valSub}>Visit Time: {appointment.appointment_time?.slice(0, 5)}</Text>
                    </View>
                </View>

                {/* Symptoms & Diagnosis */}
                {consultation && (
                    <View style={pdfStyles.boxGrid}>
                        <View style={pdfStyles.symptomsBox}>
                            <Text style={[pdfStyles.boxTitle, pdfStyles.symptomsTitle]}>Symptoms Reported</Text>
                            <Text style={{ fontSize: 9 }}>{consultation.symptoms || 'None specified'}</Text>
                        </View>
                        <View style={pdfStyles.diagnosisBox}>
                            <Text style={[pdfStyles.boxTitle, pdfStyles.diagnosisTitle]}>Diagnosis</Text>
                            <Text style={{ fontSize: 9 }}>{consultation.diagnosis || 'None specified'}</Text>
                        </View>
                    </View>
                )}

                {/* Clinical Notes */}
                {consultation?.notes && (
                    <View style={pdfStyles.notesBox}>
                        <Text style={pdfStyles.notesTitle}>Doctor's Clinical Notes</Text>
                        <Text style={pdfStyles.notesText}>{consultation.notes}</Text>
                    </View>
                )}

                {/* Medicines Table */}
                <Text style={pdfStyles.sectionHeading}>Rx — Prescribed Medicines</Text>
                <View style={pdfStyles.table}>
                    <View style={pdfStyles.tableHeader}>
                        <Text style={[pdfStyles.th, pdfStyles.col1]}>#</Text>
                        <Text style={[pdfStyles.th, pdfStyles.col2]}>Medicine Name</Text>
                        <Text style={[pdfStyles.th, pdfStyles.col3]}>Dosage</Text>
                        <Text style={[pdfStyles.th, pdfStyles.col4]}>Frequency</Text>
                        <Text style={[pdfStyles.th, pdfStyles.col5]}>Duration</Text>
                    </View>
                    {prescription?.items && prescription.items.length > 0 ? (
                        prescription.items.map((item, idx) => (
                            <View key={item.id || idx} style={pdfStyles.tableRow}>
                                <Text style={[pdfStyles.td, pdfStyles.col1, { color: '#64748b' }]}>{idx + 1}</Text>
                                <Text style={[pdfStyles.td, pdfStyles.col2, { fontWeight: 'bold' }]}>{item.medicine_name}</Text>
                                <Text style={[pdfStyles.td, pdfStyles.col3]}>{item.dosage}</Text>
                                <Text style={[pdfStyles.td, pdfStyles.col4]}>{item.frequency}</Text>
                                <Text style={[pdfStyles.td, pdfStyles.col5]}>{item.duration}</Text>
                            </View>
                        ))
                    ) : (
                        <View style={{ padding: 10, alignItems: 'center' }}>
                            <Text style={{ fontSize: 9, color: '#64748b' }}>No medicines prescribed for this visit.</Text>
                        </View>
                    )}
                </View>

                {/* Instructions */}
                {prescription?.instructions && (
                    <View style={pdfStyles.instructions}>
                        <Text style={{ fontSize: 9, color: '#1e40af' }}>
                            <Text style={{ fontWeight: 'bold' }}>Special Instructions: </Text>
                            {prescription.instructions}
                        </Text>
                    </View>
                )}

                {/* Footer */}
                <View style={pdfStyles.footer}>
                    <View style={pdfStyles.footerLeft}>
                        <Text>MediFlow Healthcare System — Automated Electronic Medical Record</Text>
                        <Text style={{ marginTop: 2 }}>Generated on: {new Date().toLocaleDateString()}</Text>
                    </View>
                    <View style={pdfStyles.sigBox}>
                        <Text style={pdfStyles.sigLine}>{doctorName}</Text>
                        <Text style={pdfStyles.sigTitle}>Authorized Doctor Signature</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}

export function PrescriptionPrintModal({
    open,
    onOpenChange,
    appointment,
    patient,
}: Props) {
    const [isGenerating, setIsGenerating] = useState(false);

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

    // Direct PDF Blob Download powered by @react-pdf/renderer (Ultra fast vector PDF)
    const handleDownloadPdf = async () => {
        try {
            setIsGenerating(true);
            const doc = <PrescriptionPdfDocument appointment={appointment} patient={patient} doctorName={doctorName} />;
            const blob = await pdf(doc).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Prescription_${patient?.name ? patient.name.replace(/\s+/g, '_') : 'Patient'}_${appointment.appointment_date}.pdf`;
            link.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Failed to generate PDF:', err);
        } finally {
            setIsGenerating(false);
        }
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
                        Save as PDF directly to your device downloads folder.
                    </DialogDescription>
                </DialogHeader>

                {/* Modal Preview Container */}
                <div className="space-y-6 rounded-xl border bg-card p-4 sm:p-8 text-card-foreground shadow-xs">
                    {/* Header Banner */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
                        <div className="flex items-center gap-3">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
                                <Stethoscope className="size-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black tracking-tight text-primary">MediFlow Clinic</h2>
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
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-lg bg-muted/40 p-4 text-xs border border-border">
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
                            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                                <p className="font-bold text-primary text-[11px] uppercase tracking-wide mb-1">Symptoms Reported</p>
                                <p className="text-foreground">{consultation.symptoms || 'None specified'}</p>
                            </div>
                            <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-3">
                                <p className="font-bold text-purple-600 dark:text-purple-400 text-[11px] uppercase tracking-wide mb-1">Diagnosis</p>
                                <p className="text-foreground">{consultation.diagnosis || 'None specified'}</p>
                            </div>
                        </div>
                    )}

                    {/* Doctor's Notes */}
                    {consultation?.notes && (
                        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-xs">
                            <p className="font-bold text-amber-700 dark:text-amber-400 text-[11px] uppercase tracking-wide mb-1">Doctor's Clinical Notes</p>
                            <p className="text-foreground italic">{consultation.notes}</p>
                        </div>
                    )}

                    {/* Prescribed Medicines Table */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Pill className="size-4 text-primary" />
                            <h3 className="font-bold text-sm text-foreground">Rx — Prescribed Medicines</h3>
                        </div>

                        {prescription && prescription.items && prescription.items.length > 0 ? (
                            <div className="rounded-lg border overflow-x-auto">
                                <table className="w-full text-xs min-w-[500px]">
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
                            <div className="rounded-lg border border-dashed p-4 text-center text-xs text-muted-foreground">
                                No medicines prescribed for this visit.
                            </div>
                        )}

                        {prescription?.instructions && (
                            <div className="mt-3 rounded-lg border border-blue-500/20 bg-blue-500/5 p-3 text-xs">
                                <p className="font-bold text-blue-600 dark:text-blue-400 mb-0.5">Special Instructions:</p>
                                <p className="text-foreground">{prescription.instructions}</p>
                            </div>
                        )}
                    </div>

                    {/* Footer / Doctor Signature Block */}
                    <div className="pt-6 border-t flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end text-xs">
                        <div className="text-muted-foreground text-[10px]">
                            <p>MediFlow Healthcare System — Automated Electronic Medical Record</p>
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
