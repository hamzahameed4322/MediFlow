import { Link } from '@inertiajs/react';

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

interface PaginationProps {
    links: PaginationLink[];
    meta?: {
        from: number;
        to: number;
        total: number;
    };
}

export function Pagination({ links, meta }: PaginationProps) {
    if (!links || links.length === 0) {
        return null;
    }

    const showNav = links.length > 3;

    return (
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border px-1 py-4 sm:flex-row">
            {meta && (meta.total !== undefined && meta.total > 0) && (
                <p className="text-sm text-muted-foreground">
                    Showing <span className="font-medium text-foreground">{meta.from ?? 1}</span> to{' '}
                    <span className="font-medium text-foreground">{meta.to ?? meta.total}</span> of{' '}
                    <span className="font-medium text-foreground">{meta.total}</span> entries
                </p>
            )}
            {showNav && (
                <nav className="flex flex-wrap items-center justify-center gap-1.5" aria-label="Pagination Navigation">
                    {links.map((link, idx) => {
                        const isPrev = link.label.includes('Previous');
                        const isNext = link.label.includes('Next');
                        let label = link.label;

                        if (isPrev) {
                            label = '&larr; Prev';
                        } else if (isNext) {
                            label = 'Next &rarr;';
                        }

                        return (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                className={`inline-flex h-9 min-w-9 items-center justify-center rounded-xl border border-border px-3 text-sm font-medium transition-all duration-200 ${
                                    link.active
                                        ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
                                        : 'bg-background hover:bg-muted text-foreground'
                                } ${!link.url ? 'pointer-events-none opacity-40' : ''}`}
                                preserveState
                                preserveScroll
                                dangerouslySetInnerHTML={{ __html: label }}
                            />
                        );
                    })}
                </nav>
            )}
        </div>
    );
}
