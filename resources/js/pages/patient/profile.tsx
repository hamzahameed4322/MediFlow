import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';

type Props = {
    patient: {
        name: string;
        email: string;
        phone: string;
        gender: string;
        dob: string | null;
        address: string | null;
        allergies: string | null;
        major_diseases: string | null;
    };
};

export default function Profile({ patient }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: patient.name,
        phone: patient.phone || '',
        gender: patient.gender || 'male',
        dob: patient.dob || '',
        address: patient.address || '',
        allergies: patient.allergies || '',
        major_diseases: patient.major_diseases || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/patient/profile', {
            onSuccess: () => {
                toast.success('Medical profile updated successfully!');
            },
            onError: () => {
                toast.error('Failed to update profile. Please verify your inputs.');
            }
        });
    };

    return (
        <>
            <Head title="Medical Profile" />
            <div className="mx-auto max-w-4xl p-6">
                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Medical & Personal Profile</CardTitle>
                            <CardDescription>Keep your contact and medical history up to date for doctors to review.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Personal Info */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-lg border-b pb-2">Personal Information</h3>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            value={patient.email}
                                            disabled
                                            className="bg-muted text-muted-foreground"
                                        />
                                        <p className="text-[10px] text-muted-foreground">Email address cannot be changed.</p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="dob">Date of Birth</Label>
                                        <Input
                                            id="dob"
                                            type="date"
                                            value={data.dob}
                                            onChange={(e) => setData('dob', e.target.value)}
                                        />
                                        <InputError message={errors.dob} />
                                    </div>
                                </div>

                                {/* Contact & Medical Info */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-lg border-b pb-2">Contact & Medical Records</h3>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            required
                                            placeholder="e.g. 123-456-7890"
                                        />
                                        <InputError message={errors.phone} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="gender">Gender</Label>
                                        <Select
                                            value={data.gender}
                                            onValueChange={(val) => setData('gender', val)}
                                        >
                                            <SelectTrigger id="gender">
                                                <SelectValue placeholder="Select gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.gender} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="address">Residential Address</Label>
                                        <Input
                                            id="address"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            placeholder="Your home address"
                                        />
                                        <InputError message={errors.address} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 mt-6">
                                <h3 className="font-semibold text-lg border-b pb-2">Clinical History</h3>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="allergies">Allergies</Label>
                                        <textarea
                                            id="allergies"
                                            value={data.allergies}
                                            onChange={(e) => setData('allergies', e.target.value)}
                                            className="w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                            placeholder="List any food or drug allergies (e.g. Penicillin, Peanuts)"
                                        />
                                        <InputError message={errors.allergies} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="major_diseases">Major Illnesses / Chronic Conditions</Label>
                                        <textarea
                                            id="major_diseases"
                                            value={data.major_diseases}
                                            onChange={(e) => setData('major_diseases', e.target.value)}
                                            className="w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                            placeholder="List any chronic conditions (e.g. Asthma, Hypertension, Diabetes)"
                                        />
                                        <InputError message={errors.major_diseases} />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-3 border-t px-6 py-4">
                            <Button type="submit" disabled={processing}>
                                {processing && <Spinner className="mr-2" />}
                                Save Profile Changes
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </>
    );
}

Profile.layout = {
    breadcrumbs: [
        {
            title: 'Patient Profile',
            href: '/patient/profile',
        },
    ],
};
