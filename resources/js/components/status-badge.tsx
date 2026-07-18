import { Badge } from '@/components/ui/badge';
import type { AppointmentStatus, BillStatus } from '@/types';

// ─── Appointment Status ─────────────────────────────────────────────────────

const appointmentConfig: Record<AppointmentStatus, { label: string; className: string }> = {
    pending:   { label: 'Pending',   className: 'bg-secondary text-secondary-foreground border-secondary/50' },
    confirmed: { label: 'Confirmed', className: 'bg-primary/15 text-primary border-primary/30' },
    completed: { label: 'Completed', className: 'bg-primary text-primary-foreground border-primary' },
    rejected:  { label: 'Rejected',  className: 'bg-destructive/15 text-destructive border-destructive/30' },
    cancelled: { label: 'Cancelled', className: 'bg-muted text-muted-foreground border-border' },
    no_show:   { label: 'No Show',   className: 'bg-destructive/80 text-destructive-foreground border-destructive' },
};

// ─── Bill Status ────────────────────────────────────────────────────────────

const billConfig: Record<BillStatus, { label: string; className: string }> = {
    unpaid: { label: 'Unpaid', className: 'bg-destructive/15 text-destructive border-destructive/30' },
    paid:   { label: 'Paid',   className: 'bg-primary/15 text-primary border-primary/30' },
};

// ─── User Status ────────────────────────────────────────────────────────────

const userStatusConfig: Record<string, { label: string; className: string }> = {
    active:    { label: 'Active',    className: 'bg-primary/15 text-primary border-primary/30' },
    inactive:  { label: 'Inactive',  className: 'bg-muted text-muted-foreground border-border' },
    suspended: { label: 'Suspended', className: 'bg-destructive/15 text-destructive border-destructive/30' },
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
