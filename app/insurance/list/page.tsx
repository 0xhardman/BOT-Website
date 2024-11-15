import { ArrowLeft } from "lucide-react"
export default function InsuranceListPage() {
    return <div className="p-4">
        <h3 className="flex py-4 text-lg font-bold">
            <ArrowLeft></ArrowLeft>
            <span>My Insurance</span>
        </h3>
        <div className="flex flex-col gap-2">
            {
                Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="text-center p-4 border">list item</div>
                ))
            }
        </div>


    </div>
}