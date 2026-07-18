import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative min-h-svh overflow-hidden bg-background p-6 md:p-10">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 left-8 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute top-32 right-8 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
            </div>

            <div className="relative mx-auto flex min-h-[calc(100svh-3rem)] w-full max-w-lg items-center justify-center">
                <div className="w-full rounded-[2rem] border border-border/70 bg-card/92 p-6 shadow-sm backdrop-blur xl:p-8">
                    <div className="mb-6 flex items-center justify-center">
                        <Link
                            href={home()}
                            className="inline-flex items-center gap-3 font-medium"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                                <AppLogoIcon className="size-6 text-current" />
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-semibold tracking-[0.28em] text-primary uppercase">
                                    MediFlow
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Clinic operations platform
                                </p>
                            </div>
                        </Link>
                    </div>

                    <div className="space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                            {title}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    </div>

                    <div className="mt-6 rounded-3xl border border-border/70 bg-background/95 p-6 shadow-sm backdrop-blur">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
