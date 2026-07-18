import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Search } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 overflow-hidden relative">
            <Head title="Page Not Found" />

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
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                        >
                            <AppLogoIcon className="w-20 h-20" />
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
                    <h1 className="text-8xl font-extrabold tracking-tighter text-primary drop-shadow-sm">
                        404
                    </h1>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                        Page Not Found
                    </h2>
                    <p className="text-muted-foreground text-lg px-4">
                        Oops! The page you're looking for seems to have vanished or might have never existed.
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
                        <Link href="/">
                            <Home className="w-4 h-4" />
                            Go to Main Page
                        </Link>
                    </Button>
                </motion.div>
                
                {/* Footer branding */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="pt-10 text-sm font-medium text-muted-foreground/60"
                >
                    &copy; {new Date().getFullYear()} MediFlow. All rights reserved.
                </motion.div>
            </div>
        </div>
    );
}

NotFound.layout = (page: React.ReactNode) => page;

