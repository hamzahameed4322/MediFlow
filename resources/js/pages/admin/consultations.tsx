import { Deferred, Head, router } from '@inertiajs/react';
import { Pagination } from '@/components/pagination';
import { ArrowDown, ArrowUp, Mic, RotateCw, Search, Stethoscope, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { EmptyState } from '@/components/empty-state';
import { motion, AnimatePresence } from 'framer-motion';
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
import { dashboard as adminDashboard, consultations as adminConsultations } from '@/routes/admin';
import type { Consultation } from '@/types';

type Props = {
    filters?: {
        search?: string;
        sort_order?: string;
    };
    consultations: {
        data: Consultation[];
        links: any;
        meta: any;
    };
};

export default function ConsultationsIndex({ consultations, filters }: Props) {
    const consultationData = consultations?.data ?? [];
    const [query, setQuery] = useState(filters?.search ?? '');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>((filters?.sort_order as any) ?? 'desc');
    const [isSearching, setIsSearching] = useState(false);

    const triggerSearch = (searchVal: string, orderVal: string) => {
        setIsSearching(true);
        router.get(
            adminConsultations.url(),
            {
                search: searchVal || undefined,
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
                sortOrder !== (filters?.sort_order ?? 'desc')
            ) {
                triggerSearch(query, sortOrder);
            }
        }, 400);
        return () => clearTimeout(timer);
    }, [query, sortOrder]);

    const toggleIdSort = () => {
        const nextOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(nextOrder);
        triggerSearch(query, nextOrder);
    };

    const hasActiveFilter = query.trim() !== '' || sortOrder !== 'desc';

    return (
        <>
            <Head title="Consultations Audit" />

            <div className="flex flex-col gap-6 p-6">
                <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-sm">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary">
                        <Mic className="size-3.5" />
                        Clinical notes
                    </div>
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                        Consultations Audit Log
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                        Review completed clinical encounters, symptoms, and diagnosis notes recorded across all doctors.
                    </p>
                </section>

                <Card>
                    <CardHeader>
                        <CardTitle>Consultation records</CardTitle>
                        <CardDescription>Symptoms, diagnosis, and notes from completed visits.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Search symptoms, diagnosis, doctor or patient name..."
                                className="pl-10 pr-10 h-10 text-xs"
                            />
                            {isSearching ? (
                                <RotateCw className="absolute right-3.5 top-1/2 -translate-y-1/2 size-3.5 animate-spin text-muted-foreground" />
                            ) : query ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setQuery('');
                                        triggerSearch('', sortOrder);
                                    }}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                                >
                                    <X className="size-3.5" />
                                </button>
                            ) : null}
                        </div>

                        {/* Active Filter Chips Bar */}
                        {hasActiveFilter && (
                            <div className="flex flex-wrap items-center gap-2 text-xs">
                                {query.trim() !== '' && (
                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-medium text-primary shadow-2xs">
                                        Search: "{query}"
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setQuery('');
                                                triggerSearch('', sortOrder);
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
                                        Visit ID: Ascending
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSortOrder('desc');
                                                triggerSearch(query, 'desc');
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
                                        setSortOrder('desc');
                                        triggerSearch('', 'desc');
                                    }}
                                    className="ml-1 text-xs font-semibold text-muted-foreground hover:text-destructive transition-colors underline-offset-4 hover:underline cursor-pointer"
                                >
                                    Reset all
                                </button>
                            </div>
                        )}

                        <Deferred data="consultations" fallback={
                            <div className="overflow-x-auto rounded-xl border border-border">
                                <Table className="min-w-[800px] table-fixed">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[12%]">Visit ID</TableHead>
                                            <TableHead className="w-[20%]">Doctor &amp; Patient</TableHead>
                                            <TableHead className="w-[23%]">Symptoms</TableHead>
                                            <TableHead className="w-[23%]">Diagnosis</TableHead>
                                            <TableHead className="w-[22%]">Notes</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <ConsultationsTableSkeleton />
                                </Table>
                            </div>
                        }>
                            <div className="overflow-x-auto rounded-xl border border-border">
                                <Table className="min-w-[800px] table-fixed">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead
                                                className="w-[12%] cursor-pointer select-none transition-colors hover:text-foreground"
                                                onClick={toggleIdSort}
                                            >
                                                <div className="flex items-center gap-1 font-semibold text-xs uppercase">
                                                    <span>Visit ID</span>
                                                    {sortOrder === 'asc' ? (
                                                        <ArrowUp className="size-3 text-primary" />
                                                    ) : (
                                                        <ArrowDown className="size-3 text-primary" />
                                                    )}
                                                </div>
                                            </TableHead>
                                            <TableHead className="w-[20%]">Doctor & Patient</TableHead>
                                            <TableHead className="w-[23%]">Symptoms</TableHead>
                                            <TableHead className="w-[23%]">Diagnosis</TableHead>
                                            <TableHead className="w-[22%]">Notes</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <AnimatePresence mode="wait">
                                        {isSearching ? (
                                            <ConsultationsTableSkeleton />
                                        ) : consultationData.length === 0 ? (
                                            <TableBody key="empty">
                                                <TableRow>
                                                    <TableCell colSpan={5} className="py-8 text-center">
                                                        <EmptyState icon={Stethoscope} title="No consultations found" description="No consultation records match your current search criteria." />
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        ) : (
                                            <motion.tbody key="data" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                                                {consultationData.map((consultation) => (
                                                    <TableRow key={consultation.id}>
                                                        <TableCell className="align-top text-muted-foreground font-mono text-xs">
                                                            <p className="font-medium text-foreground">
                                                                #{consultation.id}
                                                            </p>
                                                            <p className="text-[11px]">
                                                                {consultation.created_at ? consultation.created_at.slice(0, 10) : ''}
                                                            </p>
                                                        </TableCell>
                                                        <TableCell className="align-top">
                                                            <p className="truncate font-medium text-foreground text-xs">
                                                                Doc: {consultation.appointment?.doctor?.user?.name || 'Assigned Doctor'}
                                                            </p>
                                                            <p className="truncate text-[11px] text-muted-foreground">
                                                                Pt: {consultation.appointment?.patient?.user?.name || 'Patient'}
                                                            </p>
                                                        </TableCell>
                                                        <TableCell
                                                            className="align-top text-muted-foreground text-xs"
                                                            title={consultation.symptoms}
                                                        >
                                                            <p className="line-clamp-2">{consultation.symptoms || 'None'}</p>
                                                        </TableCell>
                                                        <TableCell
                                                            className="align-top text-muted-foreground text-xs"
                                                            title={consultation.diagnosis}
                                                        >
                                                            <p className="line-clamp-2 font-medium text-foreground/90">{consultation.diagnosis || 'Pending'}</p>
                                                        </TableCell>
                                                        <TableCell className="align-top whitespace-normal break-words text-muted-foreground text-xs">
                                                            {consultation.notes || 'No additional notes.'}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </motion.tbody>
                                        )}
                                    </AnimatePresence>
                                </Table>
                            </div>
                            <Pagination links={consultations?.meta?.links || []} meta={consultations?.meta} />
                        </Deferred>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

ConsultationsIndex.layout = {
    breadcrumbs: [
        { title: 'Admin Dashboard', href: adminDashboard.url() },
        { title: 'Consultations', href: adminConsultations.url() },
    ],
};

function ConsultationsTableSkeleton() {
    return (
        <TableBody>
            {Array.from({ length: 7 }).map((_, index) => (
                <TableRow key={index}>
                    <TableCell>
                        <Skeleton className="mb-1 h-4 w-14" />
                        <Skeleton className="h-3 w-20" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="mb-1 h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                    </TableCell>
                    <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}
