import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedAdmin from "@/Layouts/AuthenticatedAdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function AdminUser({
    auth,
    errors: systemErrors,
    users,
    roles = [],
}) {
    const mahasiswa = useForm({
        name: "",
        email: "",
        nomor_induk: "",
        nomor_hp: "",
        password: "",
        role: 1,
        password_confirmation: "",
    });
    const pic = useForm({
        name: "",
        email: "",
        nomor_induk: "",
        nomor_hp: "",
        password: "",
        role: 2,
        password_confirmation: "",
    });
    useEffect(() => {
        return () => {
            mahasiswa.reset("password", "password_confirmation");
            pic.reset("password", "password_confirmation");
        };
    }, []);
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
    const mahasiswaSubmit = (e) => {
        e.preventDefault();

        mahasiswa.post(route("addUser"), {
            onSuccess: () => {
                document.getElementById("close_mahasiswa_modal").submit();
                mahasiswa.reset();
            },
        });
    };
    const picSubmit = (e) => {
        e.preventDefault();

        pic.post(route("addUser"), {
            onSuccess: () => {
                document.getElementById("close_pic_modal").submit();
                pic.reset();
            },
        });
    };
    let no = 1;
    return (
        <AuthenticatedAdmin
            user={auth.user}
            errors={systemErrors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    User Table
                </h2>
            }
        >
            <Head title="User" />
            <div className="flex gap-6">
                <button
                    onClick={() =>
                        document.getElementById("add_mahasiswa").showModal()
                    }
                    className="btn btn-accent"
                >
                    Tambah Mahasiswa
                </button>
                <dialog id="add_mahasiswa" className="modal">
                    <div className="modal-box">
                        <form id="close_mahasiswa_modal" method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                            </button>
                        </form>
                        <h3 className="font-bold text-lg">Tambah Mahasiswa</h3>
                        <form onSubmit={mahasiswaSubmit}>
                            <div>
                                <InputLabel htmlFor="name" value="Nama" />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={mahasiswa.data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        mahasiswa.setData(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <InputError
                                    message={mahasiswa.errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={mahasiswa.data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        mahasiswa.setData(
                                            "email",
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <InputError
                                    message={mahasiswa.errors.email}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="nomor_induk"
                                    value="Nomor Induk"
                                />

                                <TextInput
                                    id="nomor_induk"
                                    type="number"
                                    inputMode="numeric"
                                    name="nomor_induk"
                                    value={mahasiswa.data.nomor_induk}
                                    className="mt-1 block w-full"
                                    autoComplete="nomor_induk"
                                    onChange={(e) =>
                                        mahasiswa.setData(
                                            "nomor_induk",
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <InputError
                                    message={mahasiswa.errors.nomor_induk}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="nomor_hp"
                                    value="Nomor Hp"
                                />

                                <TextInput
                                    id="nomor_hp"
                                    type="number"
                                    inputMode="numeric"
                                    name="nomor_hp"
                                    value={mahasiswa.data.nomor_hp}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        mahasiswa.setData(
                                            "nomor_hp",
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <InputError
                                    message={mahasiswa.errors.nomor_hp}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={mahasiswa.data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        mahasiswa.setData(
                                            "password",
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <InputError
                                    message={mahasiswa.errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                />

                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={mahasiswa.data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        mahasiswa.setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <InputError
                                    message={
                                        mahasiswa.errors.password_confirmation
                                    }
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton
                                    className="ms-4"
                                    disabled={mahasiswa.processing}
                                >
                                    Tambah
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </dialog>
                <button
                    onClick={() =>
                        document.getElementById("add_pic").showModal()
                    }
                    className="btn btn-accent"
                >
                    Tambah PIC
                </button>
                <dialog id="add_pic" className="modal">
                    <div className="modal-box">
                        <form id="close_pic_modal" method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                            </button>
                        </form>
                        <h3 className="font-bold text-lg">Tambah PIC</h3>
                        <form onSubmit={picSubmit}>
                            <div>
                                <InputLabel htmlFor="name" value="Nama" />

                                <TextInput
                                    name="name"
                                    value={pic.data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        pic.setData("name", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={pic.errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    type="email"
                                    name="email"
                                    value={pic.data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        pic.setData("email", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={pic.errors.email}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="nomor_induk"
                                    value="Nomor Induk"
                                />

                                <TextInput
                                    type="number"
                                    inputMode="numeric"
                                    name="nomor_induk"
                                    value={pic.data.nomor_induk}
                                    className="mt-1 block w-full"
                                    autoComplete="nomor_induk"
                                    onChange={(e) =>
                                        pic.setData(
                                            "nomor_induk",
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <InputError
                                    message={pic.errors.nomor_induk}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="nomor_hp"
                                    value="Nomor Hp"
                                />

                                <TextInput
                                    type="number"
                                    inputMode="numeric"
                                    name="nomor_hp"
                                    value={pic.data.nomor_hp}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        pic.setData("nomor_hp", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={pic.errors.nomor_hp}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="role" value="Role" />

                                <select
                                    className="select select-bordered"
                                    defaultValue={2}
                                    onChange={(e) =>
                                        pic.setData("role", e.target.value)
                                    }
                                    name="role"
                                >
                                    {roles.map((data, i) => {
                                        if (data.id != 1 && data.id != 5) {
                                            return(
                                                <option value={data.id} key={i}>
                                                {toTitleCase(data.name)}
                                            </option>
                                            )
                                        }
                                    })}
                                </select>

                                <InputError
                                    message={pic.errors.role}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />

                                <TextInput
                                    type="password"
                                    name="password"
                                    value={pic.data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        pic.setData("password", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={pic.errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                />

                                <TextInput
                                    type="password"
                                    name="password_confirmation"
                                    value={pic.data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        pic.setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <InputError
                                    message={pic.errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton
                                    className="ms-4"
                                    disabled={pic.processing}
                                >
                                    Tambah
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <td>No.</td>
                        <td>Nama</td>
                        <td>NIM</td>
                        <td>Email</td>
                        <td>Bagian</td>
                    </tr>
                </thead>
                <tbody>
                    {users.data.map((data, i) => (
                        <tr key={i}>
                            <td>{no++}</td>
                            <td>{data.name}</td>
                            <td>{data.nomor_induk}</td>
                            <td>{data.email}</td>
                            <td>{toTitleCase(data.role.name)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AuthenticatedAdmin>
    );
}
