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
    if (links.length <= 3) {
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border px-1 py-4 sm:flex-row">
            {meta && (
                <p className="text-sm text-muted-foreground">
                    Showing <span className="font-medium text-foreground">{meta.from}</span> to{' '}
                    <span className="font-medium text-foreground">{meta.to}</span> of{' '}
                    <span className="font-medium text-foreground">{meta.total}</span> entries
                </p>
            )}
            <nav className="flex flex-wrap items-center justify-center gap-1.5" aria-label="Pagination Navigation">
                {links.map((link, idx) => {
                    const isPrev = link.label.includes('Previous');
                    const isNext = link.label.includes('Next');
                    let label = link.label;

                    if (isPrev) {
                        label = '&larr;';
                    } else if (isNext) {
                        label = '&rarr;';
                    }

                    return (
                        <Link
                            key={idx}
                            href={link.url || '#'}
                            className={`inline-flex h-9 min-w-9 items-center justify-center rounded-xl border border-border px-3 text-sm font-medium transition-all duration-200 ${
                                link.active
                                    ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
                                    : 'bg-background hover:bg-muted text-foreground'
                            } ${!link.url ? 'pointer-events-none opacity-40' : ''} ${
                                !isPrev && !isNext ? 'hidden sm:inline-flex' : ''
                            }`}
                            preserveState
                            preserveScroll
                            dangerouslySetInnerHTML={{ __html: label }}
                        />
                    );
                })}
            </nav>
        </div>
    );
}
