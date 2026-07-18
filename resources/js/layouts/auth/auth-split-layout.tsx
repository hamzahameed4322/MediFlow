import { Link } from '@inertiajs/react';
import { HeartPulse } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { FlickeringGrid } from '@/components/ui/flickering-grid';
import { home } from '@/routes';
import { cn } from '@/lib/utils';
import type { AuthLayoutProps } from '@/types';


export default function AuthSplitLayout({
                                            children,
                                            title,
                                            description,
                                        }: AuthLayoutProps) {
    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            {/* Left brand panel — uses theme variables (muted, primary, etc.) */}
            <div className="relative hidden h-full flex-col justify-between overflow-hidden bg-muted p-10 text-foreground lg:flex">

                <FlickeringGrid
                    className={cn(
                        'absolute inset-0 z-0 size-full',
                        '[mask-image:radial-gradient(ellipse_70%_60%_at_30%_20%,#000_60%,transparent_100%)]',
                    )}
                    squareSize={4}
                    gridGap={6}
                    color="#14b8a6"
                    maxOpacity={0.2}
                    flickerChance={0.1}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary),transparent_55%)] opacity-15 dark:opacity-25" />

                <Link
                    href={home()}
                    className="relative z-20 flex items-center text-lg font-medium"
                >
                    <AppLogo />
                </Link>

                <div className="relative z-20 max-w-md space-y-4">
                    <p className="flex items-center gap-2 text-sm font-semibold tracking-[0.24em] text-primary uppercase">
                        <HeartPulse className="h-4 w-4" />
                        MediFlow
                    </p>
                    <p className="text-3xl font-semibold tracking-tight text-foreground">
                        Care, connected.
                    </p>
                    <p className="text-base text-muted-foreground">
                        A focused workspace for appointments, patient records,
                        and everyday clinical care.
                    </p>
                </div>
            </div>

            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Link
                        href={home()}
                        className="relative z-20 flex items-center justify-center lg:hidden"
                    >
                        <AppLogo />
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl font-medium text-foreground">{title}</h1>
                        <p className="text-sm text-balance text-muted-foreground">
                            {description}
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
