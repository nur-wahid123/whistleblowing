import { usePage } from "@inertiajs/react";

export default function MessageDetailModal({ id, data }) {
    // console.log(data);

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
    return (
        <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <div
                onClick={() => document.getElementById(id).showModal()}
                className="w-20 underline cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis"
            >
                {data.value}
            </div>

            <dialog id={id} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold mb-4 text-lg">Detail Pesan</h3>
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
                                    Bagian Penerima
                                </dt>
                                <dd className="text-gray-700 sm:col-span-2">
                                    {toTitleCase(data.reciever.name)}
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
                                    <img src={`/storage/image/mahasiswa/${data.gambar_mahasiswa}`} alt="" />
                                    {data.gambar_mahasiswa}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
