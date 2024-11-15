'use client';
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InsuranceLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    return <div className="p-4">
        <h3 className="flex items-center gap-2 py-4 text-lg font-bold">
            <ArrowLeft onClick={() => router.back()}></ArrowLeft>
        </h3>
        <div className="flex flex-col gap-2 h-[calc(100vh-180px)] overflow-scroll">
            {children}
        </div>


    </div>
}