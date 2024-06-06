import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import { useRef } from "react";

export default function AddMessageModal({ pics, refresh }) {
    const { data, setData, post, errors, reset, hasErrors } =
        useForm({
            bagian: "",
            message: "",
            image: "",
        });
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
    const submit = async (e) => {
        e.preventDefault();
        post(route("add.message"),{
            preserveScroll:true,
            onSuccess:()=>{
                refresh()
                reset()
                document.getElementById("close_add_message_modal").submit()
            }
        });
    };
    return (
        <div>
            <button
                className="btn rounded-md shadow-md"
                onClick={() =>
                    document.getElementById("add_message_modal").showModal()
                }
            >
                + Kirim keluhan baru
            </button>
            <dialog id="add_message_modal" className="modal">
                <div className="modal-box">
                    <form
                        onSubmit={(e) => {
                            reset();
                        }}
                        id="close_add_message_modal"
                        method="dialog"
                    >
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg">Tambahkan Pesan</h3>
                    <form onSubmit={submit} className="p-6 flex flex-col gap-3">
                        <label htmlFor="bagian">Bagian</label>
                        <select
                            value={data.bagian}
                            className="select select-bordered"
                            name="bagian"
                            onChange={(e) => {
                                setData({ ...data, bagian: e.target.value });
                            }}
                            id="bagian"
                        >
                            <option value="" disabled>
                                Pilih Bagian
                            </option>
                            {pics.map((data, i) => (
                                <option key={i} value={data.id}>
                                    {toTitleCase(data.name)}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.bagian} className="mt-2" />
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Isi Pesan</span>
                            </div>
                            <textarea
                                value={data.message}
                                onChange={(e) =>{
                                    setData({
                                        ...data,
                                        message: e.target.value,
                                    })
                                }
                                }
                                name="message"
                                type="text"
                                placeholder="Tulis Pesan"
                                className="input input-bordered w-full h-28"
                            ></textarea>
                            <div className="label"></div>
                        </label>
                        <InputError message={errors.message} className="mt-2" />
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Bukti Gambar</span>
                            </div>
                            <input
                                onChange={(e)=>{
                                    setData({...data,image:e.target.files[0]})
                                }}
                                name="image"
                                type="file"
                                className="file-input file-input-bordered w-full"
                                accept=".jpg,.png,.jpeg"
                            />
                            <div className="label"></div>
                        </label>
                        <InputError message={errors.image} className="mt-2" />
                        <button type="submit" className="btn">
                            Tambah Pesan
                        </button>
                    </form>
                </div>
            </dialog>
        </div>
    );
}
