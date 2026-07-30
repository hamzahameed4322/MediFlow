import { Deferred, Head } from '@inertiajs/react';
import { Pagination } from '@/components/pagination';
import { ArrowDown, ArrowUp, Mic, Search, Stethoscope, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
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
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

    // Debounce search query & toggle loading skeleton
    useEffect(() => {
        if (query !== debouncedQuery) {
            setIsSearching(true);
            const timeoutId = setTimeout(() => {
                setDebouncedQuery(query);
                setIsSearching(false);
            }, 250);
            return () => clearTimeout(timeoutId);
        }
    }, [query, debouncedQuery]);

    // Search ONLY by Doctor or Patient Name, and sort by Visit ID
    const sortedAndFiltered = useMemo(() => {
        const filtered = consultationData.filter((consultation) => {
            if (!debouncedQuery.trim()) return true;
            const doctorName = consultation.appointment?.doctor?.user?.name || '';
            const patientName = consultation.appointment?.patient?.user?.name || '';
            const searchableText = `${doctorName} ${patientName}`.toLowerCase();
            return searchableText.includes(debouncedQuery.toLowerCase().trim());
        });

        return [...filtered].sort((a, b) => {
            return sortOrder === 'desc' ? b.id - a.id : a.id - b.id;
        });
    }, [consultationData, debouncedQuery, sortOrder]);

    const hasRecords = consultationData.length > 0;
    const hasResults = sortedAndFiltered.length > 0;

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
                        {/* Search Bar (Doctor & Patient search ONLY) */}
                        <div className="relative mb-4">
                            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Search doctor or patient name..."
                                className="pl-10 pr-10 h-10 text-sm"
                            />
                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                >
                                    <X className="size-3.5" />
                                </button>
                            )}
                        </div>

                        <Deferred data="consultations" fallback={<ConsultationsSkeleton />}>
                            {isSearching ? (
                                <ConsultationsSkeleton />
                            ) : !hasRecords ? (
                                <EmptyState
                                    icon={Stethoscope}
                                    title="No consultations yet"
                                    description="Consultation records will appear after doctors complete appointments."
                                />
                            ) : !hasResults ? (
                                <EmptyState
                                    icon={Search}
                                    title="No matches found"
                                    description={`No doctor or patient matches found for "${debouncedQuery}".`}
                                />
                            ) : (
                                <div>
                                    <div className="overflow-x-auto rounded-xl border border-border">
                                        <Table className="min-w-[800px] table-fixed">
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[12%]">
                                                        <button
                                                            type="button"
                                                            onClick={() => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
                                                            className="flex items-center gap-1.5 font-semibold text-foreground hover:text-primary transition-colors text-xs uppercase tracking-wider"
                                                            title="Click to sort by Visit ID"
                                                        >
                                                            <span>Visit</span>
                                                            {sortOrder === 'desc' ? (
                                                                <ArrowDown className="size-3.5 text-primary shrink-0" />
                                                            ) : (
                                                                <ArrowUp className="size-3.5 text-primary shrink-0" />
                                                            )}
                                                        </button>
                                                    </TableHead>
                                                    <TableHead className="w-[20%]">Doctor / Patient</TableHead>
                                                    <TableHead className="w-[23%]">Symptoms</TableHead>
                                                    <TableHead className="w-[23%]">Diagnosis</TableHead>
                                                    <TableHead className="w-[22%]">Notes</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {sortedAndFiltered.map((consultation) => (
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
                                                            <p className="truncate font-medium text-foreground">
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
                                                        <TableCell className="align-top whitespace-normal break-words text-muted-foreground text-xs">
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
