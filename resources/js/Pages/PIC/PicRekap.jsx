import AuthenticatedPic from "@/Layouts/AuthenticatedPicLayout";
import { Head, useForm } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { downloadMultiplePDF } from "../components/PrintMessage";

export default function PicRekap({ auth, errors: errorSystem, months }) {
    const [time, setTime] = useState(0);
    useEffect(() => {
        setTime(months[0].timestamp)
    })
    async function cetakForm() {
        const data = await axios.get("/pic/download-rekap/" + time);
        downloadMultiplePDF(data.data.data,data.data.fileName);
        return;
    }
    return (
        <AuthenticatedPic
            user={auth.user}
            errors={errorSystem}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Person In Charge Dashboard</h2>}
        >
            <Head title="Rekap"/>
            <div className="p-4 flex flex-col gap-3 border-t border-gray-200">
                Download Rekap surat menurut Bulan
                <select onChange={(e) => setTime(e.target.value)} className="select select-bordered " name="when" id="when">
                    {months.map((data, i) => (
                        <option key={i} value={data.timestamp}>{data.date}</option>
                    ))}
                </select>
                <button className="btn btn-primary" onClick={cetakForm}>Download</button>
            </div>
        </AuthenticatedPic>
    )
}
