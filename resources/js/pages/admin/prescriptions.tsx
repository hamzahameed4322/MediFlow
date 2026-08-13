import { Deferred, Head, router } from '@inertiajs/react';
import { Pagination } from '@/components/pagination';
import { ClipboardList, Eye, Pill, Search, RotateCw, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { EmptyState } from '@/components/empty-state';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { dashboard as adminDashboard, prescriptions as adminPrescriptions } from '@/routes/admin';
import type { Prescription } from '@/types';

type Props = {
    filters?: {
        search?: string;
    };
    prescriptions: {
        data: Prescription[];
        links: any;
        meta: any;
    };
};

export default function PrescriptionsIndex({ prescriptions, filters }: Props) {
    const prescriptionData = prescriptions?.data ?? [];
    const [query, setQuery] = useState(filters?.search ?? '');
    const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    const triggerSearch = (searchVal: string) => {
        setIsSearching(true);
        router.get(
            adminPrescriptions.url(),
            { search: searchVal || undefined },
            { preserveState: true, preserveScroll: true, replace: true, onFinish: () => setIsSearching(false) }
        );
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query !== (filters?.search ?? '')) {
                triggerSearch(query);
            }
        }, 400);
        return () => clearTimeout(timer);
    }, [query]);

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
                                placeholder="Search doctor or patient..."
                                className="pl-9 pr-9"
                            />
                            {isSearching ? (
                                <RotateCw className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 animate-spin text-muted-foreground" />
                            ) : query ? (
                                <button
                                    type="button"
                                    onClick={() => { setQuery(''); triggerSearch(''); }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
                                >
                                    <X className="size-3.5" />
                                </button>
                            ) : null}
                        </div>

                        {query.trim() !== '' && (
                            <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-medium text-primary shadow-2xs">
                                    Search: "{query}"
                                    <button
                                        type="button"
                                        onClick={() => { setQuery(''); triggerSearch(''); }}
                                        className="ml-0.5 rounded-full p-0.5 hover:bg-primary/20 transition-colors cursor-pointer"
                                        aria-label="Remove search query"
                                    >
                                        <X className="size-3" />
                                    </button>
                                </span>
                            </div>
                        )}

                        <Deferred data="prescriptions" fallback={<PrescriptionsSkeleton />}>
                            {prescriptionData.length === 0 ? (
                                <EmptyState
                                    icon={Pill}
                                    title="No prescriptions found"
                                    description="No digital prescriptions match your current search criteria."
                                />
                            ) : (
                                <div>
                                    <div className={`flex flex-col gap-3 transition-opacity duration-200 ${isSearching ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                                        {prescriptionData.map((prescription, index) => (
                                            <motion.div
                                                key={prescription.id}
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05, duration: 0.22 }}
                                                className="rounded-2xl border border-border p-4 transition-colors hover:bg-muted/30"
                                            >
                                                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                                    <div className="space-y-3">
                                                        <div>
                                                            <p className="font-semibold text-foreground">
                                                                Doctor: {prescription.consultation?.appointment?.doctor?.user?.name || 'Doctor'}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                Patient: {prescription.consultation?.appointment?.patient?.user?.name || 'Patient'}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            <Badge variant="outline">
                                                                Consultation #{prescription.consultation_id}
                                                            </Badge>
                                                            <Badge variant="outline">
                                                                {prescription.items?.length || 0} prescribed medicines
                                                            </Badge>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2 text-xs">
                                                            {prescription.items?.map((item) => (
                                                                <span
                                                                    key={item.id}
                                                                    className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-muted/60 px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted/90"
                                                                >
                                                                    <Pill className="size-3.5 text-primary shrink-0" />
                                                                    {item.medicine_name} ({item.dosage} • {item.frequency})
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="max-w-md rounded-2xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                                                        <p className="text-xs font-semibold tracking-[0.28em] text-foreground/70 uppercase">
                                                            Doctor Instructions
                                                        </p>
                                                        <p className="mt-2 text-xs leading-relaxed text-foreground/90">
                                                            {prescription.instructions || 'No special instructions provided.'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
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
    breadcrumbs: [
        { title: 'Admin Dashboard', href: adminDashboard.url() },
        { title: 'Prescriptions', href: adminPrescriptions.url() },
    ],
};

function PrescriptionsSkeleton() {
    return (
        <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="rounded-2xl border border-border p-4">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-1.5">
                                <Skeleton className="h-4 w-48" />
                                <Skeleton className="h-3 w-36" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Skeleton className="h-5 w-28 rounded-full" />
                                <Skeleton className="h-5 w-36 rounded-full" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Skeleton className="h-6 w-32 rounded-lg" />
                                <Skeleton className="h-6 w-28 rounded-lg" />
                                <Skeleton className="h-6 w-36 rounded-lg" />
                            </div>
                        </div>
                        <div className="max-w-md rounded-2xl border border-border bg-muted/30 p-4">
                            <Skeleton className="mb-2 h-3 w-32" />
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="mt-1 h-3 w-3/4" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
