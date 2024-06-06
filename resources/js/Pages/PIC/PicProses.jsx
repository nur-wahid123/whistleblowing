import InputError from "@/Components/InputError";
import AuthenticatedPic from "@/Layouts/AuthenticatedPicLayout";
import { Head, useForm, usePage,Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const PicProses = ({ auth, errors: errorSystem, data }) => {
    const [details, setDetails] = useState(false);
    const page = usePage();
    const {
        reset,
        data: formData,
        setData,
        errors,
        post,
    } = useForm({
        catatan: "",
        image: "",
        id: 0,
    });
    useEffect(() => {
        setData({ ...formData, id: data.id });
        return () => {};
    }, []);

    console.log(formData);

    function toNow(date) {
        function monthName(month) {
            const name = [
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "November",
                "Desember",
            ];
            return name[month];
        }
        let time = new Date(date);
        return `${time.getDate()} ${monthName(
            time.getMonth()
        )} ${time.getFullYear()}`;
    }

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    const tolak = (e) => {
        e.preventDefault()
        post(route("picProsesTolak"));
    };
    const terima = (e) => {
        e.preventDefault()
        post(route("picProsesTerima"));
    };
    return (
        <AuthenticatedPic
            user={auth.user}
            errors={errorSystem}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Proses
                </h2>
            }
        >
            <Head title="Proses" />
            <div className="p-6 flex flex-col gap-4">

                <div className=" text-gray-900 text-2xl font-semibold">
                    Proses Pesan
                </div>
                <div
                    className={`collapse bg-base-200 collapse-arrow ${
                        details ? "collapse-open" : "collapse-close"
                    }`}
                >
                    <div
                        className="collapse-title cursor-pointer text-xl font-medium"
                        onClick={() => setDetails((e) => !e)}
                    >
                        Detail Pesan
                    </div>
                    <div className="collapse-content">
                        <div className="flow-root">
                            <dl className="-my-3 divide-y divide-gray-100 text-sm">
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Nama Pengirim
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {data.sender.name}
                                    </dd>
                                </div>
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Email Pengirim
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {data.sender.email}
                                    </dd>
                                </div>
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Tanggal Dikirim
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {toNow(data.created_at)}
                                    </dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Isi Keluhan
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {data.value}
                                    </dd>
                                </div>
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Bukti Gambar
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        <img
                                            src={`/storage/image/mahasiswa/${data.gambar_mahasiswa}`}
                                            alt=""
                                        />
                                        {data.gambar_mahasiswa}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
                <form>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Catatan</span>
                        </div>
                        <textarea
                            value={formData.catatan}
                            name="catatan"
                            type="text"
                            placeholder="Masukkan Catatan"
                            className="textarea textarea-bordered w-full"
                            onChange={(e) =>
                                setData({
                                    ...formData,
                                    catatan: e.target.value,
                                })
                            }
                        ></textarea>
                        <div className="label">
                            <InputError
                                message={errors.catatan}
                                className="mt-2"
                            />
                        </div>
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Gambar</span>
                        </div>
                        <input
                            name="gambar"
                            type="file"
                            placeholder="Masukkan Gambar"
                            className="file-input file-input-bordered w-full"
                            onChange={(e) =>
                                setData({
                                    ...formData,
                                    image: e.target.files[0],
                                })
                            }
                            accept=".jpg,.png,.jpeg"
                        />
                        <div className="label">
                            <InputError
                                message={errors.image}
                                className="mt-2"
                            />
                        </div>
                    </label>
                    <div className="flex mt-5 gap-3">
                        <button
                            onClick={tolak}
                            className="btn flex-1 text-white btn-error"
                        >
                            Tolak
                        </button>
                        <button
                            onClick={terima}
                            className="btn flex-1 text-white btn-success"
                        >
                            Terima
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedPic>
    );
};

export default PicProses;
