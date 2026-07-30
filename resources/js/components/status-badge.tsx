import { Badge } from '@/components/ui/badge';
import type { AppointmentStatus, BillStatus, CancelledBy } from '@/types';

// ─── Appointment Status ─────────────────────────────────────────────────────

const appointmentConfig: Record<AppointmentStatus, { label: string; className: string }> = {
    pending:   { label: 'Pending',   className: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30 shadow-2xs' },
    confirmed: { label: 'Confirmed', className: 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30 shadow-2xs' },
    completed: { label: 'Completed', className: 'bg-primary text-primary-foreground border-primary shadow-2xs' },
    rejected:  { label: 'Rejected',  className: 'bg-destructive/15 text-destructive border-destructive/30 shadow-2xs' },
    cancelled: { label: 'Cancelled', className: 'bg-slate-500/15 text-slate-700 dark:text-slate-400 border-slate-500/30 shadow-2xs' },
    no_show:   { label: 'No Show',   className: 'bg-destructive/80 text-destructive-foreground border-destructive shadow-2xs' },
};

// ─── Bill Status ────────────────────────────────────────────────────────────

const billConfig: Record<BillStatus, { label: string; className: string }> = {
    unpaid: { label: 'Unpaid', className: 'bg-destructive/15 text-destructive border-destructive/30 shadow-2xs' },
    paid:   { label: 'Paid',   className: 'bg-primary/15 text-primary border-primary/30 shadow-2xs' },
};

// ─── User Status ────────────────────────────────────────────────────────────

const userStatusConfig: Record<string, { label: string; className: string }> = {
    active:    { label: 'Active',    className: 'bg-primary/15 text-primary border-primary/30 shadow-2xs' },
    inactive:  { label: 'Inactive',  className: 'bg-slate-500/15 text-slate-700 dark:text-slate-400 border-slate-500/30 shadow-2xs' },
    suspended: { label: 'Suspended', className: 'bg-destructive/15 text-destructive border-destructive/30 shadow-2xs' },
};

// ─── Components ─────────────────────────────────────────────────────────────

export function AppointmentStatusBadge({ status }: { status: AppointmentStatus }) {
    const config = appointmentConfig[status] ?? { label: status, className: '' };

    return <Badge className={`capitalize border text-xs font-medium ${config.className}`}>{config.label}</Badge>;
}

export function BillStatusBadge({ status }: { status: BillStatus }) {
    const config = billConfig[status] ?? { label: status, className: '' };

    return <Badge className={`capitalize border text-xs font-medium ${config.className}`}>{config.label}</Badge>;
}

export function UserStatusBadge({ status }: { status: string }) {
    const config = userStatusConfig[status] ?? { label: status, className: '' };

    return <Badge className={`capitalize border text-xs font-medium ${config.className}`}>{config.label}</Badge>;
}

// ─── Cancelled By Badge ──────────────────────────────────────────────────────

const cancelledByConfig: Record<CancelledBy, { label: string; className: string }> = {
    patient: { label: 'Cancelled by Patient', className: 'bg-orange-500/15 text-orange-700 border-orange-500/30 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/30 shadow-2xs' },
    doctor:  { label: 'Cancelled by Doctor',  className: 'bg-blue-500/15 text-blue-700 border-blue-500/30 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30 shadow-2xs' },
};

export function CancelledByBadge({ cancelledBy }: { cancelledBy: CancelledBy | null }) {
    if (!cancelledBy) return null;

    const config = cancelledByConfig[cancelledBy];

    return <Badge className={`border text-xs font-medium ${config.className}`}>{config.label}</Badge>;
}
