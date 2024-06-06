import MessageDetailModal from "./MessageDetailModal";
import { useEffect, useState } from "react";
import axios from "axios";
import MessageDetailDone from "./MessageDetailDone";
import { downloadSinglePDF } from "./PrintMessage";

export default function MessageTable({ emails, auth }) {
    const [messages, setMessages] = useState(emails);
    let no = 1;
    useEffect(() => {
        setMessages(emails);

        return () => {};
    }, [emails]);

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

    async function cetakForm(id) {
        const data = await axios.get("/admin/cetak/" + id);
        downloadSinglePDF(data.data.data,data.data.fileName);
        return;
    }
    return messages.data.length == 0 ? (
        "Data Kosong"
    ) : (
        <div className="overflow-auto">
            {messages.from == messages.last_page ? (
                <div className="join my-4">
                    <button className="join-item btn btn-sm">
                        Page {messages.current_page}
                    </button>
                </div>
            ) : (
                <div className="join my-4">
                    <a href={messages.first_page_url}>
                        <button className="join-item btn btn-sm">«</button>
                    </a>
                    {messages.prev_page_url != null && (
                        <a href={messages.prev_page_url}>
                            <button className="join-item btn btn-sm">
                                {"<"}
                            </button>
                        </a>
                    )}
                    <button className="join-item btn btn-sm">
                        Page {messages.current_page}
                    </button>
                    {messages.next_page_url != null && (
                        <a href={messages.next_page_url}>
                            <button className="join-item btn btn-sm">
                                {">"}
                            </button>
                        </a>
                    )}
                    <a href={messages.last_page_url}>
                        <button className="join-item btn btn-sm">»</button>
                    </a>
                </div>
            )}
            <table className="table">
                <thead>
                    <tr>
                        <td>No.</td>
                        <td>ID Pesan</td>
                        {auth.user.role_id != 1 && <td>Sender</td>}
                        <td>Bagian</td>
                        <td>Isi Keluhan</td>
                        <td>Status</td>
                        <td>Tanggal Dikirim</td>
                        {auth.user.role_id != 1 && auth.user.role_id != 5 && (
                            <td>Aksi</td>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {auth.user.role_id == 1 &&
                        messages.data.map((data, i) => (
                            <tr key={i}>
                                <td>{no++}</td>
                                <td>{data.id}</td>
                                <td>{toTitleCase(data.reciever.name)}</td>
                                <td>
                                    {data.status == "menunggu" ||
                                    data.status == "diproses" ? (
                                        <MessageDetailModal
                                            id={
                                                "message_detail_modal_" +
                                                data.id
                                            }
                                            data={data}
                                            key={i}
                                        />
                                    ) : (
                                        <MessageDetailDone
                                            id={
                                                "message_detail_modal_done_" +
                                                data.id
                                            }
                                            data={data}
                                            key={i}
                                        />
                                    )}
                                </td>
                                <td>
                                    {data.status == "diproses" && (
                                        <div className="p-1 text-sm font-bold w-fit bg-yellow-500 text-white rounded-md">
                                            {toTitleCase(data.status)}
                                        </div>
                                    )}
                                    {data.status == "menunggu" && (
                                        <div className="p-1 text-sm font-bold w-fit bg-slate-700 text-white rounded-md">
                                            {toTitleCase(data.status)}
                                        </div>
                                    )}
                                    {data.status == "ditolak" && (
                                        <div className="p-1 text-sm font-bold w-fit bg-red-600 text-white rounded-md">
                                            {toTitleCase(data.status)}
                                        </div>
                                    )}
                                    {data.status == "diterima" && (
                                        <div className="p-1 text-sm font-bold w-fit bg-green-600 text-white rounded-md">
                                            {toTitleCase(data.status)}
                                        </div>
                                    )}
                                </td>
                                <td>{toNow(data.created_at)}</td>
                            </tr>
                        ))}
                    {auth.user.role_id != 1 &&
                        messages.data.map((data, i) => (
                            <tr key={i}>
                                <td>{no++}</td>
                                <td>{data.id}</td>
                                <td>{data.sender.email}</td>
                                <td>{toTitleCase(data.reciever.name)}</td>
                                <td className="p-0">
                                    {data.status == "menunggu" ||
                                    data.status == "diproses" ? (
                                        <MessageDetailModal
                                            id={
                                                "message_detail_modal_" +
                                                data.id
                                            }
                                            data={data}
                                            key={i}
                                        />
                                    ) : (
                                        <MessageDetailDone
                                            id={
                                                "message_detail_modal_done_" +
                                                data.id
                                            }
                                            data={data}
                                            key={i}
                                        />
                                    )}
                                </td>
                                <td>
                                    {data.status == "diproses" && (
                                        <div className="p-1 text-sm font-bold w-fit bg-yellow-500 text-white rounded-md">
                                            {toTitleCase(data.status)}
                                        </div>
                                    )}
                                    {data.status == "menunggu" && (
                                        <div className="p-1 text-sm font-bold w-fit bg-slate-700 text-white rounded-md">
                                            {toTitleCase(data.status)}
                                        </div>
                                    )}
                                    {data.status == "ditolak" && (
                                        <div className="p-1 text-sm font-bold w-fit bg-red-600 text-white rounded-md">
                                            {toTitleCase(data.status)}
                                        </div>
                                    )}
                                    {data.status == "diterima" && (
                                        <div className="p-1 text-sm font-bold w-fit bg-green-600 text-white rounded-md">
                                            {toTitleCase(data.status)}
                                        </div>
                                    )}
                                </td>
                                <td>{toNow(data.created_at)}</td>
                                <td>
                                    <a
                                        id={"cetak" + data.id}
                                        href={"/admin/cetak/" + data.id}
                                    ></a>
                                    <button
                                        onClick={() => cetakForm(data.id)}
                                        className="btn btn-sm"
                                    >
                                        Cetak
                                        <svg
                                            className="w-3 h-3 text-gray-800 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 16 18"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                                            />
                                        </svg>
                                    </button>
                                </td>
                                {auth.user.role_id != 5 &&
                                    auth.user.role_id != 1 && (
                                        <td>
                                            <a href={`/pic/proses/${data.id}`}>
                                                <button className="btn btn-sm bg-red-200">
                                                    Proses
                                                </button>
                                            </a>
                                        </td>
                                    )}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
