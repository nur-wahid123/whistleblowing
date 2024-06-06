import React from 'react'
import hero from '../Assets/photos/Image placehlder 1.jpg'
import AuthenticatedAdmin from '@/Layouts/AuthenticatedAdminLayout'
import { Head } from '@inertiajs/react'
import Authenticated from '@/Layouts/AuthenticatedLayout'

const LandingPage = ({auth,errors,data}) => {
    return (
        <Authenticated
            user={auth.user}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Admin Dashboard" />
            <div className="relative w-full flex flex-col justify-center">
                <div className="absolute text-white w-full text-center z-10">
                    <div className="font-semibold text-xl">
                        Sistem Informasi Komplain Mahasiswa
                    </div>
                    <div className="font-bold text-5xl font-sans">
                        Selamat Datang Mahasiswa
                    </div>
                </div>
                <img
                    className="z-0 brightness-[0.3] top-0 max-h-64 object-cover left-0"
                    src={hero}
                    alt=""
                />
            </div>
            <div className="bg-white w-full h-44 p-8 mb-10">
                <div className="grid gap-4 lg:gap-8 md:grid-cols-3">
                    <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                                <span>Total Keluhan</span>
                            </div>

                            <div className="text-3xl dark:text-gray-100">
                                {data.pesan}
                            </div>

                            <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-gray-800">
                                <span>Keluhan</span>

                                <svg
                                    className="w-4 h-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                                <span>Keluhan Diterima</span>
                            </div>

                            <div className="text-3xl dark:text-gray-100">{data.diterima}</div>

                            <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">
                                <span>Keluhan</span>

                                <svg
                                    className="w-4 h-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                                <span>Keluhan Ditolak</span>
                            </div>

                            <div className="text-3xl dark:text-gray-100">{data.ditolak}</div>

                            <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-red-600">
                                <span>Keluhan</span>

                                <svg
                                    className="w-4 h-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}

export default LandingPage
