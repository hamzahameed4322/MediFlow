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
import { ClipboardList, Pill, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { EmptyState } from '@/components/empty-state';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { prescriptions as adminPrescriptions } from '@/routes/admin';
import type { Prescription } from '@/types';

type Props = {
    prescriptions: {
        data: Prescription[];
        links: any;
        meta: any;
    };
};

export default function PrescriptionsIndex({ prescriptions }: Props) {
    const prescriptionData = prescriptions?.data ?? [];
    const [query, setQuery] = useState('');

    const filteredPrescriptions = useMemo(() => {
        return prescriptionData.filter((prescription) => {
            const searchableText = [
                prescription.consultation?.appointment?.doctor?.user?.name,
                prescription.consultation?.appointment?.patient?.user?.name,
                prescription.instructions,
                ...(prescription.items?.map((item) => item.medicine_name) ?? []),
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();

            return searchableText.includes(query.toLowerCase());
        });
    }, [prescriptionData, query]);

    return (
        <>
            <Head title="Prescriptions" />

            <div className="flex flex-col gap-6 p-6">
                <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-sm">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary">
                        <ClipboardList className="size-3.5" />
                        Digital prescriptions
                    </div>
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                        Prescriptions
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                        Audit medicine lists, doctor instructions, and the consultation that
                        generated each prescription.
                    </p>
                </section>

                <Card>
                    <CardHeader>
                        <CardTitle>Prescription archive</CardTitle>
                        <CardDescription>Complete pharmacy-free prescription history for the clinic.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative mb-4">
                            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Search doctor, patient, medicine..."
                                className="pl-9"
                            />
                        </div>

                        <Deferred data="prescriptions" fallback={<PrescriptionsSkeleton />}>
                            {filteredPrescriptions.length === 0 ? (
                                <EmptyState
                                    icon={Pill}
                                    title="No prescriptions yet"
                                    description="Prescriptions will appear after doctors complete consultations."
                                />
                            ) : (
                                <div>
                                    <div className="space-y-3">
                                        {filteredPrescriptions.map((prescription) => (
                                            <div
                                                key={prescription.id}
                                                className="rounded-2xl border border-border p-4 transition-colors hover:bg-muted/30"
                                            >
                                                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                                    <div className="space-y-3">
                                                        <div>
                                                            <p className="font-semibold">
                                                                {prescription.consultation?.appointment?.doctor?.user?.name}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                Patient: {prescription.consultation?.appointment?.patient?.user?.name}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            <Badge variant="outline">
                                                                Consultation #{prescription.consultation_id}
                                                            </Badge>
                                                            <Badge variant="outline">
                                                                {prescription.items?.length || 0} items
                                                            </Badge>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                                                            {prescription.items?.map((item) => (
                                                                <Badge key={item.id} variant="secondary">
                                                                    {item.medicine_name}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="max-w-md rounded-2xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                                                        <p className="text-xs font-semibold tracking-[0.28em] text-foreground/70 uppercase">
                                                            Instructions
                                                        </p>
                                                        <p className="mt-2">
                                                            {prescription.instructions || 'No instructions provided.'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Pagination links={prescriptions?.meta?.links || []} meta={prescriptions?.meta} />
                                </div>
                            )}
                        </Deferred>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

PrescriptionsIndex.layout = {
    breadcrumbs: [{ title: 'Prescriptions', href: adminPrescriptions.url() }],
};

function PrescriptionsSkeleton() {
    return (
        <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-28 w-full rounded-2xl" />
            ))}
        </div>
    );
}
