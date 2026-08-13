import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

type Props = {
    icon?: LucideIcon;
    title: string;
    description?: string;
    variant?: 'no-results' | 'no-data';
    action?: React.ReactNode;
};

export function EmptyState({ icon: Icon, title, description, variant = 'no-results', action }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-12 text-center"
        >
            {Icon && (
                <div className={`rounded-full p-3 ${variant === 'no-data' ? 'bg-muted/60' : 'bg-muted/40'}`}>
                    <Icon
                        className={`size-8 ${variant === 'no-data' ? 'text-muted-foreground/50' : 'text-muted-foreground/35'}`}
                        strokeWidth={1.5}
                    />
                </div>
            )}
            <div className="max-w-xs">
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
                {description && <p className="mt-1 text-xs text-muted-foreground/65 leading-relaxed">{description}</p>}
            </div>
            {action && <div className="mt-1">{action}</div>}
        </motion.div>
    );
}
