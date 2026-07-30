import { Head } from '@inertiajs/react';
import { Star, MessageSquare } from 'lucide-react';
import { EmptyState } from '@/components/empty-state';
import { Pagination } from '@/components/pagination';
import { StarDisplay } from '@/components/star-rating';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { reviews as doctorReviewsRoute } from '@/routes/doctor';
import type { DoctorReview } from '@/types';

// JsonResource::collection wraps paginator → sends { data, links, meta }
type PaginatedReviews = {
    data: DoctorReview[];
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
};

type Props = {
    reviews: PaginatedReviews;
    stats: {
        average_rating: number | null;
        total_reviews: number;
    };
};

export default function DoctorReviews({ reviews, stats }: Props) {
    const reviewList = reviews.data;

    return (
        <>
            <Head title="My Reviews" />
            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight">My Reviews</h1>
                    <p className="text-muted-foreground">See what your patients are saying about you.</p>
                </div>

                {/* Stats */}
                {stats.total_reviews > 0 ? (
                    <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-6 shadow-sm min-w-[160px]">
                            <p className="text-5xl font-bold text-foreground">{stats.average_rating}</p>
                            <div className="mt-2">
                                <StarDisplay rating={Math.round(stats.average_rating ?? 0)} size="md" />
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">Average Rating</p>
                        </div>
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-6 shadow-sm min-w-[140px]">
                            <p className="text-5xl font-bold text-foreground">{stats.total_reviews}</p>
                            <p className="mt-2 text-sm text-muted-foreground">Total Reviews</p>
                        </div>

                        {/* Rating Breakdown — percentages use backend stats.total_reviews for accuracy */}
                        <Card className="flex-1 min-w-[240px]">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Rating Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-1.5">
                                {[5, 4, 3, 2, 1].map((star) => {
                                    const count = reviewList.filter((r) => r.rating === star).length;
                                    const pct = stats.total_reviews > 0 ? Math.round((count / stats.total_reviews) * 100) : 0;

                                    return (
                                        <div key={star} className="flex items-center gap-2 text-xs">
                                            <span className="w-4 text-right text-muted-foreground">{star}</span>
                                            <Star className="size-3 fill-primary text-primary shrink-0" />
                                            <div className="flex-1 rounded-full bg-muted h-1.5 overflow-hidden">
                                                <div
                                                    className="h-full rounded-full bg-primary transition-all"
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                            <span className="w-6 text-muted-foreground">{count}</span>
                                        </div>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    </div>
                ) : null}

                {/* Reviews List */}
                {reviewList.length === 0 && reviews.meta.current_page === 1 ? (
                    <EmptyState
                        icon={Star}
                        title="No reviews yet"
                        description="Once patients review their completed appointments with you, their feedback will appear here."
                    />
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>Patient Feedback</CardTitle>
                            <CardDescription>Reviews from your completed consultations.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            {reviewList.map((review) => (
                                <div key={review.id} className="flex flex-col gap-3 rounded-xl border border-border bg-muted/20 p-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-3">
                                            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary text-sm">
                                                {review.patient?.user?.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{review.patient?.user?.name}</p>
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

                            {/* Backend Pagination */}
                            <Pagination
                                links={reviews.meta.links}
                                meta={{
                                    from: reviews.meta.from,
                                    to: reviews.meta.to,
                                    total: reviews.meta.total,
                                }}
                            />
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}

DoctorReviews.layout = {
    breadcrumbs: [{ title: 'My Reviews', href: doctorReviewsRoute.url() }],
};
