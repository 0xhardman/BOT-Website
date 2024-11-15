import { ArrowLeft } from "lucide-react";

export default function InsuranceLayout({ children }: { children: React.ReactNode }) {
    return <div className="p-4">
        <h3 className="flex items-center gap-2 py-4 text-lg font-bold">
            <ArrowLeft></ArrowLeft>
        </h3>
        <div className="flex flex-col gap-2 h-[calc(100vh-180px)] overflow-scroll">
            {children}
        </div>


    </div>
}