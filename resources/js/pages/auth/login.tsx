import { Form, Head } from '@inertiajs/react';
import { LogIn } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Log in" />

            <Form
                action={store.url()}
                method="post"
                resetOnSuccess={['password']}
                className="flex flex-col gap-4"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-3.5">
                            <div className="grid gap-1">
                                <Label htmlFor="email" className="text-xs font-semibold text-foreground">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                    className="h-10 text-xs sm:text-sm"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-1">
                                <div className="flex items-center">
                                    <Label htmlFor="password" className="text-xs font-semibold text-foreground">Password</Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-xs text-primary hover:text-primary/90 font-medium"
                                            tabIndex={5}
                                        >
                                            Forgot your password?
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    className="h-10 text-xs sm:text-sm"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-2.5 pt-0.5">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember" className="text-xs font-medium cursor-pointer text-muted-foreground">Remember me</Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-1 h-10 w-full text-xs sm:text-sm font-semibold"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing ? (
                                    <Spinner />
                                ) : (
                                    <LogIn className="h-4 w-4" />
                                )}
                                Continue to dashboard
                            </Button>
                        </div>

                        <div className="text-center text-xs sm:text-sm text-muted-foreground pt-0.5">
                            Don't have an account?{' '}
                            <TextLink
                                href={register()}
                                tabIndex={5}
                                className="text-primary hover:text-primary/90 font-semibold"
                            >
                                Sign up
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-primary">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Welcome back',
    description: 'Sign in to manage your clinic dashboard and appointments.',
};
