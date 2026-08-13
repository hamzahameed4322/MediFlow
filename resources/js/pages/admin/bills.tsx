import { Deferred, Head, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pagination } from '@/components/pagination';
import { ArrowDown, ArrowUp, ArrowUpDown, CheckCircle2, CircleDollarSign, Eye, type LucideIcon, Receipt, RotateCw, Search, Wallet, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { EmptyState } from '@/components/empty-state';
import { BillStatusBadge } from '@/components/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
import { dashboard as adminDashboard, bills as adminBills } from '@/routes/admin';
import type { Bill } from '@/types';

type Props = {
    filters?: {
        search?: string;
        status?: string;
        sort_by?: string;
        sort_order?: string;
    };
    stats?: {
        totalRevenue: number;
        paidRevenue: number;
        unpaidRevenue: number;
        paidCount: number;
        unpaidCount: number;
    };
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

export default function BillsIndex({ bills, filters, stats }: Props) {
    const billData = bills?.data ?? [];
    const [query, setQuery] = useState(filters?.search ?? '');
    const [statusFilter, setStatusFilter] = useState<string>(filters?.status ?? 'all');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>((filters?.sort_order as any) ?? 'desc');
    const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    const triggerSearch = (searchVal: string, statusVal: string, orderVal: string) => {
        setIsSearching(true);
        router.get(
            adminBills.url(),
            {
                search: searchVal || undefined,
                status: statusVal !== 'all' ? statusVal : undefined,
                sort_order: orderVal !== 'desc' ? orderVal : undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onFinish: () => setIsSearching(false),
            }
        );
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (
                query !== (filters?.search ?? '') ||
                statusFilter !== (filters?.status ?? 'all') ||
                sortOrder !== (filters?.sort_order ?? 'desc')
            ) {
                triggerSearch(query, statusFilter, sortOrder);
            }
        }, 400);
        return () => clearTimeout(timer);
    }, [query, statusFilter, sortOrder]);

    const toggleIdSort = () => {
        const nextOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(nextOrder);
        triggerSearch(query, statusFilter, nextOrder);
    };

    const handleStatusFilterChange = (val: string) => {
        setStatusFilter(val);
        triggerSearch(query, val, sortOrder);
    };

    const totalPaid = stats?.paidRevenue ?? billData.filter((b) => b.status === 'paid').reduce((s, b) => s + Number(b.amount), 0);
    const totalUnpaid = stats?.unpaidRevenue ?? billData.filter((b) => b.status === 'unpaid').reduce((s, b) => s + Number(b.amount), 0);

    return (
        <>
            <Head title="Bills & Financial Ledger" />

            <div className="flex flex-col gap-6 p-6">
                <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-sm">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary">
                        <Wallet className="size-3.5" />
                        Billing control
                    </div>
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                        Billing ledger & Receipts
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                        Monitor collected revenue, settlement receipts, and unpaid consultation bills for the clinic.
                    </p>
                </section>

                <section className="grid gap-4 sm:grid-cols-2">
                    <BillMetric label="Paid revenue" value={formatCurrency(totalPaid)} icon={CircleDollarSign} tone="emerald" />
                    <BillMetric label="Outstanding" value={formatCurrency(totalUnpaid)} icon={Receipt} tone="rose" />
                </section>

                <div className="flex flex-col gap-3">
                    <div className="grid gap-3 md:grid-cols-[1fr_220px]">
                        <div className="relative rounded-2xl border border-border bg-background">
                            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Search bill ID, patient, doctor, amount..."
                                className="border-0 pl-9 pr-9 shadow-none focus-visible:ring-0 text-xs"
                            />
                            {isSearching ? (
                                <RotateCw className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 animate-spin text-muted-foreground" />
                            ) : query ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setQuery('');
                                        triggerSearch('', statusFilter, sortOrder);
                                    }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
                                >
                                    <X className="size-3.5" />
                                </button>
                            ) : null}
                        </div>
                        <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                            <SelectTrigger className="text-xs">
                                <SelectValue placeholder="Filter status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All statuses</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="unpaid">Unpaid</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Active Filter Chips Bar */}
                    {(query.trim() !== '' || statusFilter !== 'all' || sortOrder !== 'desc') && (
                        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                            {statusFilter !== 'all' && (
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-medium text-primary shadow-2xs">
                                    Status: {statusFilter.toUpperCase()}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setStatusFilter('all');
                                            triggerSearch(query, 'all', sortOrder);
                                        }}
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
                                        onClick={() => {
                                            setQuery('');
                                            triggerSearch('', statusFilter, sortOrder);
                                        }}
                                        className="ml-0.5 rounded-full p-0.5 hover:bg-primary/20 transition-colors cursor-pointer"
                                        aria-label="Remove search query"
                                    >
                                        <X className="size-3" />
                                    </button>
                                </span>
                            )}
                            {sortOrder !== 'desc' && (
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-medium text-primary shadow-2xs">
                                    Bill ID: Ascending
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSortOrder('desc');
                                            triggerSearch(query, statusFilter, 'desc');
                                        }}
                                        className="ml-0.5 rounded-full p-0.5 hover:bg-primary/20 transition-colors cursor-pointer"
                                        aria-label="Reset sorting"
                                    >
                                        <X className="size-3" />
                                    </button>
                                </span>
                            )}
                            <button
                                type="button"
                                onClick={() => {
                                    setQuery('');
                                    setStatusFilter('all');
                                    setSortOrder('desc');
                                    triggerSearch('', 'all', 'desc');
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
                        <Deferred data="bills" fallback={
                            <div className="overflow-x-auto rounded-xl border border-border">
                                <Table className="min-w-[700px] table-fixed">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[12%]">Bill ID</TableHead>
                                            <TableHead className="w-[22%]">Patient</TableHead>
                                            <TableHead className="w-[22%]">Doctor</TableHead>
                                            <TableHead className="w-[16%]">Visit Date</TableHead>
                                            <TableHead className="w-[14%]">Amount</TableHead>
                                            <TableHead className="w-[14%]">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <BillsTableSkeleton />
                                </Table>
                            </div>
                        }>
                            <div>
                                <div className="overflow-x-auto rounded-xl border border-border">
                                    <Table className="min-w-[700px] table-fixed">
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead
                                                    className="w-[12%] cursor-pointer select-none transition-colors hover:text-foreground"
                                                    onClick={toggleIdSort}
                                                >
                                                    <div className="flex items-center gap-1 font-semibold text-xs uppercase">
                                                        <span>Bill ID</span>
                                                        {sortOrder === 'asc' ? (
                                                            <ArrowUp className="size-3 text-primary" />
                                                        ) : (
                                                            <ArrowDown className="size-3 text-primary" />
                                                        )}
                                                    </div>
                                                </TableHead>
                                                <TableHead className="w-[28%]">Patient</TableHead>
                                                <TableHead className="w-[28%]">Doctor</TableHead>
                                                <TableHead className="w-[16%]">Visit Date</TableHead>
                                                <TableHead className="w-[16%]">Amount</TableHead>
                                                <TableHead className="w-[14%]">Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <AnimatePresence mode="wait">
                                            {isSearching ? (
                                                <BillsTableSkeleton />
                                            ) : billData.length === 0 ? (
                                                <TableBody key="empty">
                                                    <TableRow>
                                                        <TableCell colSpan={6} className="py-8 text-center">
                                                            <EmptyState
                                                                icon={Receipt}
                                                                title="No bills found"
                                                                description="There are no billing records matching your current filter criteria."
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            ) : (
                                                <motion.tbody key="data" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                                                    {billData.map((bill) => (
                                                        <TableRow key={bill.id}>
                                                            <TableCell className="font-mono text-xs font-semibold text-muted-foreground">
                                                                #{bill.id}
                                                            </TableCell>
                                                            <TableCell className="font-medium text-xs text-foreground">
                                                                {bill.appointment?.patient?.user?.name || 'Patient'}
                                                            </TableCell>
                                                            <TableCell className="truncate text-xs text-muted-foreground">
                                                                {bill.appointment?.doctor?.user?.name || 'Doctor'}
                                                            </TableCell>
                                                            <TableCell className="text-xs text-muted-foreground">
                                                                {bill.appointment?.appointment_date}
                                                            </TableCell>
                                                            <TableCell className="font-semibold text-xs text-foreground">
                                                                {formatCurrency(Number(bill.amount))}
                                                            </TableCell>
                                                            <TableCell>
                                                                <BillStatusBadge status={bill.status} />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </motion.tbody>
                                            )}
                                        </AnimatePresence>
                                    </Table>
                                </div>
                                <Pagination links={bills?.meta?.links || []} meta={bills?.meta} />
                            </div>
                        </Deferred>
                    </CardContent>
                </Card>

                {/* Invoice Modal */}
                <Dialog open={selectedBill !== null} onOpenChange={(open) => !open && setSelectedBill(null)}>
                    <DialogContent className="max-w-md p-6">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-bold">Official Clinic Receipt</DialogTitle>
                        </DialogHeader>
                        {selectedBill && (
                            <div className="space-y-4 pt-2 text-sm">
                                <div className="flex items-center justify-between border-b pb-3">
                                    <div>
                                        <p className="font-bold text-foreground">MediFlow Clinic</p>
                                        <p className="text-xs text-muted-foreground">Bill #{selectedBill.id}</p>
                                    </div>
                                    <BillStatusBadge status={selectedBill.status} />
                                </div>
                                <div className="space-y-1.5 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Patient Name:</span>
                                        <span className="font-medium">{selectedBill.appointment?.patient?.user?.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Doctor Name:</span>
                                        <span className="font-medium">{selectedBill.appointment?.doctor?.user?.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Visit Date:</span>
                                        <span className="font-medium">{selectedBill.appointment?.appointment_date}</span>
                                    </div>
                                </div>
                                <div className="rounded-xl bg-muted/40 p-3 flex justify-between items-center font-bold">
                                    <span>Total Fee Charged:</span>
                                    <span className="text-base text-primary">{formatCurrency(Number(selectedBill.amount))}</span>
                                </div>
                                <Button className="w-full" variant="outline" onClick={() => window.print()}>
                                    Print Receipt
                                </Button>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
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

function BillsTableSkeleton() {
    return (
        <TableBody>
            {Array.from({ length: 7 }).map((_, index) => (
                <TableRow key={index}>
                    <TableCell><Skeleton className="h-4 w-10" /></TableCell>
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
    breadcrumbs: [
        { title: 'Admin Dashboard', href: adminDashboard.url() },
        { title: 'Bills', href: adminBills.url() },
    ],
};
