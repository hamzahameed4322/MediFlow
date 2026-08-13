import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Calendar,
    ClipboardList,
    Receipt,
    HeartPulse,
    UserPlus,
    Activity,
    CheckCircle,
    Star,
    BadgeCheck,
    Quote,
    ShieldCheck,
    Stethoscope,
    Lock,
    FolderSearch,
    ArrowRight,
    Users,
    CalendarCheck,
    PhoneOff,
    FileText,
    Hourglass,
    Pill,
} from 'lucide-react';
import { motion } from 'framer-motion';

import { ThemeToggle } from '@/components/theme-toggle';
import { AnimatedCounter } from '@/components/animated-counter';
import { dashboard, login, register } from '@/routes';
import { BorderBeam } from '@/components/ui/border-beam';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { Marquee } from '@/components/ui/marquee';
import { Meteors } from '@/components/ui/meteors';
import { TextAnimate } from '@/components/ui/text-animate';
import { Particles } from '@/components/ui/particles';
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    MobileNavHeader,
    MobileNavMenu,
    MobileNavToggle,
} from '@/components/ui/resizable-navbar';

import { cn } from '@/lib/utils';

/* ---------------------------------------------------------------------- */
/* Hero background motif — a looping ECG pulse line                        */
/* ---------------------------------------------------------------------- */

function PulseBackground() {
    return (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-16 overflow-hidden opacity-40 sm:h-24">
            <svg
                aria-hidden="true"
                viewBox="0 0 1600 120"
                preserveAspectRatio="none"
                className="h-full w-full"
            >
                <defs>
                    <linearGradient id="pulseFade" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#0284c7" stopOpacity="0" />
                        <stop offset="50%" stopColor="#0ea5e9" stopOpacity="1" />
                        <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
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
                    animation: mediflow-pulse-sweep 6s linear infinite;
                }
                @keyframes mediflow-pulse-sweep {
                    0% { stroke-dashoffset: 1800; }
                    50% { stroke-dashoffset: 0; }
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
/* Hero Side Pure Graphical Floating Objects                              */
/* ---------------------------------------------------------------------- */

function HeroSideGraphicalObjects() {
    return (
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
            {/* Left Top Badge */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [-4, 4, -4] }}
                transition={{
                    opacity: { duration: 0.5, delay: 0.2 },
                    y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute top-2 left-2 sm:top-8 sm:left-6 xl:left-12 flex items-center justify-center rounded-2xl border border-border/80 bg-card/80 p-2 sm:p-3.5 shadow-lg backdrop-blur-md scale-75 sm:scale-90 lg:scale-100 origin-top-left opacity-90 sm:opacity-100"
            >
                <div className="relative flex items-center justify-center">
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <CalendarCheck className="h-4 w-4 sm:h-6 sm:w-6" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                        <CheckCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    </div>
                </div>
            </motion.div>

            {/* Right Top Badge */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [4, -4, 4] }}
                transition={{
                    opacity: { duration: 0.5, delay: 0.3 },
                    y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute top-2 right-2 sm:top-8 sm:right-6 xl:right-12 flex items-center justify-center rounded-2xl border border-border/80 bg-card/80 p-2 sm:p-3.5 shadow-lg backdrop-blur-md scale-75 sm:scale-90 lg:scale-100 origin-top-right opacity-90 sm:opacity-100"
            >
                <div className="relative flex items-center justify-center">
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <ShieldCheck className="h-4 w-4 sm:h-6 sm:w-6" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                        <Stethoscope className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    </div>
                </div>
            </motion.div>

            {/* Left Bottom Badge */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [4, -4, 4] }}
                transition={{
                    opacity: { duration: 0.5, delay: 0.4 },
                    y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute bottom-2 left-2 sm:bottom-12 sm:left-8 xl:left-16 flex items-center justify-center rounded-2xl border border-border/80 bg-card/80 p-2 sm:p-3.5 shadow-lg backdrop-blur-md scale-75 sm:scale-90 lg:scale-100 origin-bottom-left opacity-90 sm:opacity-100"
            >
                <div className="relative flex items-center justify-center">
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <ClipboardList className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                        <Pill className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    </div>
                </div>
            </motion.div>

            {/* Right Bottom Badge */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [-4, 4, -4] }}
                transition={{
                    opacity: { duration: 0.5, delay: 0.5 },
                    y: { duration: 4.8, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute bottom-2 right-2 sm:bottom-12 sm:right-8 xl:right-16 flex items-center justify-center rounded-2xl border border-border/80 bg-card/80 p-2 sm:p-3.5 shadow-lg backdrop-blur-md z-30 scale-75 sm:scale-90 lg:scale-100 origin-bottom-right opacity-90 sm:opacity-100"
            >
                <div className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center">
                    <svg className="h-8 w-8 sm:h-10 sm:w-10 -rotate-90" viewBox="0 0 36 36">
                        <path
                            className="text-muted"
                            strokeWidth="3.5"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                            className="text-primary"
                            strokeDasharray="75, 100"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                    </svg>
                    <HeartPulse className="absolute h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                </div>
            </motion.div>
        </div>
    );
}

/* ---------------------------------------------------------------------- */
/* Reusable Feature Card                                                   */
/* ---------------------------------------------------------------------- */

function FeatureCard({
                         icon,
                         iconBg,
                         iconColor,
                         title,
                         description,
                         className,
                     }: {
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    title: string;
    description: string;
    className?: string;
}) {
    return (
        <div
            className={cn(
                'group relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-card-foreground transition-shadow duration-300 hover:shadow-lg sm:p-8',
                className,
            )}
        >
            <div
                className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110',
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

            <BorderBeam
                size={80}
                duration={6}
                className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                colorFrom="var(--color-primary)"
                colorTo="var(--color-primary)"
            />
        </div>
    );
}

/* ---------------------------------------------------------------------- */
/* Pain Point Card                                                         */
/* ---------------------------------------------------------------------- */

function PainPointCard({
                           icon,
                           title,
                           description,
                           index,
                       }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="group relative flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg sm:p-8"
        >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                {icon}
            </div>
            <h3 className="text-sm font-bold text-foreground sm:text-base">
                {title}
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {description}
            </p>
        </motion.div>
    );
}

/* ---------------------------------------------------------------------- */
/* Section Header Helper                                                   */
/* ---------------------------------------------------------------------- */

function SectionHeader({
                           badge,
                           title,
                           description,
                           className,
                       }: {
    badge?: string;
    title: string;
    description: string;
    className?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className={cn('mx-auto max-w-2xl space-y-3 text-center', className)}
        >
            {badge && (
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary">
                    {badge}
                </span>
            )}
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                {title}
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base">
                {description}
            </p>
        </motion.div>
    );
}

/* ---------------------------------------------------------------------- */
/* Types                                                                   */
/* ---------------------------------------------------------------------- */

export interface FeaturedDoctor {
    name: string;
    specialty: string;
    experience: string;
    initials: string;
    color: string;
}

export interface FeaturedReview {
    id: number;
    patient: string;
    doctor: string;
    specialty: string;
    rating: number;
    comment: string;
    date: string;
}

export interface WelcomeProps {
    featuredDoctors?: FeaturedDoctor[];
    featuredReviews?: FeaturedReview[];
    specializations?: string[];
    averageRating?: number;
    stats?: {
        appointments?: number;
        doctors?: number;
        reviews?: number;
        patients?: number;
        consultations?: number;
    };
}

/* ---------------------------------------------------------------------- */
/* Static Data                                                             */
/* ---------------------------------------------------------------------- */

const painPoints = [
    {
        icon: <PhoneOff className="h-6 w-6" />,
        title: 'Phone Tag',
        description: 'Playing phone tag just to book a 10-minute checkup?',
    },
    {
        icon: <FileText className="h-6 w-6" />,
        title: 'Paper Prescriptions',
        description: 'Handwritten prescriptions that pharmacists struggle to read?',
    },
    {
        icon: <Hourglass className="h-6 w-6" />,
        title: 'Waiting Rooms',
        description: 'Showing up on time, waiting 45 minutes anyway?',
    },
    {
        icon: <FolderSearch className="h-6 w-6" />,
        title: 'Lost Records',
        description: 'Medical history scattered across notebooks and clinics?',
    },
];

const features = [
    {
        id: 'doctor-discovery',
        icon: <Calendar className="h-6 w-6" />,
        iconBg: 'bg-primary/10',
        iconColor: 'text-primary',
        title: 'Doctor Discovery',
        description:
            'Search doctors by specialty, qualification, and experience. View active profiles and book instantly.',
        className: 'sm:col-span-2',
        motionType: 'left',
    },
    {
        id: 'real-time-slots',
        icon: <CheckCircle className="h-6 w-6" />,
        iconBg: 'bg-emerald-500/10',
        iconColor: 'text-emerald-600 dark:text-emerald-400',
        title: 'Real-time Slots',
        description:
            'Booking calculations automatically filter out reserved times based on active doctor schedules.',
        className: '',
        motionType: 'up',
    },
    {
        id: 'digital-prescriptions',
        icon: <ClipboardList className="h-6 w-6" />,
        iconBg: 'bg-blue-500/10',
        iconColor: 'text-blue-600 dark:text-blue-400',
        title: 'Digital Prescriptions',
        description:
            'Doctors record symptoms, diagnoses, and generate digital prescriptions for every visit.',
        className: '',
        motionType: 'up',
    },
    {
        id: 'automated-billing',
        icon: <Receipt className="h-6 w-6" />,
        iconBg: 'bg-amber-500/10',
        iconColor: 'text-amber-600 dark:text-amber-400',
        title: 'Automated Billing',
        description:
            "System-generated bills automatically track unpaid and paid consultations based on the doctor's set fee.",
        className: '',
        motionType: 'up',
    },
    {
        id: 'medical-history',
        icon: <HeartPulse className="h-6 w-6" />,
        iconBg: 'bg-rose-500/10',
        iconColor: 'text-rose-600 dark:text-rose-400',
        title: 'Medical History',
        description:
            'Centralized repository of previous visits, symptoms, diagnostic notes, and medication histories.',
        className: '',
        motionType: 'up',
    },
    {
        id: 'verified-reviews',
        icon: <Star className="h-6 w-6" />,
        iconBg: 'bg-violet-500/10',
        iconColor: 'text-violet-600 dark:text-violet-400',
        title: 'Verified Reviews',
        description:
            'Only patients with completed visits can submit ratings. Building clinic-wide transparency and trust.',
        className: 'sm:col-span-2',
        motionType: 'right',
    },
];

const journeySteps = [
    {
        num: '01',
        title: 'Search & Schedule',
        desc: 'Find a doctor by specialty, check real-time availability, and book your preferred slot online — no phone calls needed.',
        icon: <CalendarCheck className="h-5 w-5" />,
    },
    {
        num: '02',
        title: 'Confirm & Visit',
        desc: 'Your doctor reviews and approves the booking. Arrive at the clinic at your scheduled time — zero waiting room chaos.',
        icon: <CheckCircle className="h-5 w-5" />,
    },
    {
        num: '03',
        title: 'Consult & Prescribe',
        desc: 'Receive your consultation, get a digital prescription instantly, and the system auto-generates your invoice.',
        icon: <ClipboardList className="h-5 w-5" />,
    },
];

const trustPillars = [
    {
        icon: <ShieldCheck className="size-6 text-primary" />,
        title: 'Role-Based Access',
        description:
            'Strict middleware separation between Patient portals, Doctor workspaces, and Admin dashboards.',
    },
    {
        icon: <BadgeCheck className="size-6 text-primary" />,
        title: 'Verified-Only Reviews',
        description:
            'Only patients who completed a clinical consultation can submit ratings and feedback.',
    },
    {
        icon: <Stethoscope className="size-6 text-primary" />,
        title: 'Digital Prescriptions',
        description:
            'Standardized electronic prescriptions linked to consultation histories and dosage schedules.',
    },
    {
        icon: <Lock className="size-6 text-primary" />,
        title: 'Secure Records',
        description:
            'Encrypted appointment histories, diagnosis notes, and billing ledgers for complete privacy.',
    },
];

const defaultReviews: FeaturedReview[] = [
    {
        id: 1,
        patient: 'Ayesha Khan',
        specialty: 'Cardiology Consultation',
        doctor: 'Dr. Sarah Ahmed',
        rating: 5,
        comment:
            'The online booking was effortless, and Dr. Sarah listened to every symptom carefully. Truly a 5-star digital and clinical experience!',
        date: '2 days ago',
    },
    {
        id: 2,
        patient: 'Hamza Tariq',
        specialty: 'General Medicine Checkup',
        doctor: 'Dr. Marcus Vance',
        rating: 5,
        comment:
            'Being able to see verified reviews before booking gave me complete peace of mind. Excellent follow-up and digital prescription access.',
        date: '1 week ago',
    },
    {
        id: 3,
        patient: 'Fatima Noor',
        specialty: 'Pediatric Specialist Visit',
        doctor: 'Dr. Elena Rostova',
        rating: 5,
        comment:
            'Transparent clinic fees and real patient feedback make this platform stand out. The consultation flow is extremely smooth.',
        date: '3 weeks ago',
    },
];

const defaultSpecializations = [
    'General Medicine',
    'Cardiology',
    'Dermatology',
    'Pediatrics',
    'Orthopedics',
    'ENT',
    'Gynecology',
    'Neurology',
];

/* ====================================================================== */
/* Main Component                                                          */
/* ====================================================================== */

export default function Welcome({
                                    featuredDoctors = [],
                                    featuredReviews = [],
                                    specializations,
                                    averageRating,
                                    stats,
                                }: WelcomeProps) {
    const { auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


    const displaySpecializations =
        specializations && specializations.length > 0
            ? specializations
            : defaultSpecializations;

    const displayReviews =
        featuredReviews.length > 0 ? featuredReviews : defaultReviews;

    const navItems = [
        { name: 'Why MediFlow', link: '#why-mediflow' },
        ...(featuredDoctors.length > 0
            ? [{ name: 'Doctors', link: '#doctors' }]
            : []),
        { name: 'Features', link: '#features' },
        { name: 'How It Works', link: '#how-it-works' },
        { name: 'Reviews', link: '#reviews' },
        { name: 'Trust & Security', link: '#trust' },
    ];

    return (
        <>
            <Head title="MediFlow | Smart Clinic Operations & Digital Care Platform" />
            <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
                {/* Navbar */}
                <Navbar className="sticky top-0 z-50 w-full">
                    <NavBody>
                        <div className="flex shrink-0 items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20 sm:h-10 sm:w-10">
                                <HeartPulse className="h-5 w-5" />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-primary whitespace-nowrap sm:text-xl">
                                MediFlow
                            </span>
                        </div>

                        <NavItems items={navItems} />

                        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                            <ThemeToggle className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground" />
                            {auth?.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 whitespace-nowrap sm:px-4 sm:text-sm"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground whitespace-nowrap sm:px-4 sm:text-sm"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 whitespace-nowrap sm:px-4 sm:text-sm"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </NavBody>

                    <MobileNav>
                        <MobileNavHeader>
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
                                    <HeartPulse className="h-4 w-4" />
                                </div>
                                <span className="text-base font-bold tracking-tight text-primary">
                                    MediFlow
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <ThemeToggle className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground" />
                                <MobileNavToggle
                                    isOpen={mobileMenuOpen}
                                    onClick={() =>
                                        setMobileMenuOpen(!mobileMenuOpen)
                                    }
                                />
                            </div>
                        </MobileNavHeader>

                        <MobileNavMenu
                            isOpen={mobileMenuOpen}
                            onClose={() => setMobileMenuOpen(false)}
                            className="mt-2 border border-border/80 bg-background/95 backdrop-blur-md"
                        >
                            <div className="flex w-full flex-col gap-3 py-2">
                                {navItems.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.link}
                                        onClick={() =>
                                            setMobileMenuOpen(false)
                                        }
                                        className="rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-primary"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                                <div className="my-1 border-t border-border" />
                                {auth?.user ? (
                                    <Link
                                        href={dashboard()}
                                        onClick={() =>
                                            setMobileMenuOpen(false)
                                        }
                                        className="inline-flex h-9 w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <Link
                                            href={login()}
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                            className="inline-flex h-9 w-full items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={register()}
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                            className="inline-flex h-9 w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </MobileNavMenu>
                    </MobileNav>
                </Navbar>

                <main>
                    {/* HERO WITH PARTICLES */}
                    <section className="relative isolate overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24">
                        <Particles
                            className="absolute inset-0 z-0"
                            quantity={80}
                            ease={80}
                            color="#0d9488"
                            refresh
                        />
                        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.15),transparent)]" />
                        <PulseBackground />
                        <HeroSideGraphicalObjects />

                        <div className="relative z-10 container mx-auto max-w-7xl px-4 text-center sm:px-6">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary shadow-sm"
                            >
                                <Activity className="h-3.5 w-3.5 animate-pulse" />
                                Trusted by{' '}
                                <AnimatedCounter
                                    end={stats?.patients ?? 5}
                                    suffix="+"
                                    duration={2}
                                    className="font-bold"
                                />{' '}
                                patients
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="mx-auto mt-4 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
                            >
                                Stop losing patients to{' '}
                                <span className="text-primary">
                                    phone tag & paper chaos
                                </span>
                            </motion.h1>

                            <TextAnimate
                                as="p"
                                animation="blurInUp"
                                by="word"
                                delay={0.15}
                                className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
                            >
                                MediFlow automates your clinic's entire workflow
                                — from online booking to digital prescriptions —
                                so you can focus on what matters: patient care.
                            </TextAnimate>

                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="mt-8 flex justify-center"
                            >
                                <Link href={register()}>
                                    <ShimmerButton
                                        shimmerColor="var(--color-primary)"
                                        background="var(--color-primary)"
                                        borderRadius="9999px"
                                        className="h-12 px-8 font-semibold shadow-md transition-all duration-300 hover:shadow-lg"
                                    >
                                        <span className="flex items-center text-white font-semibold text-base">
                                            Book an Appointment
                                            <UserPlus className="ml-2 h-5 w-5" />
                                        </span>
                                    </ShimmerButton>
                                </Link>
                            </motion.div>
                        </div>
                    </section>

                    {/* WHY MEDIFLOW / PAIN POINTS SECTION */}
                    <section id="why-mediflow" className="scroll-mt-24 border-y border-border bg-muted/30 py-12 sm:py-16">
                        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                            <SectionHeader
                                badge="Sound familiar?"
                                title="The daily clinic struggle"
                                description="These frustrations shouldn't be part of modern healthcare. Yet they happen everywhere, every day."
                            />

                            <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                                {painPoints.map((point, index) => (
                                    <PainPointCard
                                        key={point.title}
                                        icon={point.icon}
                                        title={point.title}
                                        description={point.description}
                                        index={index}
                                    />
                                ))}
                            </div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="mt-8 text-center text-sm font-medium text-muted-foreground sm:mt-10 sm:text-base"
                            >
                                There's a better way.{' '}
                                <span className="font-bold text-primary">
                                    MediFlow eliminates all of this.
                                </span>
                            </motion.p>
                        </div>
                    </section>

                    {/* SPECIALTIES MARQUEE */}
                    <section className="border-b border-border bg-background py-6">
                        <Marquee pauseOnHover className="[--duration:28s]">
                            {displaySpecializations.map((s) => (
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

                    {/* LIVE STATS */}
                    {stats && (
                        <section className="bg-background py-12 sm:py-16">
                            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                                    {[
                                        {
                                            label: 'Appointments Booked',
                                            value: stats.appointments ?? 0,
                                            icon: (
                                                <Calendar className="h-5 w-5 text-primary" />
                                            ),
                                            suffix: '+',
                                            motionType: 'left',
                                        },
                                        {
                                            label: 'Active Doctors',
                                            value: stats.doctors ?? 0,
                                            icon: (
                                                <Stethoscope className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                            ),
                                            suffix: '+',
                                            motionType: 'up',
                                        },
                                        {
                                            label: 'Verified Reviews',
                                            value: stats.reviews ?? 0,
                                            icon: (
                                                <Star className="h-5 w-5 text-amber-500" />
                                            ),
                                            suffix: '+',
                                            motionType: 'up',
                                        },
                                        {
                                            label: 'Registered Patients',
                                            value: stats.patients ?? 0,
                                            icon: (
                                                <Users className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                                            ),
                                            suffix: '+',
                                            motionType: 'right',
                                        },
                                    ].map((stat, index) => {
                                        const initialAnim =
                                            stat.motionType === 'left'
                                                ? { opacity: 0, x: -30 }
                                                : stat.motionType === 'right'
                                                    ? { opacity: 0, x: 30 }
                                                    : { opacity: 0, y: 20 };

                                        return (
                                            <motion.div
                                                key={stat.label}
                                                initial={initialAnim}
                                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                                viewport={{ once: true, amount: 0.15, margin: '0px 0px -40px 0px' }}
                                                transition={{
                                                    duration: 0.6,
                                                    delay: index * 0.08,
                                                    ease: [0.16, 1, 0.3, 1],
                                                }}
                                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                                className="transform-gpu relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-center sm:p-8 hover:shadow-md transition-shadow duration-300"
                                                style={{ willChange: 'transform, opacity' }}
                                            >
                                                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                                                    {stat.icon}
                                                </div>
                                                <div className="text-3xl font-extrabold text-foreground sm:text-4xl">
                                                    <AnimatedCounter
                                                        end={stat.value}
                                                        suffix={stat.suffix}
                                                        duration={2.5}
                                                    />
                                                </div>
                                                <p className="mt-1 text-sm font-medium text-muted-foreground">
                                                    {stat.label}
                                                </p>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* DOCTORS */}
                    {featuredDoctors.length > 0 && (
                        <section
                            id="doctors"
                            className="scroll-mt-24 bg-muted/50 py-12 sm:py-16"
                        >
                            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                                <SectionHeader
                                    badge="Our Team"
                                    title="Meet Our Doctors"
                                    description="A few of our active, verified doctors — view full profiles and availability after signing in."
                                />

                                <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
                                    {featuredDoctors.map((doc, index) => {
                                        const initialAnim =
                                            index === 0
                                                ? { opacity: 0, x: -30 }
                                                : index === 1
                                                    ? { opacity: 0, y: 20 }
                                                    : { opacity: 0, x: 30 };

                                        return (
                                            <motion.div
                                                key={doc.name}
                                                initial={initialAnim}
                                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                                viewport={{ once: true, amount: 0.15, margin: '0px 0px -40px 0px' }}
                                                transition={{
                                                    duration: 0.6,
                                                    delay: index * 0.1,
                                                    ease: [0.16, 1, 0.3, 1],
                                                }}
                                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                                className="transform-gpu flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center text-card-foreground transition-shadow duration-300 hover:border-primary/40 hover:shadow-lg"
                                                style={{ willChange: 'transform, opacity' }}
                                            >
                                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground shadow-md">
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
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* BENTO GRID FEATURES */}
                    <section
                        id="features"
                        className="scroll-mt-24 border-t border-border bg-background py-12 sm:py-16"
                    >
                        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                            <SectionHeader
                                badge="Platform Capabilities"
                                title="Everything your clinic needs"
                                description="Designed to automate complete workflows across patients, doctors, and administrators."
                            />

                            <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                                {features.map((f, index) => {
                                    const initialAnim =
                                        f.motionType === 'left'
                                            ? { opacity: 0, x: -30 }
                                            : f.motionType === 'right'
                                                ? { opacity: 0, x: 30 }
                                                : { opacity: 0, y: 20 };

                                    return (
                                        <motion.div
                                            key={f.title}
                                            initial={initialAnim}
                                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                                            viewport={{ once: true, margin: '-20px' }}
                                            transition={{
                                                duration: 0.5,
                                                delay: index * 0.06,
                                                ease: [0.25, 0.1, 0.25, 1.0],
                                            }}
                                            className={f.className}
                                        >
                                            <FeatureCard
                                                {...f}
                                                className="h-full"
                                            />
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* HOW IT WORKS */}
                    <section
                        id="how-it-works"
                        className="scroll-mt-24 bg-muted/50 py-12 sm:py-16"
                    >
                        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                            <SectionHeader
                                badge="How It Works"
                                title="From search to prescription in 3 steps"
                                description="A seamless digital journey that replaces phone calls, paper forms, and waiting room chaos."
                            />

                            <div className="relative mt-10 sm:mt-12">
                                <div className="absolute top-12 right-12 left-12 hidden h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 lg:block" />

                                <div className="flex flex-col items-stretch justify-center gap-6 sm:gap-8 lg:flex-row">
                                    {journeySteps.map((step, index) => {
                                        const initialAnim =
                                            index === 0
                                                ? { opacity: 0, x: -30 }
                                                : index === 1
                                                    ? { opacity: 0, y: 20 }
                                                    : { opacity: 0, x: 30 };

                                        return (
                                            <motion.div
                                                key={step.num}
                                                initial={initialAnim}
                                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                                viewport={{ once: true, amount: 0.15, margin: '0px 0px -40px 0px' }}
                                                transition={{
                                                    duration: 0.6,
                                                    delay: index * 0.1,
                                                    ease: [0.16, 1, 0.3, 1],
                                                }}
                                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                                className="transform-gpu relative flex-1 overflow-hidden rounded-2xl border border-border bg-card p-6 text-card-foreground hover:shadow-md transition-shadow duration-300 sm:p-8"
                                                style={{ willChange: 'transform, opacity' }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-3xl font-extrabold text-primary sm:text-4xl">
                                                        {step.num}
                                                    </span>
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                        {step.icon}
                                                    </div>
                                                </div>
                                                <h4 className="mt-4 text-base font-bold sm:text-lg">
                                                    {step.title}
                                                </h4>
                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    {step.desc}
                                                </p>
                                                <BorderBeam
                                                    size={60}
                                                    duration={8}
                                                    delay={index * 1.5}
                                                    colorFrom="var(--color-primary)"
                                                    colorTo="var(--color-primary)"
                                                />
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* REVIEWS */}
                    <section
                        id="reviews"
                        className="scroll-mt-24 border-t border-border bg-background py-12 sm:py-16"
                    >
                        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                            <SectionHeader
                                badge="Patient Feedback"
                                title="What our patients say"
                                description={
                                    averageRating && averageRating > 0
                                        ? `${averageRating} average rating from verified consultations. Every review reflects a completed clinical visit.`
                                        : 'Authentic feedback from verified patients after their consultation. Every review reflects a completed clinical visit.'
                                }
                            />

                            <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
                                {displayReviews.map((rev, index) => {
                                    const initialAnim =
                                        index === 0
                                            ? { opacity: 0, x: -30 }
                                            : index === 1
                                                ? { opacity: 0, y: 20 }
                                                : { opacity: 0, x: 30 };

                                    return (
                                        <motion.div
                                            key={rev.id || rev.patient}
                                            initial={initialAnim}
                                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                                            viewport={{ once: true, margin: '-20px' }}
                                            transition={{
                                                duration: 0.5,
                                                delay: index * 0.1,
                                                ease: [0.25, 0.1, 0.25, 1.0],
                                            }}
                                            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 text-card-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8"
                                        >
                                            <div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1">
                                                        {Array.from({
                                                            length: 5,
                                                        }).map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={cn(
                                                                    'size-4',
                                                                    i < rev.rating
                                                                        ? 'fill-primary text-primary'
                                                                        : 'fill-muted text-muted-foreground/30',
                                                                )}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                                                        <BadgeCheck className="size-3.5" />
                                                        Verified Visit
                                                    </span>
                                                </div>

                                                <Quote className="mt-5 size-6 text-primary/30" />

                                                <p className="mt-2 text-sm font-normal leading-relaxed text-muted-foreground sm:text-base">
                                                    &ldquo;{rev.comment}&rdquo;
                                                </p>
                                            </div>

                                            <div className="mt-8 border-t border-border/60 pt-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-semibold text-primary">
                                                            {rev.patient}
                                                        </p>
                                                        <p className="mt-0.5 text-xs text-muted-foreground">
                                                            Treated by{' '}
                                                            {rev.doctor} •{' '}
                                                            {rev.specialty}
                                                        </p>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">
                                                        {rev.date}
                                                    </span>
                                                </div>
                                            </div>

                                            <BorderBeam
                                                size={80}
                                                duration={6}
                                                className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                                colorFrom="var(--color-primary)"
                                                colorTo="var(--color-primary)"
                                            />
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* TRUST & SECURITY */}
                    <section
                        id="trust"
                        className="scroll-mt-24 border-t border-border bg-muted/30 py-16 sm:py-20"
                    >
                        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                            <SectionHeader
                                badge="Healthcare Integrity"
                                title="Engineered for clinical trust"
                                description="MediFlow prioritizes accuracy, privacy, and accountability across every consultation."
                            />

                            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {trustPillars.map((tp, index) => {
                                    const initialAnim =
                                        index === 0
                                            ? { opacity: 0, x: -30 }
                                            : index === 3
                                                ? { opacity: 0, x: 30 }
                                                : { opacity: 0, y: 20 };

                                    return (
                                        <motion.div
                                            key={tp.title}
                                            initial={initialAnim}
                                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                                            viewport={{ once: true, margin: '-20px' }}
                                            transition={{
                                                duration: 0.5,
                                                delay: index * 0.08,
                                                ease: [0.25, 0.1, 0.25, 1.0],
                                            }}
                                            className="flex flex-col rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
                                        >
                                            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                                                {tp.icon}
                                            </div>
                                            <h3 className="mt-5 text-base font-bold text-foreground">
                                                {tp.title}
                                            </h3>
                                            <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                                {tp.description}
                                            </p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* FINAL CTA */}
                    <section className="relative isolate overflow-hidden bg-background py-16 sm:py-20">
                        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60 invert dark:opacity-100 dark:invert-0">
                            <Meteors number={20} />
                        </div>
                        <div className="relative z-10 container mx-auto max-w-3xl px-4 sm:px-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                className="flex flex-col items-center rounded-3xl border border-border bg-card p-8 text-center sm:p-12 shadow-xl"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
                                    <UserPlus className="h-7 w-7" />
                                </div>
                                <h3 className="mt-6 text-2xl font-extrabold text-foreground sm:text-3xl">
                                    Ready to Experience Effortless Care?
                                </h3>
                                <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
                                    Your next appointment is just a click away.
                                    Book online, receive digital prescriptions,
                                    and manage your entire medical history from
                                    one simple portal.
                                </p>
                                <Link href={register()} className="mt-8">
                                    <ShimmerButton
                                        shimmerColor="var(--color-primary)"
                                        background="var(--color-primary)"
                                        className="h-12 px-8 font-semibold shadow-lg"
                                    >
                                        <span className="flex items-center text-white text-base">
                                            Book an Appointment Now
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </span>
                                    </ShimmerButton>
                                </Link>
                            </motion.div>
                        </div>
                    </section>
                </main>

                {/* CLEAN FOOTER */}
                <footer className="border-t border-border bg-card/40 py-8">
                    <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-xs text-muted-foreground sm:flex-row sm:gap-6 sm:px-6">
                        <div className="flex items-center gap-2">
                            <HeartPulse className="h-5 w-5 text-primary" />
                            <span className="text-sm font-bold text-foreground">
                                MediFlow
                            </span>
                        </div>
                        <p>© {new Date().getFullYear()} MediFlow Systems. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <a href="#why-mediflow" className="hover:text-foreground transition-colors">
                                Why MediFlow
                            </a>
                            <a href="#features" className="hover:text-foreground transition-colors">
                                Features
                            </a>
                            <a href="#how-it-works" className="hover:text-foreground transition-colors">
                                Workflow
                            </a>
                            <a href="#trust" className="hover:text-foreground transition-colors">
                                Security
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
