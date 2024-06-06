import { useForm } from "@inertiajs/react";
import MessageDetailModal from "./MessageDetailModal";
import { useEffect, useState } from "react";
import axios from "axios";
import MessageDetailDone from "./MessageDetailDone";

export default function MessageTablePIC({ emails, auth }) {
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
    function cetakForm(id) {
        document.getElementById("cetak" + id).click();
        axios
            .get("/admin/keluhan", { params: { refresh: true } })
            .then((e) => setMessages(e.data));
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
                        <td>Sender</td>
                        <td>Isi Keluhan</td>
                        <td>Status</td>
                        <td>Tanggal Dikirim</td>
                        <td>Aksi</td>
                    </tr>
                </thead>
                <tbody>
                    {messages.data.map((data, i) => (
                        <tr key={i}>
                            <td>{no++}</td>
                            <td>{data.id}</td>
                            <td>{data.sender.email}</td>
                            <td className="p-0">
                                <MessageDetailModal
                                    id={"message_detail_modal_" + data.id}
                                    data={data}
                                    key={i}
                                />
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
                                {data.status == "diproses" ||
                                data.status == "menunggu" ? (
                                    <a href={`/pic/proses/${data.id}`}>
                                        <button className="btn btn-sm bg-red-200">
                                            Proses
                                        </button>
                                    </a>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
