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
import { Mic, Search, Stethoscope } from 'lucide-react';
import { useMemo, useState } from 'react';
import { EmptyState } from '@/components/empty-state';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { consultations as adminConsultations } from '@/routes/admin';
import type { Consultation } from '@/types';

type Props = {
    consultations: {
        data: Consultation[];
        links: any;
        meta: any;
    };
};

export default function ConsultationsIndex({ consultations }: Props) {
    const consultationData = consultations?.data ?? [];
    const [query, setQuery] = useState('');

    const filteredConsultations = useMemo(() => {
        return consultationData.filter((consultation) => {
            const searchableText = [
                consultation.appointment?.doctor?.user?.name,
                consultation.appointment?.patient?.user?.name,
                consultation.symptoms,
                consultation.diagnosis,
                consultation.notes,
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();

            return searchableText.includes(query.toLowerCase());
        });
    }, [consultationData, query]);

    const hasRecords = consultationData.length > 0;
    const hasResults = filteredConsultations.length > 0;

    return (
        <>
            <Head title="Consultations" />

            <div className="flex flex-col gap-6 p-6">
                <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-sm">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary">
                        <Mic className="size-3.5" />
                        Clinical notes
                    </div>
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                        Consultations
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                        Review every completed clinical encounter and the diagnosis notes that shaped
                        the prescription and billing trail.
                    </p>
                </section>

                <Card>
                    <CardHeader>
                        <CardTitle>Consultation records</CardTitle>
                        <CardDescription>Symptoms, diagnosis, and notes from completed visits.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative mb-4">
                            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Search doctor, patient, symptoms, diagnosis..."
                                className="pl-9"
                            />
                        </div>

                        <Deferred data="consultations" fallback={<ConsultationsSkeleton />}>
                            {!hasRecords ? (
                                <EmptyState
                                    icon={Stethoscope}
                                    title="No consultations yet"
                                    description="Consultation records will appear after doctors complete appointments."
                                />
                            ) : !hasResults ? (
                                <EmptyState
                                    icon={Search}
                                    title="No matches found"
                                    description="Try a different doctor, patient, symptom, or diagnosis keyword."
                                />
                            ) : (
                                <div>
                                    <div className="overflow-x-auto rounded-xl border border-border">
                                        <Table className="min-w-[800px] table-fixed">
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[9%]">Visit</TableHead>
                                                    <TableHead className="w-[18%]">Doctor / Patient</TableHead>
                                                    <TableHead className="w-[24%]">Symptoms</TableHead>
                                                    <TableHead className="w-[24%]">Diagnosis</TableHead>
                                                    <TableHead className="w-[25%]">Notes</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredConsultations.map((consultation) => (
                                                    <TableRow key={consultation.id}>
                                                        <TableCell className="align-top text-muted-foreground">
                                                            <p className="font-medium text-foreground">
                                                                #{consultation.id}
                                                            </p>
                                                            <p className="text-xs">
                                                                {consultation.created_at.slice(0, 10)}
                                                            </p>
                                                        </TableCell>
                                                        <TableCell className="align-top">
                                                            <p className="truncate font-medium">
                                                                {consultation.appointment?.doctor?.user?.name}
                                                            </p>
                                                            <p className="truncate text-xs text-muted-foreground">
                                                                {consultation.appointment?.patient?.user?.name}
                                                            </p>
                                                        </TableCell>
                                                        <TableCell
                                                            className="align-top text-muted-foreground"
                                                            title={consultation.symptoms}
                                                        >
                                                            <p className="line-clamp-2">{consultation.symptoms}</p>
                                                        </TableCell>
                                                        <TableCell
                                                            className="align-top text-muted-foreground"
                                                            title={consultation.diagnosis}
                                                        >
                                                            <p className="line-clamp-2">{consultation.diagnosis}</p>
                                                        </TableCell>
                                                        <TableCell className="align-top whitespace-normal break-words text-muted-foreground">
                                                            {consultation.notes || 'No notes provided.'}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <Pagination links={consultations?.meta?.links || []} meta={consultations?.meta} />
                                </div>
                            )}
                        </Deferred>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

ConsultationsIndex.layout = {
    breadcrumbs: [{ title: 'Consultations', href: adminConsultations.url() }],
};

function ConsultationsSkeleton() {
    return (
        <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-20 w-full rounded-2xl" />
            ))}
        </div>
    );
}
