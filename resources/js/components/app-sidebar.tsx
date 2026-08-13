import { Link, router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import {
    LayoutGrid,
    User,
    Users,
    Calendar,
    Clock,
    FileText,
    Clipboard,
    Receipt,
    BarChart3,
    History,
    Star,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
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
import type { NavItem } from '@/types';

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const { auth } = usePage().props;
    const userRole = auth.user?.role;
    const { isMobile, setOpenMobile } = useSidebar();

    useEffect(() => {
        if (isMobile) {
            return router.on('navigate', () => setOpenMobile(false));
        }
    }, [isMobile, setOpenMobile]);

    // Build main nav items dynamically based on user role
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

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link
                                href={genericDashboard()}
                                prefetch
                            >
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={getNavItems()} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
