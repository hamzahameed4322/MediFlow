import { Head, useForm, router } from '@inertiajs/react';
import { Pagination } from '@/components/pagination';
import { ReceiptText, CircleDollarSign, CheckCircle2, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { EmptyState } from '@/components/empty-state';
import { BillStatusBadge } from '@/components/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import type { Bill } from '@/types';

type Props = {
    bills: {
        data: Bill[];
        links: any;
        meta: any;
    };
    filters?: {
        search?: string;
        status?: string;
    };
};

// ── Skeleton card ──────────────────────────────────────────────────────────────
function BillCardSkeleton() {
    return (
        <Card>
            <CardContent className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-5 w-14 rounded-full" />
                </div>
                <div className="flex items-center justify-between rounded-2xl border bg-muted/30 p-4">
                    <div className="space-y-1">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-7 w-24" />
                    </div>
                    <Skeleton className="h-9 w-28 rounded-lg" />
                </div>
            </CardContent>
        </Card>
    );
}

export default function Bills({ bills, filters }: Props) {
    const form = useForm({});
    const [searchQuery, setSearchQuery] = useState(filters?.search ?? '');
    const [isSearching, setIsSearching] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    function applyFilters(status?: string, search?: string) {
        const q = search !== undefined ? search : searchQuery;
        const s = status !== undefined ? status : (filters?.status ?? 'all');
        router.get(
            '/doctor/bills',
            { search: q, status: s },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onFinish: () => setIsSearching(false),
            }
        );
    }

    // Debounced auto-search — fires 450ms after the user stops typing
    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        setIsSearching(true);

        debounceRef.current = setTimeout(() => {
            applyFilters(undefined, searchQuery);
        }, 450);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

    function markPaid(id: number) {
        form.post(`/doctor/bills/${id}/pay`, { preserveScroll: true });
    }

    return (
        <>
            <Head title="Doctor Bills" />
            <div className="flex flex-col gap-6 p-6">
                <section className="rounded-[1.75rem] border border-primary/10 bg-linear-to-br from-primary/[0.03] to-primary/[0.07] p-8 text-foreground shadow-xs dark:from-card dark:to-card dark:border-border">
                    <div className="space-y-3">
                        <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-medium tracking-wide text-primary">
                            <ReceiptText className="size-3.5" /> Billing
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight">Doctor bills</h1>
                        <p className="max-w-2xl text-sm text-muted-foreground">Track consultation billing and settlement status for each appointment.</p>
                    </div>
                </section>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
                    <div className="relative w-full sm:max-w-xs">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="bills-search"
                            type="text"
                            placeholder="Search patients..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="w-full sm:w-auto flex items-center gap-2">
                        <Select
                            value={filters?.status ?? 'all'}
                            onValueChange={(value) => {
                                setIsSearching(true);
                                applyFilters(value, searchQuery);
                            }}
                        >
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="unpaid">Unpaid</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                            </SelectContent>
                        </Select>
                        {(filters?.search || (filters?.status && filters?.status !== 'all')) && (
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setSearchQuery('');
                                    router.get('/doctor/bills', {}, { preserveState: true, preserveScroll: true });
                                }}
                            >
                                Clear
                            </Button>
                        )}
                    </div>
                </div>

                {/* Content */}
                {isSearching ? (
                    <div className="grid gap-4 lg:grid-cols-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <BillCardSkeleton key={i} />
                        ))}
                    </div>
                ) : bills?.data?.length === 0 ? (
                    <EmptyState icon={ReceiptText} title="No bills found" description="Bills will generate after recorded consultations." />
                ) : (
                    <div className="space-y-6">
                        <div className="grid gap-4 lg:grid-cols-2">
                            {bills.data.map((bill) => (
                                <Card key={bill.id}>
                                    <CardContent className="space-y-4 p-5">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className="font-semibold">{bill.appointment?.patient?.user?.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {bill.appointment?.appointment_date} • {bill.appointment?.appointment_time.slice(0, 5)}
                                                </p>
                                            </div>
                                            <BillStatusBadge status={bill.status} />
                                        </div>
                                        <div className="flex items-center justify-between rounded-2xl border bg-muted/30 p-4">
                                            <div>
                                                <p className="text-xs uppercase tracking-wide text-muted-foreground">Amount</p>
                                                <p className="text-2xl font-bold">${Number(bill.amount).toFixed(2)}</p>
                                            </div>
                                            {bill.status === 'unpaid' ? (
                                                <Button onClick={() => markPaid(bill.id)}>
                                                    <CircleDollarSign className="mr-2 size-4" /> Mark paid
                                                </Button>
                                            ) : (
                                                <Badge className="gap-1 bg-primary/10 text-primary border border-primary/20">
                                                    <CheckCircle2 className="size-3.5" /> Paid
                                                </Badge>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <Pagination links={bills?.meta?.links ?? []} meta={bills?.meta} />
                    </div>
                )}
            </div>
        </>
    );
}

Bills.layout = { breadcrumbs: [{ title: 'Doctor Bills', href: '/doctor/bills' }] };