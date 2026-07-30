import { Deferred, Head } from '@inertiajs/react';
import { Pagination } from '@/components/pagination';
import { CircleDollarSign, type LucideIcon, Receipt, Search, Wallet, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
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
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (!query.trim() && statusFilter === 'all') {
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        const timer = setTimeout(() => {
            setIsSearching(false);
        }, 250);

        return () => clearTimeout(timer);
    }, [query, statusFilter]);

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

    const hasActiveFilter = statusFilter !== 'all' || query.trim() !== '';

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

                <div className="flex flex-col gap-3">
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

                    {hasActiveFilter && (
                        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                            {statusFilter !== 'all' && (
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-medium text-primary shadow-2xs">
                                    Status: {statusFilter === 'paid' ? 'Paid' : 'Unpaid'}
                                    <button
                                        type="button"
                                        onClick={() => setStatusFilter('all')}
                                        className="ml-0.5 rounded-full p-0.5 hover:bg-primary/20 transition-colors cursor-pointer"
                                        aria-label="Remove status filter"
                                    >
                                        <X className="size-3" />
                                    </button>
                                </span>
                            )}
                            {query.trim() !== '' && (
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-medium text-primary shadow-2xs">
                                    Search: "{query}"
                                    <button
                                        type="button"
                                        onClick={() => setQuery('')}
                                        className="ml-0.5 rounded-full p-0.5 hover:bg-primary/20 transition-colors cursor-pointer"
                                        aria-label="Remove search query"
                                    >
                                        <X className="size-3" />
                                    </button>
                                </span>
                            )}
                            <button
                                type="button"
                                onClick={() => {
                                    setStatusFilter('all');
                                    setQuery('');
                                }}
                                className="ml-1 text-xs font-semibold text-muted-foreground hover:text-destructive transition-colors underline-offset-4 hover:underline cursor-pointer"
                            >
                                Reset all
                            </button>
                        </div>
                    )}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Billing records</CardTitle>
                        <CardDescription>Every appointment bill generated by the consultation workflow.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Deferred data="bills" fallback={<BillsSkeleton />}>
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
                                        {isSearching ? (
                                            <BillsTableSkeleton />
                                        ) : filteredBills.length === 0 ? (
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell colSpan={5} className="py-8 text-center">
                                                        <EmptyState
                                                            icon={Receipt}
                                                            title={query || statusFilter !== 'all' ? "No matching bills" : "No bills yet"}
                                                            description="There are no billing records matching your current filter or search criteria."
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        ) : (
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
                                        )}
                                    </Table>
                                </div>
                                <Pagination links={bills?.meta?.links || []} meta={bills?.meta} />
                            </div>
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

function BillsTableSkeleton() {
    return (
        <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                    <TableCell><Skeleton className="mb-1 h-4 w-32" /><Skeleton className="h-3 w-20" /></TableCell>
                    <TableCell><Skeleton className="mb-1 h-4 w-32" /><Skeleton className="h-3 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

BillsIndex.layout = {
    breadcrumbs: [{ title: 'Bills', href: adminBills.url() }],
};
