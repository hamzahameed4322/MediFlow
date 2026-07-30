import { Head } from '@inertiajs/react';
import { Receipt, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { EmptyState } from '@/components/empty-state';
import { BillStatusBadge } from '@/components/status-badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Bill } from '@/types';

type Props = {
    bills: Bill[];
};

export default function Bills({ bills }: Props) {
    const [filter, setFilter] = useState<'all' | 'unpaid' | 'paid'>('all');

    const filtered = filter === 'all' ? bills : bills.filter(b => b.status === filter);

    const totalPaid = bills.filter(b => b.status === 'paid').reduce((sum, b) => sum + Number(b.amount), 0);
    const totalUnpaid = bills.filter(b => b.status === 'unpaid').reduce((sum, b) => sum + Number(b.amount), 0);

    const TABS = [
        { key: 'all' as const, label: 'All Bills', count: bills.length },
        { key: 'unpaid' as const, label: 'Unpaid', count: bills.filter(b => b.status === 'unpaid').length },
        { key: 'paid' as const, label: 'Paid', count: bills.filter(b => b.status === 'paid').length },
    ];

    return (
        <>
            <Head title="My Bills" />
            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight">My Bills</h1>
                    <p className="text-muted-foreground">Track your clinic consultation payments and billing records.</p>
                </div>

                {/* Summary */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-4 rounded-xl border bg-card p-4">
                        <div className="flex size-12 items-center justify-center rounded-full bg-red-500/10">
                            <AlertCircle className="size-6 text-red-500" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Outstanding</p>
                            <p className="text-2xl font-bold text-red-600">${totalUnpaid.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-xl border bg-card p-4">
                        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                            <CheckCircle className="size-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Total Paid</p>
                            <p className="text-2xl font-bold text-primary">${totalPaid.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 overflow-x-auto rounded-xl border bg-muted/40 p-1">
                    {TABS.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setFilter(tab.key)}
                            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all ${
                                filter === tab.key
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {tab.label}
                            {tab.count > 0 && (
                                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                                    filter === tab.key ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20'
                                }`}>{tab.count}</span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Bills Table */}
                {filtered.length === 0 ? (
                    <EmptyState icon={Receipt} title="No bills found" description="No bills match this filter." />
                ) : (
                    <Card>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b bg-muted/30">
                                            <th className="py-3 px-4 text-left font-semibold text-muted-foreground">Doctor</th>
                                            <th className="py-3 px-4 text-left font-semibold text-muted-foreground">Specialization</th>
                                            <th className="py-3 px-4 text-left font-semibold text-muted-foreground">Visit Date</th>
                                            <th className="py-3 px-4 text-left font-semibold text-muted-foreground">Amount</th>
                                            <th className="py-3 px-4 text-left font-semibold text-muted-foreground">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {filtered.map((bill) => (
                                            <tr key={bill.id} className="hover:bg-muted/30 transition-colors">
                                                <td className="py-3 px-4 font-medium">{bill.appointment?.doctor?.user?.name}</td>
                                                <td className="py-3 px-4 text-muted-foreground">{bill.appointment?.doctor?.specialization}</td>
                                                <td className="py-3 px-4 text-muted-foreground">{bill.appointment?.appointment_date}</td>
                                                <td className="py-3 px-4">
                                                    <span className={`font-bold ${bill.status === 'unpaid' ? 'text-destructive' : 'text-primary'}`}>
                                                        ${Number(bill.amount).toFixed(2)}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <BillStatusBadge status={bill.status} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}

Bills.layout = {
    breadcrumbs: [
        { title: 'My Bills', href: '/patient/bills' },
    ],
};
