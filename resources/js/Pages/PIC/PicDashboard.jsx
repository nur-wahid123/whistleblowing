import AuthenticatedPic from "@/Layouts/AuthenticatedPicLayout";
import { Head } from "@inertiajs/react";
import MessageTable from "../components/MessageTable";
import MessageTablePIC from "../components/MessageTablePIC";
export default function PicDashboard({ auth, errors, messages }) {
    return (
        <AuthenticatedPic
            user={auth.user}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Person In Charge Dashboard</h2>}
        >
            <Head title="Admin Dashboard" />
            <div className="p-6 flex flex-col gap-4">
                <div className=" text-gray-900">Tabel Keluhan Mahasiswa</div>

                <MessageTablePIC auth={auth} emails={messages} />
            </div>
        </AuthenticatedPic>
    )

}
