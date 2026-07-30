import { Star } from 'lucide-react';
import { useState } from 'react';

// ─── Read-only star display ─────────────────────────────────────────────────

export function StarDisplay({
    rating,
    max = 5,
    size = 'sm',
}: {
    rating: number;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
}) {
    const sizeClass = size === 'lg' ? 'size-6' : size === 'md' ? 'size-5' : 'size-4';

    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: max }).map((_, i) => (
                <Star
                    key={i}
                    className={`${sizeClass} ${
                        i < rating
                            ? 'fill-primary text-primary'
                            : 'fill-muted text-muted-foreground/30'
                    }`}
                />
            ))}
        </div>
    );
}

// ─── Interactive star picker ────────────────────────────────────────────────

export function StarPicker({
    value,
    onChange,
    max = 5,
}: {
    value: number;
    onChange: (rating: number) => void;
    max?: number;
}) {
    const [hovered, setHovered] = useState(0);

    return (
        <div className="flex items-center gap-1" role="group" aria-label="Star rating">
            {Array.from({ length: max }).map((_, i) => {
                const starValue = i + 1;
                const isActive = starValue <= (hovered || value);

                return (
                    <button
                        key={i}
                        type="button"
                        aria-label={`${starValue} star${starValue > 1 ? 's' : ''}`}
                        onClick={() => onChange(starValue)}
                        onMouseEnter={() => setHovered(starValue)}
                        onMouseLeave={() => setHovered(0)}
                        className="transition-transform hover:scale-110 focus-visible:outline-none"
                    >
                        <Star
                            className={`size-7 transition-colors ${
                                isActive
                                    ? 'fill-primary text-primary'
                                    : 'fill-muted text-muted-foreground/30 hover:fill-primary/60 hover:text-primary/60'
                            }`}
                        />
                    </button>
                );
            })}
            {value > 0 && (
                <span className="ml-2 text-sm font-medium text-muted-foreground">
                    {value} / {max}
                </span>
            )}
        </div>
    );
}
