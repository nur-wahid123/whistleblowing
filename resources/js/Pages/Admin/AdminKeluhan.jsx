import { Head } from "@inertiajs/react";
import MessageTable from "../components/MessageTable";
import AuthenticatedAdmin from "@/Layouts/AuthenticatedAdminLayout";
export default function PicDashboard({ auth, errors, messages }) {
    return (
        <AuthenticatedAdmin
            user={auth.user}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Keluhan</h2>}
        >
            <Head title="Admin Dashboard" />
            <div className="p-6 flex flex-col gap-4">
                <div className=" text-gray-900">You're logged in!</div>
                <MessageTable auth={auth} emails={messages} />
            </div>
        </AuthenticatedAdmin>
    )

}
