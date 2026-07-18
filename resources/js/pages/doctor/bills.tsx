import { Head, useForm, router } from '@inertiajs/react';
import { Pagination } from '@/components/pagination';
import { ReceiptText, CircleDollarSign, CheckCircle2, Search } from 'lucide-react';
import { useState } from 'react';
import { EmptyState } from '@/components/empty-state';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

export default function Bills({ bills, filters }: Props) {
    const form = useForm({});
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');

    function markPaid(id: number) {
        form.post(`/doctor/bills/${id}/pay`, { preserveScroll: true });
    }

    function applyFilters(status?: string, search?: string) {
        router.get(
            '/doctor/bills',
            {
                search: search ?? searchQuery,
                status: status ?? filters?.status ?? 'all',
            },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    }

    function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            applyFilters(undefined, searchQuery);
        }
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

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
                    <div className="relative w-full sm:max-w-xs">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search patients..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </div>
                    <div className="w-full sm:w-auto flex items-center gap-2">
                        <Select
                            value={filters?.status || 'all'}
                            onValueChange={(value) => applyFilters(value)}
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

                {bills?.data?.length === 0 ? (
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
                                                <p className="text-xs text-muted-foreground">{bill.appointment?.appointment_date} • {bill.appointment?.appointment_time.slice(0, 5)}</p>
                                            </div>
                                            <Badge variant={bill.status === 'paid' ? 'default' : 'secondary'}>{bill.status}</Badge>
                                        </div>
                                        <div className="flex items-center justify-between rounded-2xl border bg-muted/30 p-4">
                                            <div>
                                                <p className="text-xs uppercase tracking-wide text-muted-foreground">Amount</p>
                                                <p className="text-2xl font-bold">${Number(bill.amount).toFixed(2)}</p>
                                            </div>
                                            {bill.status === 'unpaid' ? (
                                                <Button onClick={() => markPaid(bill.id)}><CircleDollarSign className="mr-2 size-4" /> Mark paid</Button>
                                            ) : (
                                                <Badge className="gap-1 bg-emerald-500/10 text-emerald-700"><CheckCircle2 className="size-3.5" /> Paid</Badge>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <Pagination links={bills?.meta?.links || []} meta={bills?.meta} />
                    </div>
                )}
            </div>
        </>
    );
}

Bills.layout = { breadcrumbs: [{ title: 'Doctor Bills', href: '/doctor/bills' }] };