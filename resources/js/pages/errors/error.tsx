import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Home, ShieldAlert, AlertTriangle, Wrench } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';

interface ErrorProps {
    status: number;
}

export default function ErrorPage({ status }: ErrorProps) {
    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Access Denied',
    }[status] || `Error ${status}`;

    const description = {
        503: 'Sorry, we are down for maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers. Please try again later.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'You do not have permission to access this page. Please log in with an authorized account.',
    }[status] || 'An unexpected error has occurred.';

    const Icon = status === 403 ? ShieldAlert : status === 503 ? Wrench : AlertTriangle;

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 overflow-hidden relative">
            <Head title={title} />

            {/* Background Decorations */}
            <div className="absolute inset-0 w-full h-full bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

            <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center space-y-8">
                {/* Logo and Icon Animation */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', duration: 0.6, bounce: 0.5 }}
                    className="flex justify-center"
                >
                    <div className="bg-primary/10 p-5 rounded-full text-primary shadow-sm border border-primary/20 relative">
                        <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                        >
                            <Icon className="w-16 h-16 text-primary" />
                        </motion.div>
                        
                        {/* Pulse effect */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-primary/30"
                            animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                        />
                    </div>
                </motion.div>

                {/* Error Text */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="space-y-4"
                >
                    <h1 className="text-7xl font-extrabold tracking-tighter text-primary drop-shadow-sm">
                        {status}
                    </h1>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">
                        {title}
                    </h2>
                    <p className="text-muted-foreground text-base px-4">
                        {description}
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 w-full px-6 justify-center"
                >
                    <Button asChild size="lg" className="w-full sm:w-auto shadow-md gap-2" variant="default">
                        <Link href="/dashboard">
                            <Home className="w-4 h-4" />
                            Return to Dashboard
                        </Link>
                    </Button>
                </motion.div>
                
                {/* Footer branding */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="pt-10 text-sm font-medium text-muted-foreground/60 flex items-center gap-2"
                >
                    <AppLogoIcon className="w-4 h-4" />
                    &copy; {new Date().getFullYear()} MediFlow. All rights reserved.
                </motion.div>
            </div>
        </div>
    );
}

ErrorPage.layout = (page: React.ReactNode) => page;
