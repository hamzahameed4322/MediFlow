import { Link, router, usePage } from '@inertiajs/react';
import {
    BarChart3,
    Calendar,
    Clipboard,
    Clock,
    FileText,
    History,
    LayoutGrid,
    Menu,
    Receipt,
    Star,
    User,
    Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import AppLogo from '@/components/app-logo';
import AppLogoIcon from '@/components/app-logo-icon';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ThemeToggle } from '@/components/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { UserMenuContent } from '@/components/user-menu-content';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { dashboard as genericDashboard } from '@/routes';
import {
    dashboard as adminDashboard,
    users as adminUsers,
    doctors as adminDoctors,
    appointments as adminAppointments,
    consultations as adminConsultations,
    prescriptions as adminPrescriptions,
    bills as adminBills,
    reports as adminReports,
} from '@/routes/admin';
import {
    dashboard as doctorDashboard,
    schedules as doctorSchedules,
    appointments as doctorAppointments,
    bills as doctorBills,
    reviews as doctorReviews,
} from '@/routes/doctor';
import { edit as doctorProfileEdit } from '@/routes/doctor/profile';
import {
    dashboard as patientDashboard,
    doctors as patientDoctors,
    appointments as patientAppointments,
    bills as patientBills,
    medicalHistory as patientHistory,
    reviews as patientReviews,
} from '@/routes/patient';
import { edit as patientProfileEdit } from '@/routes/patient/profile';
import type { BreadcrumbItem, NavItem } from '@/types';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
};

const activeItemStyles = 'bg-muted text-foreground';

export function AppHeader({ breadcrumbs = [] }: Props) {
    const page = usePage();
    const { auth } = page.props;
    const userRole = auth.user?.role;
    const getInitials = useInitials();
    const { isCurrentUrl, whenCurrentUrl } = useCurrentUrl();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        return router.on('navigate', () => setMobileMenuOpen(false));
    }, []);

    const getNavItems = (): NavItem[] => {
        if (userRole === 'admin') {
            return [
                {
                    title: 'Dashboard',
                    href: adminDashboard.url(),
                    icon: LayoutGrid,
                },
                { title: 'Patients', href: adminUsers.url(), icon: Users },
                { title: 'Doctors', href: adminDoctors.url(), icon: User },
                {
                    title: 'Appointments',
                    href: adminAppointments.url(),
                    icon: Clock,
                },
                {
                    title: 'Consultations',
                    href: adminConsultations.url(),
                    icon: FileText,
                },
                {
                    title: 'Prescriptions',
                    href: adminPrescriptions.url(),
                    icon: Clipboard,
                },
                { title: 'Bills', href: adminBills.url(), icon: Receipt },
                { title: 'Reports', href: adminReports.url(), icon: BarChart3 },
            ];
        }

        if (userRole === 'doctor') {
            return [
                {
                    title: 'Dashboard',
                    href: doctorDashboard.url(),
                    icon: LayoutGrid,
                },
                { title: 'Profile', href: doctorProfileEdit.url(), icon: User },
                {
                    title: 'Schedules',
                    href: doctorSchedules.url(),
                    icon: Calendar,
                },
                {
                    title: 'Appointments',
                    href: doctorAppointments.url(),
                    icon: Clock,
                },
                { title: 'Bills Log', href: doctorBills.url(), icon: Receipt },
                { title: 'My Reviews', href: doctorReviews.url(), icon: Star },
            ];
        }

        if (userRole === 'patient') {
            return [
                {
                    title: 'Dashboard',
                    href: patientDashboard.url(),
                    icon: LayoutGrid,
                },
                {
                    title: 'Profile',
                    href: patientProfileEdit.url(),
                    icon: User,
                },
                {
                    title: 'Browse Doctors',
                    href: patientDoctors.url(),
                    icon: Users,
                },
                {
                    title: 'My Appointments',
                    href: patientAppointments.url(),
                    icon: Clock,
                },
                { title: 'My Bills', href: patientBills.url(), icon: Receipt },
                { title: 'Medical History', href: patientHistory.url(), icon: History },
                { title: 'My Reviews', href: patientReviews.url(), icon: Star },
            ];
        }

        return [
            {
                title: 'Dashboard',
                href: genericDashboard(),
                icon: LayoutGrid,
            },
        ];
    };

    const mainNavItems = getNavItems();

    return (
        <>
            <div className="border-b border-sidebar-border/80">
                <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="mr-2 h-[34px] w-[34px]"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetContent
                                side="left"
                                className="flex h-full w-64 flex-col items-stretch justify-between bg-sidebar"
                            >
                                <SheetTitle className="sr-only">
                                    Navigation menu
                                </SheetTitle>
                                <SheetHeader className="flex justify-start text-left">
                                    <AppLogoIcon className="h-6 w-6 text-foreground" />
                                </SheetHeader>
                                <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                                    <div className="flex h-full flex-col justify-between text-sm">
                                        <div className="flex flex-col space-y-3">
                                            {mainNavItems.map((item) => (
                                                <Link
                                                    key={item.title}
                                                    href={item.href}
                                                    className={cn(
                                                        'flex items-center space-x-2 rounded-md px-2 py-1.5 font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                                                        isCurrentUrl(item.href) && 'bg-muted text-foreground',
                                                    )}
                                                >
                                                    {item.icon && (
                                                        <item.icon className="h-4 w-4" />
                                                    )}
                                                    <span>{item.title}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Link
                        href={genericDashboard()}
                        prefetch
                        className="flex items-center space-x-2 shrink-0"
                    >
                        <AppLogo />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="ml-4 hidden h-full items-center lg:flex min-w-0 flex-1">
                        <NavigationMenu className="flex h-full items-stretch">
                            <NavigationMenuList className="flex h-full items-stretch space-x-0.5">
                                {mainNavItems.map((item, index) => (
                                    <NavigationMenuItem
                                        key={index}
                                        className="relative flex h-full items-center"
                                    >
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                whenCurrentUrl(
                                                    item.href,
                                                    activeItemStyles,
                                                ),
                                                'h-9 cursor-pointer px-2.5 text-xs font-medium',
                                            )}
                                        >
                                            {item.title}
                                        </Link>
                                        {isCurrentUrl(item.href) && (
                                            <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-foreground"></div>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="ml-auto flex items-center space-x-2 shrink-0">
                        <ThemeToggle />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="size-10 rounded-full p-1"
                                >
                                    <Avatar className="size-8 overflow-hidden rounded-full">
                                        <AvatarImage
                                            src={auth.user?.avatar}
                                            alt={auth.user?.name}
                                        />
                                        <AvatarFallback className="rounded-lg bg-muted text-muted-foreground">
                                            {getInitials(auth.user?.name ?? '')}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                {auth.user && (
                                    <UserMenuContent user={auth.user} />
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b border-sidebar-border/70">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-muted-foreground md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
