<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Token_Pass_{{ $tokenNumber }}</title>
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
        .card-container {
            border: 2px dashed #0d9488;
            border-radius: 12px;
            padding: 20px;
            background-color: #ffffff;
        }
        .header-table {
            width: 100%;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 10px;
            margin-bottom: 15px;
        }
        .clinic-title {
            font-size: 20px;
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
            border-radius: 999px;
            font-size: 9px;
            font-weight: bold;
            display: inline-block;
        }
        .token-box {
            text-align: center;
            background-color: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 15px;
        }
        .token-label {
            font-size: 9px;
            font-weight: bold;
            color: #15803d;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .token-number {
            font-size: 36px;
            font-weight: 900;
            color: #166534;
            font-family: monospace;
            margin: 4px 0;
        }
        .token-status {
            font-size: 9.5px;
            color: #15803d;
            font-weight: bold;
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
        .schedule-table {
            width: 100%;
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 10px;
            margin-bottom: 15px;
        }
        .notice-box {
            background-color: #eff6ff;
            border: 1px solid #dbeafe;
            border-radius: 6px;
            padding: 10px;
            font-size: 9px;
            color: #1e40af;
            margin-bottom: 15px;
        }
        .footer-table {
            width: 100%;
            border-top: 1px solid #e2e8f0;
            padding-top: 10px;
            font-size: 8px;
            color: #94a3b8;
        }
        .text-right {
            text-align: right;
        }
    </style>
</head>
<body>

    <div class="card-container">
        <!-- Header -->
        <table class="header-table">
            <tr>
                <td style="width: 65%;">
                    <div class="clinic-title">MediFlow Clinic</div>
                    <div class="clinic-sub">Patient Waiting Lounge & Consultation Entry Pass</div>
                </td>
                <td class="text-right" style="width: 35%;">
                    <div class="badge">CONFIRMED TOKEN</div>
                </td>
            </tr>
        </table>

        <!-- Queue Token Number Card -->
        <div class="token-box">
            <div class="token-label">Waiting Room Queue Token</div>
            <div class="token-number">#{{ $tokenNumber }}</div>
            <div class="token-status">✓ Entry Authorized for Consultation</div>
        </div>

        <!-- Patient & Doctor Details -->
        <table class="info-table">
            <tr>
                <td style="width: 50%; vertical-align: top;">
                    <div class="info-label">PATIENT INFORMATION</div>
                    <div class="info-val-title">{{ $patientName }}</div>
                    @if(!empty($patient['phone']))
                        <div class="info-val-sub">Phone: {{ $patient['phone'] }}</div>
                    @endif
                    @if(!empty($patient['gender']))
                        <div class="info-val-sub">Gender: {{ ucfirst($patient['gender']) }}</div>
                    @endif
                </td>
                <td class="text-right" style="width: 50%; vertical-align: top;">
                    <div class="info-label">CONSULTANT DOCTOR</div>
                    <div class="info-val-title">{{ $doctorName }}</div>
                    @if($doctor && $doctor->specialization)
                        <div class="info-val-sub">Dept: {{ $doctor->specialization }}</div>
                    @endif
                    @if($doctor && $doctor->consultation_fee)
                        <div class="info-val-sub">Fee: ${{ number_format($doctor->consultation_fee, 2) }}</div>
                    @endif
                </td>
            </tr>
        </table>

        <!-- Schedule Visit -->
        <table class="schedule-table">
            <tr>
                <td style="width: 50%;">
                    <div class="info-label">APPOINTMENT DATE</div>
                    <div style="font-size: 13px; font-weight: bold; color: #0f172a;">{{ $appointment->appointment_date }}</div>
                </td>
                <td class="text-right" style="width: 50%;">
                    <div class="info-label">SCHEDULED TIME SLOT</div>
                    <div style="font-size: 13px; font-weight: bold; color: #0d9488;">{{ $formattedTime }}</div>
                </td>
            </tr>
        </table>

        <!-- Notice -->
        <div class="notice-box">
            <strong>Notice for Patient:</strong> Please arrive 10 minutes prior to your time slot and show this Token Entry Pass to the reception desk.
        </div>

        <!-- Footer -->
        <table class="footer-table">
            <tr>
                <td>
                    <div>MediFlow Electronic Health Systems</div>
                    <div>Generated: {{ date('Y-m-d H:i:s') }}</div>
                </td>
                <td class="text-right" style="font-family: monospace; font-size: 13px; font-weight: bold; color: #334155; letter-spacing: 2px;">
                    |||| ||| ||||| || |||
                </td>
            </tr>
        </table>
    </div>

</body>
</html>
