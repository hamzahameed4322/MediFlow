import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Activity, HeartPulse } from 'lucide-react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-screen w-full flex-col justify-start overflow-x-hidden bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
            {/* Ambient Background Radial Glow */}
            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[320px] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,hsl(var(--primary)/0.15),transparent)]" />

            {/* Top Navigation Header */}
            <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 pt-4 pb-2 sm:pt-6 sm:pb-3 sm:px-8 shrink-0">
                <Link
                    href={home()}
                    className="flex items-center gap-3 transition-transform hover:scale-[1.01]"
                >
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
                        <HeartPulse className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <span className="text-xl sm:text-2xl font-black tracking-tight text-primary">
                        MediFlow
                    </span>
                </Link>
            </header>

            {/* Main Content Area */}
            <main className="relative z-20 flex-1 flex items-start lg:items-center justify-center px-4 sm:px-6 lg:px-12 pt-2 sm:pt-4 lg:pt-2 pb-8 sm:pb-12 min-h-0">
                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center">
                    {/* Left Brand Showcase Section (Generous Y-Axis Spacing) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="hidden lg:flex lg:col-span-6 flex-col justify-center space-y-8 lg:space-y-10 pr-4 max-w-xl"
                    >
                        {/* Live Pill Badge */}
                        <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary shadow-sm w-fit">
                            <Activity className="h-4 w-4 animate-pulse" />
                            <span>Clinical Care Connected</span>
                        </div>

                        {/* Title & Narrative */}
                        <div className="space-y-6">
                            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.18]">
                                Care, connected.{' '}
                                <span className="text-primary block mt-3">
                                    Smart clinical workflow.
                                </span>
                            </h2>
                            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-lg pt-1">
                                MediFlow unifies patient records, digital prescriptions, and instant scheduling into one effortless workspace.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Form Card Panel */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="w-full lg:col-span-6 flex flex-col items-center justify-center"
                    >
                        {/* Mobile Brand Pill Badge (ABOVE CARD - Image 1) */}
                        <div className="lg:hidden mb-3.5 flex justify-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-primary shadow-sm">
                                <Activity className="h-3.5 w-3.5 animate-pulse" />
                                <span>Clinical Care Connected</span>
                            </div>
                        </div>

                        <div className="w-full max-w-md rounded-2xl sm:rounded-3xl border border-border/80 bg-card p-4 sm:p-5.5 shadow-2xl backdrop-blur-xl transition-all">
                            {/* Streamlined Card Header */}
                            {(title || description) && (
                                <div className="mb-2.5 sm:mb-3 flex flex-col items-center text-center">
                                    {title && (
                                        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
                                            {title}
                                        </h1>
                                    )}
                                    {description && (
                                        <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed text-balance">
                                            {description}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Form Slot */}
                            <div>{children}</div>
                        </div>

                        {/* Mobile Brand Headline (BELOW CARD - Image 2) */}
                        <div className="lg:hidden mt-5 text-center px-2 max-w-xs sm:max-w-sm">
                            <h3 className="text-base font-extrabold tracking-tight text-primary">
                                Smart clinical workflow.
                            </h3>
                            <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                                MediFlow unifies patient records, digital prescriptions, and instant scheduling.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
