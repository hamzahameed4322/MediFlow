

import { Head, Link, usePage } from '@inertiajs/react';
import {
    Calendar,
    ClipboardList,
    Receipt,
    HeartPulse,
    UserPlus,
    LogIn,
    ShieldAlert,
    Activity,
    CheckCircle,
} from 'lucide-react';
// Original toggle kept for reference — see AnimatedThemeToggler note in the nav below.
// import { ThemeToggle } from '@/components/theme-toggle';
import { dashboard, login, register } from '@/routes';
import { FlickeringGrid } from '@/components/ui/flickering-grid';
import { BorderBeam } from '@/components/ui/border-beam';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { Marquee } from '@/components/ui/marquee';
import { Meteors } from '@/components/ui/meteors';
import { TextAnimate } from '@/components/ui/text-animate';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { cn } from '@/lib/utils';

/* ---------------------------------------------------------------------- */
/* Specialties strip data for Marquee                                      */
/* ---------------------------------------------------------------------- */

const specialties = [
    'General Medicine',
    'Cardiology',
    'Dermatology',
    'Pediatrics',
    'Orthopedics',
    'ENT',
    'Gynecology',
    'Neurology',
];


/* Hero background motif — a looping ECG pulse line                        */
/* ---------------------------------------------------------------------- */

function PulseBackground() {
    return (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-20 overflow-hidden opacity-50 dark:opacity-40 sm:h-28">
            <svg
                aria-hidden="true"
                viewBox="0 0 1600 120"
                preserveAspectRatio="none"
                className="h-full w-full"
            >
                <defs>
                    <linearGradient id="pulseFade" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#14b8a6" stopOpacity="0" />
                        <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
                        <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path
                    d="M0 60 H180 L200 60 L215 40 L230 80 L245 60 L260 60 H500
                       L520 60 L535 40 L550 80 L565 60 L580 60 H800
                       L818 60 L833 40 L848 80 L863 60 L878 60 H1120
                       L1140 60 L1155 40 L1170 80 L1185 60 L1200 60 H1600"
                    fill="none"
                    stroke="url(#pulseFade)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="1800"
                    strokeDashoffset="1800"
                    className="mediflow-pulse-draw"
                />
            </svg>

            <style>{`
                .mediflow-pulse-draw {
                    animation: mediflow-pulse-sweep 5s ease-in-out infinite;
                }
                @keyframes mediflow-pulse-sweep {
                    0% { stroke-dashoffset: 1800; }
                    45% { stroke-dashoffset: 0; }
                    100% { stroke-dashoffset: -1800; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .mediflow-pulse-draw { animation: none; stroke-dashoffset: 0; }
                }
            `}</style>
        </div>
    );
}

/* ---------------------------------------------------------------------- */
/* Reusable feature card with Border Beam on hover                         */
/* ---------------------------------------------------------------------- */

function FeatureCard({
    icon,
    iconBg,
    iconColor,
    title,
    description,
}: {
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    title: string;
    description: string;
}) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-border bg-card text-card-foreground p-6 transition-all hover:shadow-md sm:p-8">
            <div
                className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-xl',
                    iconBg,
                    iconColor,
                )}
            >
                {icon}
            </div>
            <h3 className="mt-6 text-lg font-bold sm:text-xl">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
            </p>

            {/* Beam only shows on hover via opacity, always mounted so animation stays in sync */}
            <BorderBeam
                size={80}
                duration={6}
                className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                colorFrom="#14b8a6"
                colorTo="#10b981"
            />
        </div>
    );
}

export interface FeaturedDoctor {
    name: string;
    specialty: string;
    experience: string;
    initials: string;
    color: string;
}

export default function Welcome({
    featuredDoctors = [],
}: {
    featuredDoctors?: FeaturedDoctor[];
}) {
    const { auth } = usePage().props;

    const features = [
        {
            icon: <Calendar className="h-6 w-6" />,
            iconBg: 'bg-primary/10',
            iconColor: 'text-primary',
            title: 'Doctor Discovery',
            description:
                'Patients can search doctors by specialty, qualification, experience, and instantly view active profiles.',
        },
        {
            icon: <CheckCircle className="h-6 w-6" />,
            iconBg: 'bg-primary/10',
            iconColor: 'text-primary',
            title: 'Real-time Slots',
            description:
                'Booking calculations automatically filter out already reserved times based on active doctor schedules.',
        },
        {
            icon: <ClipboardList className="h-6 w-6" />,
            iconBg: 'bg-primary/10',
            iconColor: 'text-primary',
            title: 'Digital Prescriptions',
            description:
                'Doctors quickly record symptoms, make diagnoses, and generate digital prescriptions for patient visits.',
        },
        {
            icon: <Receipt className="h-6 w-6" />,
            iconBg: 'bg-primary/10',
            iconColor: 'text-primary',
            title: 'Billing Records',
            description:
                "System-generated bills automatically track unpaid and paid consultations based on the doctor's set fee.",
        },
        {
            icon: <HeartPulse className="h-6 w-6" />,
            iconBg: 'bg-primary/10',
            iconColor: 'text-primary',
            title: 'Medical History',
            description:
                'Keep a centralized repository of previous clinic visits, symptoms, diagnostic notes, and medication histories.',
        },
        {
            icon: <ShieldAlert className="h-6 w-6" />,
            iconBg: 'bg-primary/10',
            iconColor: 'text-primary',
            title: 'Role Permissions',
            description:
                'Strict role-based authorization filters clinic actions between patients, doctors, and control administrators.',
        },
    ];

    const steps = [
        {
            num: '01',
            title: 'Schedule Online',
            desc: 'Patients register, choose an active doctor, and book an available slot on their preferred date.',
        },
        {
            num: '02',
            title: 'Review & Visit',
            desc: 'Doctors approve or reject the booking request. Patients arrive at the clinic at the scheduled slot.',
        },
        {
            num: '03',
            title: 'Consultation & Prescribe',
            desc: 'Doctors conduct the consultation, write a digital prescription, and the system issues an automatic invoice.',
        },
    ];

    return (
        <>
            <Head title="Clinic Appointments & Prescriptions | MediFlow" />
            <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
                {/* Header Navbar */}
                <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-md">
                    <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20 sm:h-10 sm:w-10">
                                <HeartPulse className="h-5 w-5" />
                            </div>
                            <span className="text-primary text-lg font-bold tracking-tight sm:text-xl">
                                MediFlow
                            </span>
                        </div>

                        {/* Nav Actions */}
                        <nav className="flex items-center gap-1.5 sm:gap-4">
                            {/*
                                Swapped in AnimatedThemeToggler for a nicer circular-reveal
                                dark/light transition. It needs to be wired to your actual
                                theme state — if your existing <ThemeToggle /> reads/writes
                                theme via a context or next-themes-style hook, call that same
                                setter inside AnimatedThemeToggler's onClick instead of the
                                placeholder toggle logic in its own file. If you'd rather not
                                touch that wiring right now, just keep the original
                                <ThemeToggle /> below and skip this swap.
                            */}
                            <AnimatedThemeToggler className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground" />
                            {auth?.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:px-4 sm:text-sm"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground sm:px-4 sm:text-sm"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="inline-flex h-9 items-center justify-center rounded-lg bg-teal-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 sm:px-4 sm:text-sm"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main>
                    <section className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-32">
                        {/* Flickering Grid replaces the dot pattern background */}
                        <FlickeringGrid
                            className={cn(
                                'absolute inset-0 z-0 size-full',
                                '[mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]',
                            )}
                            squareSize={4}
                            gridGap={6}
                            color="#6B7280"
                            maxOpacity={0.15}
                            flickerChance={0.1}
                        />

                        <PulseBackground />

                        <div className="relative z-10 container mx-auto max-w-7xl px-4 text-center sm:px-6">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
                                <Activity className="h-3.5 w-3.5 animate-pulse" />
                                Clinic operations platform
                            </div>

                            <h1 className="mx-auto mt-8 max-w-4xl text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                                Streamlining clinic appointments &{' '}
                                <span className="text-primary">
                                    prescription workflows
                                </span>
                            </h1>

                            <TextAnimate
                                as="p"
                                animation="blurInUp"
                                by="word"
                                delay={0.15}
                                className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
                            >
                                Discover active doctors, view real-time available slots, schedule consultations, and access digital prescriptions securely.
                            </TextAnimate>

                            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <Link href={register()}>
                                    <ShimmerButton
                                        shimmerColor="var(--color-primary)"
                                        background="var(--color-primary)"
                                        className="h-12 w-full px-6 font-semibold sm:w-auto"
                                    >
                                        <span className="flex items-center text-white">
                                            Book an Appointment
                                            <UserPlus className="ml-2 h-5 w-5" />
                                        </span>
                                    </ShimmerButton>
                                </Link>
                                <Link
                                    href={login()}
                                    className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-border bg-background px-6 py-3 font-semibold text-foreground transition-all hover:bg-accent hover:text-accent-foreground active:scale-95 sm:w-auto"
                                >
                                    Sign In <LogIn className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* Specialties Marquee */}
                    <section className="border-y border-border bg-background py-6">
                        <Marquee pauseOnHover className="[--duration:28s]">
                            {specialties.map((s) => (
                                <span
                                    key={s}
                                    className="mx-2 flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground"
                                >
                                    <HeartPulse className="h-3.5 w-3.5 text-primary" />
                                    {s}
                                </span>
                            ))}
                        </Marquee>
                    </section>

                    {/* Meet Our Doctors — teaser only, see data guide at top of file */}
                    {featuredDoctors.length > 0 && (
                        <section className="bg-muted/50 py-16 sm:py-20">
                            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                                <div className="mx-auto max-w-2xl space-y-4 text-center">
                                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                                        Meet Our Doctors
                                    </h2>
                                    <p className="text-sm text-muted-foreground sm:text-base">
                                        A few of our active, verified doctors —
                                        view full profiles and availability after
                                        signing in.
                                    </p>
                                </div>

                                <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                                    {featuredDoctors.map((doc, index) => {
                                        const colors = [
                                            'from-teal-500 to-emerald-400',
                                            'from-teal-600 to-emerald-500',
                                            'from-emerald-600 to-teal-500',
                                        ];
                                        const colorClass = colors[index % colors.length];
                                        return (
                                            <div
                                                key={doc.name}
                                                className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center transition-all hover:shadow-md text-card-foreground"
                                            >
                                                <div
                                                    className={cn(
                                                        'flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-lg font-bold text-white shadow-md',
                                                        colorClass,
                                                    )}
                                                >
                                                    {doc.initials}
                                                </div>
                                                <h3 className="mt-4 text-base font-bold sm:text-lg">
                                                    {doc.name}
                                                </h3>
                                                <p className="mt-1 text-sm text-primary">
                                                    {doc.specialty}
                                                </p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {doc.experience}
                                                </p>
                                                <Link
                                                    href={register()}
                                                    className="mt-5 inline-flex h-9 w-full items-center justify-center rounded-lg border border-primary px-4 text-xs font-semibold text-primary transition-colors hover:bg-primary/10 sm:text-sm"
                                                >
                                                    Check Availability
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Features Grid */}
                    <section className="border-t border-border bg-background py-16 sm:py-20">
                        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                            <div className="mx-auto max-w-3xl space-y-4 text-center">
                                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                                    Core Modules & Features
                                </h2>
                                <p className="text-sm text-muted-foreground sm:text-base">
                                    Designed to automate complete workflows
                                    across patients, doctors, and
                                    administrators.
                                </p>
                            </div>

                            <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
                                {features.map((f) => (
                                    <FeatureCard key={f.title} {...f} />
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* How It Works */}
                    <section className="bg-muted/50 py-16 sm:py-20">
                        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                            <div className="mx-auto max-w-2xl space-y-4 text-center">
                                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                    The clinic flow
                                </h2>
                                <p className="text-sm text-muted-foreground sm:text-base">
                                    From discovery to treatment, complete
                                    step-by-step automation.
                                </p>
                            </div>

                            <div className="mt-12 flex flex-col items-stretch justify-center gap-6 sm:mt-16 sm:gap-8 lg:flex-row">
                                {steps.map((s) => (
                                    <div
                                        key={s.num}
                                        className="relative flex-1 overflow-hidden rounded-2xl border border-border bg-card text-card-foreground p-6 sm:p-8"
                                    >
                                        <span className="text-3xl font-extrabold text-primary sm:text-4xl">
                                            {s.num}
                                        </span>
                                        <h4 className="mt-4 text-base font-bold sm:text-lg">
                                            {s.title}
                                        </h4>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {s.desc}
                                        </p>
                                        <BorderBeam
                                            size={60}
                                            duration={8}
                                            delay={
                                                Number(s.num) * 1.5
                                            }
                                            colorFrom="#14b8a6"
                                            colorTo="#06b6d4"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Final CTA — properly follows the site's light/dark toggle now */}
                    <section className="relative isolate overflow-hidden bg-background py-16 sm:py-24">
                        {/* Meteors are light-colored by default, so in light mode we
                            invert them to render as subtle dark streaks instead of
                            hiding them — visible in both themes without forcing a
                            dark backdrop everywhere. */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60 invert dark:opacity-100 dark:invert-0">
                            <Meteors number={20} />
                        </div>
                        <div className="relative z-10 container mx-auto max-w-3xl px-4 text-center sm:px-6">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                                Ready to simplify your clinic's workflow?
                            </h2>
                            <p className="mt-4 text-sm text-muted-foreground sm:text-base">
                                Join MediFlow and manage appointments,
                                prescriptions, and billing from one secure
                                dashboard.
                            </p>
                            <div className="mt-8 flex justify-center">
                                <Link href={register()}>
                                    <ShimmerButton
                                        shimmerColor="var(--color-primary)"
                                        background="var(--color-primary)"
                                        className="h-12 px-8 font-semibold"
                                    >
                                        <span className="flex items-center text-white">
                                            Get Started Free
                                            <UserPlus className="ml-2 h-5 w-5" />
                                        </span>
                                    </ShimmerButton>
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="border-t border-border bg-background py-10 sm:py-12">
                    <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center text-sm text-muted-foreground sm:flex-row sm:gap-6 sm:px-6 sm:text-left">
                        <div className="flex items-center gap-2">
                            <HeartPulse className="h-5 w-5 text-primary" />
                            <span className="font-semibold text-foreground">
                                MediFlow
                            </span>
                        </div>
                        <p>
                            © {new Date().getFullYear()} MediFlow. All rights
                            reserved. Professional Clinic Systems.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
