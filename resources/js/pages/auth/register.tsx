import { Form, Head } from '@inertiajs/react';
import { UserPlus } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    return (
        <>
            <Head title="Create account" />
            <Form
                action={store.url()}
                method="post"
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-3"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-2.5">
                            <div className="grid gap-1">
                                <Label htmlFor="name" className="text-xs font-semibold text-foreground">Patient name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Full name"
                                    className="h-9 text-xs sm:text-sm"
                                />
                                <InputError
                                    message={errors.name}
                                />
                            </div>

                            <div className="grid gap-1">
                                <Label htmlFor="email" className="text-xs font-semibold text-foreground">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                    className="h-9 text-xs sm:text-sm"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-1">
                                <Label htmlFor="password" className="text-xs font-semibold text-foreground">Password</Label>
                                <PasswordInput
                                    id="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Password"
                                    passwordrules={passwordRules}
                                    className="h-9 text-xs sm:text-sm"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-1">
                                <Label htmlFor="password_confirmation" className="text-xs font-semibold text-foreground">
                                    Confirm password
                                </Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirm password"
                                    passwordrules={passwordRules}
                                    className="h-9 text-xs sm:text-sm"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-1 h-10 w-full text-xs sm:text-sm font-semibold"
                                tabIndex={5}
                                disabled={processing}
                                data-test="register-user-button"
                            >
                                {processing ? (
                                    <Spinner />
                                ) : (
                                    <UserPlus className="h-4 w-4" />
                                )}
                                Create account
                            </Button>
                        </div>

                        <div className="text-center text-xs sm:text-sm text-muted-foreground pt-0.5">
                            Already have an account?{' '}
                            <TextLink
                                href={login()}
                                tabIndex={6}
                                className="text-primary hover:text-primary/90 font-semibold"
                            >
                                Log in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Create account',
    description:
        'Create your MediFlow patient account to book and track visits.',
};
