import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register({ roles = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        nomor_induk: '',
        nomor_hp: '',
        password: '',
        role: 1,
        password_confirmation: '',
    });
    function toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="nomor_induk" value="Nomor Induk" />

                    <TextInput
                        id="nomor_induk"
                        type="number"
                        inputMode='numeric'
                        name="nomor_induk"
                        value={data.nomor_induk}
                        className="mt-1 block w-full"
                        autoComplete="nomor_induk"
                        onChange={(e) => setData('nomor_induk', e.target.value)}
                        required
                    />

                    <InputError message={errors.nomor_induk} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="nomor_hp" value="Nomor Hp" />

                    <TextInput
                        id="nomor_hp"
                        type="number"
                        inputMode="numeric"
                        name="nomor_hp"
                        value={data.nomor_hp}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('nomor_hp', e.target.value)}
                        required
                    />

                    <InputError message={errors.nomor_hp} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="role" value="Role" />

                    <select className='select select-bordered' defaultValue={1} onChange={(e) => setData('role', e.target.value)} name="role" id="role">
                        {roles.map((data, i) => (
                            <option value={data.id} key={i}>{toTitleCase(data.name)}</option>
                        ))}
                    </select>

                    <InputError message={errors.role} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
