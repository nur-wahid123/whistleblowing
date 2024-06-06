import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import MessageTable from "./components/MessageTable";
import AddMessageModal from "./components/AddMessageModal";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Dashboard({ url,auth, datas, errors,countMessage, pics }) {
    const [messages, setMessages] = useState(datas);
    const [searchForm, setSearchForm] = useState({
        search: "",
        searchBy: "value",
        orderBy: "value",
        orderType: "asc",
    });
    const forRefresh = {
        search: "",
        searchBy: "value",
        orderBy: "value",
        orderType: "asc",
    }
    useEffect(() => {
        handleSearch();
        return () => {};
    }, [searchForm]);

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setSearchForm({ ...searchForm, [name]: value });
    }
    const handleSearch = async () => {
        await axios
            .get("/search", { params: searchForm })
            .then((res) => {
                setMessages(res.data);
                // console.log(res.data);
            })
            .catch((e) => {
                console.log(e.response.data.message);
            });
    };
    const refreshData = async () => {
        await axios
            .get("/search", { params: forRefresh })
            .then((res) => {
                setMessages(res.data);
                // console.log(res.data);
            })
            .catch((e) => {
                console.log(e.response.data.message);
            });
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            errors={errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="p-6 flex flex-col gap-5">
                <div className="flex overflow-auto gap-3 justify-between w-full">
                    <AddMessageModal refresh={refreshData} pics={pics} do={handleSearch} />
                    <div className="flex flex-col">
                        <div className="join join-horizontal">
                            <div className="flex flex-col join-item border">
                                <div className="text-sm px-3 py-1 text-slate-400">Cari Berdasarkan</div>
                                <select
                                    className="select"
                                    onChange={handleChange}
                                    name="searchBy"
                                    id="searchBy"
                                >
                                    <option value="value">Isi Keluhan</option>
                                    <option value="status">Status</option>
                                    <option value="reciever">Reciever</option>
                                </select>
                            </div>
                            <div className="flex flex-col join-item border">
                                <div className="text-sm px-3 py-1 text-slate-400">Urutkan Berdasarkan</div>
                                <select
                                    className="select"
                                    onChange={handleChange}
                                    name="orderBy"
                                    id="orderBy"
                                >
                                    <option value="value">Isi Keluhan</option>
                                    <option value="created_at">Tanggal Dikirim</option>
                                    <option value="status">Status</option>
                                    <option value="reciever_id">
                                        Bagian yang dituju
                                    </option>
                                </select>
                            </div>
                            <div className="flex flex-col join-item border">
                                <div className="text-sm px-3 py-1 text-slate-400">Tipe Urutan</div>
                                <select
                                    className="select"
                                    onChange={handleChange}
                                    name="orderType"
                                    id="orderType"
                                >
                                    <option value="asc">ASC</option>
                                    <option value="desc">DESC</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            type="text"
                            name="search"
                            className="grow border-0 focus:border-none"
                            autoComplete="false"
                            onChange={handleChange}
                            placeholder="Search"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 opacity-70"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </label>
                </div>
                Keluhan Dikirim Minggu ini : {countMessage} Keluhan
                <MessageTable auth={auth} emails={messages} />
            </div>
        </AuthenticatedLayout>
    );
}
