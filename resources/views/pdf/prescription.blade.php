<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Prescription_{{ $patientName }}_{{ $appointment->appointment_date }}</title>
    <style>
        @page {
            margin: 15px;
        }
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #0f172a;
            font-size: 11px;
            line-height: 1.4;
            margin: 0;
            padding: 10px;
        }
        .header-table {
            width: 100%;
            border-bottom: 2px solid #0d9488;
            padding-bottom: 10px;
            margin-bottom: 15px;
        }
        .clinic-title {
            font-size: 22px;
            font-weight: bold;
            color: #0d9488;
            margin: 0;
        }
        .clinic-sub {
            font-size: 9px;
            color: #64748b;
            margin-top: 2px;
        }
        .badge {
            background-color: #ccfbf1;
            color: #0f766e;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 9px;
            font-weight: bold;
            display: inline-block;
        }
        .info-table {
            width: 100%;
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 10px;
            margin-bottom: 15px;
        }
        .info-label {
            font-size: 8px;
            font-weight: bold;
            color: #94a3b8;
            text-transform: uppercase;
            margin-bottom: 3px;
        }
        .info-val-title {
            font-size: 13px;
            font-weight: bold;
            color: #0f172a;
        }
        .info-val-sub {
            font-size: 9px;
            color: #475569;
        }
        .box-table {
            width: 100%;
            margin-bottom: 15px;
        }
        .symptoms-box {
            background-color: #f0fdf4;
            border: 1px solid #ccfbf1;
            border-radius: 6px;
            padding: 8px 10px;
            width: 48%;
        }
        .diagnosis-box {
            background-color: #faf5ff;
            border: 1px solid #f3e8ff;
            border-radius: 6px;
            padding: 8px 10px;
            width: 48%;
        }
        .box-title {
            font-size: 8px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 3px;
        }
        .notes-box {
            background-color: #fffbeb;
            border: 1px solid #fef3c7;
            border-radius: 6px;
            padding: 8px 10px;
            margin-bottom: 15px;
        }
        .rx-title {
            font-size: 12px;
            font-weight: bold;
            color: #0f172a;
            margin-bottom: 6px;
        }
        .med-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }
        .med-table th {
            background-color: #f1f5f9;
            color: #334155;
            font-size: 9px;
            font-weight: bold;
            text-align: left;
            padding: 6px 8px;
            border-bottom: 1px solid #cbd5e1;
        }
        .med-table td {
            font-size: 9.5px;
            color: #0f172a;
            padding: 6px 8px;
            border-bottom: 1px solid #f1f5f9;
        }
        .instructions-box {
            background-color: #eff6ff;
            border: 1px solid #dbeafe;
            border-radius: 6px;
            padding: 8px 10px;
            margin-bottom: 20px;
            font-size: 9px;
            color: #1e40af;
        }
        .footer-table {
            width: 100%;
            border-top: 1px solid #e2e8f0;
            padding-top: 15px;
            margin-top: 30px;
        }
        .sig-line {
            border-bottom: 1px solid #0f172a;
            font-weight: bold;
            text-align: center;
            font-size: 11px;
            padding-bottom: 2px;
            margin-bottom: 3px;
        }
        .text-right {
            text-align: right;
        }
    </style>
</head>
<body>

    <!-- Header Banner -->
    <table class="header-table">
        <tr>
            <td style="width: 60%;">
                <div class="clinic-title">MediFlow Clinic</div>
                <div class="clinic-sub">Healthcare & Consultation Management System</div>
            </td>
            <td class="text-right" style="width: 40%;">
                <div class="badge">OFFICIAL MEDICAL PRESCRIPTION</div>
                <div style="font-size: 9px; color: #64748b; margin-top: 4px;">Date: {{ $appointment->appointment_date }}</div>
            </td>
        </tr>
    </table>

    <!-- Patient & Doctor Information -->
    <table class="info-table">
        <tr>
            <td style="width: 50%; vertical-align: top;">
                <div class="info-label">PATIENT INFORMATION</div>
                <div class="info-val-title">{{ $patientName }}</div>
                @if(!empty($patient['gender']))
                    <div class="info-val-sub">Gender: {{ ucfirst($patient['gender']) }}</div>
                @endif
                @if(!empty($patient['phone']))
                    <div class="info-val-sub">Phone: {{ $patient['phone'] }}</div>
                @endif
                @if(!empty($patient['dob']))
                    <div class="info-val-sub">DOB: {{ $patient['dob'] }}</div>
                @endif
            </td>
            <td class="text-right" style="width: 50%; vertical-align: top;">
                <div class="info-label">CONSULTANT DOCTOR</div>
                <div class="info-val-title">{{ $doctorName }}</div>
                @if($doctor && $doctor->specialization)
                    <div class="info-val-sub">Dept: {{ $doctor->specialization }}</div>
                @endif
                @if($doctor && $doctor->qualification)
                    <div class="info-val-sub">Qual: {{ $doctor->qualification }}</div>
                @endif
                <div class="info-val-sub">Visit Time: {{ substr($appointment->appointment_time, 0, 5) }}</div>
            </td>
        </tr>
    </table>

    <!-- Symptoms & Diagnosis -->
    @if($consultation)
    <table class="box-table">
        <tr>
            <td class="symptoms-box" style="vertical-align: top;">
                <div class="box-title" style="color: #0d9488;">SYMPTOMS REPORTED</div>
                <div>{{ $consultation->symptoms ?: 'None specified' }}</div>
            </td>
            <td style="width: 4%;"></td>
            <td class="diagnosis-box" style="vertical-align: top;">
                <div class="box-title" style="color: #7e22ce;">DIAGNOSIS</div>
                <div>{{ $consultation->diagnosis ?: 'None specified' }}</div>
            </td>
        </tr>
    </table>
    @endif

    <!-- Doctor Clinical Notes -->
    @if($consultation && $consultation->notes)
    <div class="notes-box">
        <div class="box-title" style="color: #b45309;">DOCTOR'S CLINICAL NOTES</div>
        <div style="font-style: italic; color: #92400e;">{{ $consultation->notes }}</div>
    </div>
    @endif

    <!-- Prescribed Medicines -->
    <div class="rx-title">Rx — Prescribed Medicines</div>
    <table class="med-table">
        <thead>
            <tr>
                <th style="width: 6%;">#</th>
                <th style="width: 38%;">Medicine Name</th>
                <th style="width: 18%;">Dosage</th>
                <th style="width: 20%;">Frequency</th>
                <th style="width: 18%;">Duration</th>
            </tr>
        </thead>
        <tbody>
            @if($prescription && count($prescription->items ?? []) > 0)
                @foreach($prescription->items as $index => $item)
                <tr>
                    <td style="color: #64748b;">{{ $index + 1 }}</td>
                    <td style="font-weight: bold;">{{ $item->medicine_name }}</td>
                    <td>{{ $item->dosage }}</td>
                    <td>{{ $item->frequency }}</td>
                    <td>{{ $item->duration }}</td>
                </tr>
                @endforeach
            @else
                <tr>
                    <td colspan="5" style="text-align: center; color: #64748b; padding: 12px;">
                        No medicines prescribed for this visit.
                    </td>
                </tr>
            @endif
        </tbody>
    </table>

    <!-- Special Instructions -->
    @if($prescription && $prescription->instructions)
    <div class="instructions-box">
        <strong>Special Instructions:</strong> {{ $prescription->instructions }}
    </div>
    @endif

    <!-- Footer Signature Block -->
    <table class="footer-table">
        <tr>
            <td style="width: 60%; vertical-align: bottom; font-size: 8px; color: #94a3b8;">
                <div>MediFlow Healthcare System — Automated Electronic Medical Record</div>
                <div>Generated on: {{ date('Y-m-d H:i:s') }}</div>
            </td>
            <td class="text-right" style="width: 40%; vertical-align: bottom;">
                <div style="width: 140px; margin-left: auto; text-align: center;">
                    <div class="sig-line">{{ $doctorName }}</div>
                    <div style="font-size: 7px; color: #64748b; font-weight: bold; text-transform: uppercase;">AUTHORIZED DOCTOR SIGNATURE</div>
                </div>
            </td>
        </tr>
    </table>

</body>
</html>
