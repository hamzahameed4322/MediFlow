import { Head } from '@inertiajs/react';
import { Star, ArrowLeft, MessageSquare } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { EmptyState } from '@/components/empty-state';
import { Pagination } from '@/components/pagination';
import { StarDisplay } from '@/components/star-rating';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { doctors as adminDoctors } from '@/routes/admin';
import type { DoctorProfile, DoctorReview } from '@/types';

type Props = {
    doctor: DoctorProfile;
    reviews: {
        data: DoctorReview[];
        links: any;
        meta: any;
    };
    stats: {
        average_rating: number;
        total_reviews: number;
    };
};

export default function AdminDoctorReviews({ doctor, reviews, stats }: Props) {
    return (
        <>
            <Head title={`Reviews — ${doctor.user?.name}`} />
            <div className="flex flex-col gap-6 p-6">
                {/* Back button + header */}
                <div className="flex flex-col gap-3">
                    <div>
                        <Button variant="ghost" size="sm" className="-ml-2 text-muted-foreground" asChild>
                            <Link href={adminDoctors.url()}>
                                <ArrowLeft className="mr-1.5 size-4" />
                                Back to Doctors
                            </Link>
                        </Button>
                    </div>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-semibold tracking-tight">{doctor.user?.name}</h1>
                            <p className="mt-1 text-muted-foreground">{doctor.specialization}</p>
                        </div>
                        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3 shadow-sm">
                            <div className="text-right">
                                <p className="text-2xl font-bold">{stats.average_rating > 0 ? stats.average_rating : '—'}</p>
                                <StarDisplay rating={Math.round(stats.average_rating)} size="sm" />
                            </div>
                            <div className="border-l border-border pl-3">
                                <p className="text-xl font-bold">{stats.total_reviews}</p>
                                <p className="text-xs text-muted-foreground">reviews</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Patient Reviews</CardTitle>
                        <CardDescription>Full review history from patients who completed consultations with this doctor.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {reviews.data.length === 0 ? (
                            <EmptyState
                                icon={Star}
                                title="No reviews yet"
                                description="This doctor has not received any reviews."
                            />
                        ) : (
                            <div className="flex flex-col gap-3">
                                {reviews.data.map((review) => (
                                    <div
                                        key={review.id}
                                        className="flex flex-col gap-3 rounded-xl border border-border bg-muted/20 p-4"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-start gap-3">
                                                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary text-sm">
                                                    {review.patient?.user?.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{review.patient?.user?.name}</p>
                                                    <p className="text-xs text-muted-foreground">{review.patient?.user?.email}</p>
                                                    <div className="mt-1">
                                                        <StarDisplay rating={review.rating} size="sm" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-1 shrink-0">
                                                <Badge
                                                    className={`text-xs border ${
                                                        review.rating >= 4
                                                            ? 'bg-primary/10 text-primary border-primary/20 dark:bg-primary/15 dark:text-primary'
                                                            : review.rating === 3
                                                            ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400'
                                                            : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400'
                                                    }`}
                                                >
                                                    {review.rating} / 5
                                                </Badge>
                                                <span className="text-[10px] text-muted-foreground">
                                                    {review.appointment?.appointment_date ?? review.created_at.slice(0, 10)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="border-t border-border/40 pt-2.5">
                                            {review.comment ? (
                                                <p className="text-sm text-foreground/90 italic leading-relaxed">"{review.comment}"</p>
                                            ) : (
                                                <p className="flex items-center gap-1 text-xs text-muted-foreground/50 italic">
                                                    <MessageSquare className="size-3" /> No comment
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <Pagination links={reviews.links ?? reviews.meta?.links ?? []} meta={reviews.meta ?? reviews} />
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

AdminDoctorReviews.layout = {
    breadcrumbs: [
        { title: 'Doctors', href: adminDoctors.url() },
        { title: 'Doctor Reviews', href: '#' },
    ],
};
