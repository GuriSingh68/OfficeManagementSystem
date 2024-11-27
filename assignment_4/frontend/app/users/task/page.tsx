"use client"
import { isAuthenticated } from "@/app/api/auth/auth";
import Task from "./Task";
import Header from "@/app/Component/Header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const router=useRouter();
    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/login");
        }
    }, [router]);
    if (!isAuthenticated()) {
        return (
            <div>
                <Header />
                <div className="rounded-lg shadow-lg p-8">
                    <h3 className="text-6xl font-semibold text-gray-700 mb-6 hover:text-red-700 flex justify-content-center">
                        Error Login Again
                    </h3>
                </div>
            </div>
        );
    }

    return <Task />;
}