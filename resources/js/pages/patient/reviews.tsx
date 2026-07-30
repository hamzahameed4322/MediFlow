import { Head, useForm } from '@inertiajs/react';
import { Star, CheckCircle2, Clock, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { EmptyState } from '@/components/empty-state';
import InputError from '@/components/input-error';
import { StarDisplay, StarPicker } from '@/components/star-rating';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import type { Appointment, DoctorReview } from '@/types';

type Props = {
    pendingReviews: Appointment[];
    submittedReviews: DoctorReview[];
};

export default function PatientReviews({ pendingReviews, submittedReviews }: Props) {
    // ─── Submit new review ──────────────────────────────────────────────────
    const [submitTarget, setSubmitTarget] = useState<Appointment | null>(null);
    const submitForm = useForm({ rating: 0, comment: '' });

    const openSubmit = (appt: Appointment) => {
        setSubmitTarget(appt);
        submitForm.reset();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!submitTarget) { return; }
        if (submitForm.data.rating === 0) {
            submitForm.setError('rating', 'Please select a star rating.');
            return;
        }
        submitForm.post(`/patient/appointments/${submitTarget.id}/review`, {
            onSuccess: () => {
                toast.success('Review submitted!');
                setSubmitTarget(null);
            },
            onError: () => toast.error('Failed to submit review.'),
        });
    };

    // ─── Edit existing review ───────────────────────────────────────────────
    const [editTarget, setEditTarget] = useState<DoctorReview | null>(null);
    const editForm = useForm({ rating: 0, comment: '' });

    const openEdit = (review: DoctorReview) => {
        setEditTarget(review);
        editForm.setData({ rating: review.rating, comment: review.comment ?? '' });
    };

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editTarget) { return; }
        editForm.put(`/patient/reviews/${editTarget.id}`, {
            onSuccess: () => {
                toast.success('Review updated!');
                setEditTarget(null);
            },
            onError: () => toast.error('Failed to update review.'),
        });
    };

    return (
        <>
            <Head title="My Reviews" />
            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight">My Reviews</h1>
                    <p className="text-muted-foreground">Rate your experience and help others choose the right doctor.</p>
                </div>

                {/* Pending Reviews Section */}
                <section>
                    <div className="mb-3 flex items-center gap-2">
                        <Clock className="size-4 text-amber-500" />
                        <h2 className="text-base font-semibold">Awaiting Your Review</h2>
                        {pendingReviews.length > 0 && (
                            <Badge className="bg-amber-100 text-amber-700 border-amber-300 text-xs">
                                {pendingReviews.length}
                            </Badge>
                        )}
                    </div>

                    {pendingReviews.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
                            All your completed appointments have been reviewed. ✓
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {pendingReviews.map((appt) => (
                                <Card key={appt.id} className="border-amber-200/60 bg-amber-50/40 dark:bg-amber-900/10">
                                    <CardContent className="flex items-center justify-between gap-4 p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary text-sm">
                                                {appt.doctor?.user?.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm">{appt.doctor?.user?.name}</p>
                                                <p className="text-xs text-muted-foreground">{appt.doctor?.specialization}</p>
                                                <p className="text-xs text-muted-foreground mt-0.5">{appt.appointment_date}</p>
                                            </div>
                                        </div>
                                        <Button size="sm" onClick={() => openSubmit(appt)}>
                                            <Star className="mr-1.5 size-3.5" />
                                            Leave a Review
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </section>

                {/* Submitted Reviews Section */}
                <section>
                    <div className="mb-3 flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-primary" />
                        <h2 className="text-base font-semibold">Your Submitted Reviews</h2>
                        {submittedReviews.length > 0 && (
                            <Badge variant="outline" className="text-xs">
                                {submittedReviews.length}
                            </Badge>
                        )}
                    </div>

                    {submittedReviews.length === 0 ? (
                        <EmptyState icon={Star} title="No reviews yet" description="Your submitted reviews will appear here." />
                    ) : (
                        <div className="flex flex-col gap-3">
                            {submittedReviews.map((review) => (
                                <Card key={review.id} className="transition-shadow hover:shadow-sm">
                                    <CardContent className="p-4">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary text-sm">
                                                        {review.doctor?.user?.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-sm">{review.doctor?.user?.name}</p>
                                                        <p className="text-xs text-muted-foreground">{review.doctor?.specialization}</p>
                                                        <div className="mt-1">
                                                            <StarDisplay rating={review.rating} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-1.5 shrink-0">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="shrink-0"
                                                        onClick={() => openEdit(review)}
                                                    >
                                                        <Edit2 className="mr-1.5 size-3" />
                                                        Edit
                                                    </Button>
                                                    <p className="text-[10px] text-muted-foreground/60">
                                                        {review.appointment?.appointment_date ?? review.created_at.slice(0, 10)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="border-t border-border/40 pt-2.5">
                                                {review.comment ? (
                                                    <p className="text-sm text-foreground/90 italic leading-relaxed">"{review.comment}"</p>
                                                ) : (
                                                    <p className="text-xs text-muted-foreground/60 italic">No comment added.</p>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </section>
            </div>

            {/* Submit Review Dialog */}
            <Dialog open={!!submitTarget} onOpenChange={(open) => { if (!open) { setSubmitTarget(null); } }}>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Review Dr. {submitTarget?.doctor?.user?.name}</DialogTitle>
                        <DialogDescription>
                            {submitTarget?.appointment_date} · {submitTarget?.doctor?.specialization}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Rating <span className="text-destructive">*</span></Label>
                            <StarPicker
                                value={submitForm.data.rating}
                                onChange={(r) => submitForm.setData('rating', r)}
                            />
                            <InputError message={submitForm.errors.rating} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="submit_comment">
                                Comment <span className="text-xs text-muted-foreground">(optional)</span>
                            </Label>
                            <textarea
                                id="submit_comment"
                                value={submitForm.data.comment}
                                onChange={(e) => submitForm.setData('comment', e.target.value)}
                                rows={3}
                                maxLength={500}
                                placeholder="Share your experience (optional)..."
                                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            />
                            <p className="text-right text-[10px] text-muted-foreground">{submitForm.data.comment.length}/500</p>
                            <InputError message={submitForm.errors.comment} />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setSubmitTarget(null)}>Cancel</Button>
                            <Button type="submit" disabled={submitForm.processing || submitForm.data.rating === 0}>
                                {submitForm.processing && <Spinner className="mr-2 size-4" />}
                                Submit Review
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Review Dialog */}
            <Dialog open={!!editTarget} onOpenChange={(open) => { if (!open) { setEditTarget(null); } }}>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Edit Review</DialogTitle>
                        <DialogDescription>
                            Update your review for Dr. {editTarget?.doctor?.user?.name}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEdit} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Rating <span className="text-destructive">*</span></Label>
                            <StarPicker
                                value={editForm.data.rating}
                                onChange={(r) => editForm.setData('rating', r)}
                            />
                            <InputError message={editForm.errors.rating} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit_comment">
                                Comment <span className="text-xs text-muted-foreground">(optional)</span>
                            </Label>
                            <textarea
                                id="edit_comment"
                                value={editForm.data.comment}
                                onChange={(e) => editForm.setData('comment', e.target.value)}
                                rows={3}
                                maxLength={500}
                                placeholder="Share your experience (optional)..."
                                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            />
                            <p className="text-right text-[10px] text-muted-foreground">{editForm.data.comment.length}/500</p>
                            <InputError message={editForm.errors.comment} />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setEditTarget(null)}>Cancel</Button>
                            <Button type="submit" disabled={editForm.processing || editForm.data.rating === 0}>
                                {editForm.processing && <Spinner className="mr-2 size-4" />}
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

PatientReviews.layout = {
    breadcrumbs: [{ title: 'My Reviews', href: '/patient/reviews' }],
};
