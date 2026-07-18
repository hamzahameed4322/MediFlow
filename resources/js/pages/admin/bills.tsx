/**
 * TODO FOR AI AGENT / BACKEND — read before touching this file:
 * `[propName]` currently arrives as the FULL, un-paginated list from the backend
 * (no page/limit params applied). Fine for dev-seeded rows, but WILL fail in
 * production once this table grows — full table scan on every load, huge
 * payload over the wire, and frontend render (map/filter over whole array)
 * gets slower with every new row.
 *
 * Backend needs to apply real pagination (Laravel's paginate()/cursorPaginate())
 * on this endpoint, and this UI needs to consume page/per_page + a pager control
 * (shadcn Pagination) instead of assuming `[propName]` is the complete dataset.
 * Don't ship this to production as-is.
 */
import { Deferred, Head } from '@inertiajs/react';
import { Pagination } from '@/components/pagination';
import { CircleDollarSign, type LucideIcon, Receipt, Search, Wallet } from 'lucide-react';
import { useMemo, useState } from 'react';
import { EmptyState } from '@/components/empty-state';
import { BillStatusBadge } from '@/components/status-badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { bills as adminBills } from '@/routes/admin';
import type { Bill } from '@/types';

type Props = {
    bills: {
        data: Bill[];
        links: any;
        meta: any;
    };
};

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
    }).format(value);
}

export default function BillsIndex({ bills }: Props) {
    const billData = bills?.data ?? [];
    const [query, setQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'unpaid'>('all');

    const filteredBills = useMemo(() => {
        return billData.filter((bill) => {
            const matchesStatus = statusFilter === 'all' || bill.status === statusFilter;
            const searchableText = [
                bill.appointment?.patient?.user?.name,
                bill.appointment?.doctor?.user?.name,
                bill.appointment?.appointment_date,
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();

            return matchesStatus && searchableText.includes(query.toLowerCase());
        });
    }, [billData, query, statusFilter]);

    const paid = billData
        .filter((bill) => bill.status === 'paid')
        .reduce((sum, bill) => sum + Number(bill.amount), 0);
    const unpaid = billData
        .filter((bill) => bill.status === 'unpaid')
        .reduce((sum, bill) => sum + Number(bill.amount), 0);

    return (
        <>
            <Head title="Bills" />

            <div className="flex flex-col gap-6 p-6">
                <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-sm">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary">
                        <Wallet className="size-3.5" />
                        Billing control
                    </div>
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                        Billing ledger
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                        Monitor collected revenue and unpaid physical-settlement bills for the
                        clinic.
                    </p>
                </section>

                <section className="grid gap-4 sm:grid-cols-2">
                    <BillMetric label="Paid revenue" value={formatCurrency(paid)} icon={CircleDollarSign} tone="emerald" />
                    <BillMetric label="Outstanding" value={formatCurrency(unpaid)} icon={Receipt} tone="rose" />
                </section>

                <div className="grid gap-3 md:grid-cols-[1fr_220px]">
                    <div className="relative rounded-2xl border border-border bg-background">
                        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search patient, doctor, date..."
                            className="border-0 pl-9 shadow-none focus-visible:ring-0"
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as typeof statusFilter)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All statuses</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="unpaid">Unpaid</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Billing records</CardTitle>
                        <CardDescription>Every appointment bill generated by the consultation workflow.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Deferred data="bills" fallback={<BillsSkeleton />}>
                            {filteredBills.length === 0 ? (
                                <EmptyState
                                    icon={Receipt}
                                    title="No bills yet"
                                    description="Bills will be generated automatically after consultations."
                                />
                            ) : (
                                <div>
                                    <div className="overflow-x-auto rounded-xl border border-border">
                                        <Table className="min-w-[800px] table-fixed">
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[24%]">Patient</TableHead>
                                                    <TableHead className="w-[24%]">Doctor</TableHead>
                                                    <TableHead className="w-[18%]">Visit date</TableHead>
                                                    <TableHead className="w-[18%]">Amount</TableHead>
                                                    <TableHead className="w-[17%]">Status</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredBills.map((bill) => (
                                                    <TableRow key={bill.id}>
                                                        <TableCell className="truncate font-medium">
                                                            {bill.appointment?.patient?.user?.name}
                                                        </TableCell>
                                                        <TableCell className="truncate text-muted-foreground">
                                                            {bill.appointment?.doctor?.user?.name}
                                                        </TableCell>
                                                        <TableCell className="text-muted-foreground">
                                                            {bill.appointment?.appointment_date}
                                                        </TableCell>
                                                        <TableCell className="font-semibold">
                                                            {formatCurrency(Number(bill.amount))}
                                                        </TableCell>
                                                        <TableCell>
                                                            <BillStatusBadge status={bill.status} />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <Pagination links={bills?.meta?.links || []} meta={bills?.meta} />
                                </div>
                            )}
                        </Deferred>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

const BILL_TONE_CLASSES: Record<'emerald' | 'rose', string> = {
    emerald: 'bg-primary/10 text-primary',
    rose: 'bg-destructive/10 text-destructive',
};

function BillMetric({
                        label,
                        value,
                        icon: Icon,
                        tone,
                    }: {
    label: string;
    value: string;
    icon: LucideIcon;
    tone: 'emerald' | 'rose';
}) {
    return (
        <Card>
            <CardContent className="flex items-center gap-4 p-5">
                <div className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${BILL_TONE_CLASSES[tone]}`}>
                    <Icon className="size-6" />
                </div>
                <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">{label}</p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
                </div>
            </CardContent>
        </Card>
    );
}

function BillsSkeleton() {
    return (
        <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-16 w-full rounded-2xl" />
            ))}
        </div>
    );
}

BillsIndex.layout = {
    breadcrumbs: [{ title: 'Bills', href: adminBills.url() }],
};
