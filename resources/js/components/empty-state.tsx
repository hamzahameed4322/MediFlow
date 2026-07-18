import type { LucideIcon } from 'lucide-react';

type Props = {
    icon?: LucideIcon;
    title: string;
    description?: string;
};

export function EmptyState({ icon: Icon, title, description }: Props) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-12 text-center">
            {Icon && <Icon className="size-10 text-muted-foreground/40" strokeWidth={1.5} />}
            <div>
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
                {description && <p className="mt-1 text-xs text-muted-foreground/70">{description}</p>}
            </div>
        </div>
    );
}
