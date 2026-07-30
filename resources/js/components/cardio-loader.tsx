import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

// Declare <l-cardio> for TypeScript JSX IntrinsicElements
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'l-cardio': React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & {
                    size?: string | number;
                    stroke?: string | number;
                    speed?: string | number;
                    color?: string;
                },
                HTMLElement
            >;
        }
    }
}

interface CardioLoaderProps {
    size?: number | string;
    stroke?: number | string;
    speed?: number | string;
    color?: string;
    text?: string;
    subtitle?: string;
    className?: string;
    fullScreen?: boolean;
}

/**
 * Reusable Cardio / ECG Pulse Loader Component
 * Leverages the LDRS cardio web component (https://cdn.jsdelivr.net/npm/ldrs/dist/auto/cardio.js)
 */
export function CardioLoader({
    size = 60,
    stroke = 4,
    speed = 1.8,
    color = '#10b981',
    text,
    subtitle,
    className,
    fullScreen = false,
}: CardioLoaderProps) {
    useEffect(() => {
        // Ensure ldrs/cardio is registered in browser environment
        if (typeof window !== 'undefined' && !customElements.get('l-cardio')) {
            const script = document.createElement('script');
            script.type = 'module';
            script.src = 'https://cdn.jsdelivr.net/npm/ldrs/dist/auto/cardio.js';
            document.head.appendChild(script);
        }
    }, []);

    const content = (
        <div className={cn('flex flex-col items-center justify-center gap-4 text-center', className)}>
            <l-cardio size={size} stroke={stroke} speed={speed} color={color} />
            {(text || subtitle) && (
                <div className="flex flex-col gap-1">
                    {text && (
                        <span className="font-bold text-base tracking-tight text-foreground">{text}</span>
                    )}
                    {subtitle && (
                        <span className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground">
                            {subtitle}
                        </span>
                    )}
                </div>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                {content}
            </div>
        );
    }

    return content;
}
