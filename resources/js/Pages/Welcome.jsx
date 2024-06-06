import { Link, Head } from "@inertiajs/react";
import GuestLayouts from "./Layouts/GuestLayouts";
import hero from "../Assets/photos/Image placehlder 1.jpg";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <>
            <Head title="Welcome" />
            <GuestLayouts>
                <div className="relative w-full flex flex-col justify-center">
                    <div className="absolute text-white w-full text-center z-10">
                        <div className="font-semibold text-xl">D3 Teknologi Informasi</div>
                        <div className="font-bold text-5xl font-sans">Sistem Informasi Komplain Mahasiswa</div>
                    </div>
                    <img className="z-0 brightness-50 w-full top-0 left-0" src={hero} alt="" />
                </div>
            </GuestLayouts>
        </>
    );
}
