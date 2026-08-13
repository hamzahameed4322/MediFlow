import { useEffect, useRef } from 'react';
import { useCountUp } from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    className?: string;
}

export function AnimatedCounter({
    end,
    duration = 2.5,
    suffix = '',
    prefix = '',
    className = '',
}: AnimatedCounterProps) {
    const countUpRef = useRef<HTMLSpanElement>(null);
    const { ref: inViewRef, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    const { start } = useCountUp({
        ref: countUpRef as any,
        start: 0,
        end,
        duration,
        suffix,
        prefix,
        separator: ',',
        startOnMount: false,
    });

    useEffect(() => {
        if (inView) {
            start();
        }
    }, [inView, start]);

    return (
        <span
            ref={(node) => {
                (
                    countUpRef as React.MutableRefObject<HTMLSpanElement | null>
                ).current = node;
                inViewRef(node);
            }}
            className={className}
        />
    );
}
