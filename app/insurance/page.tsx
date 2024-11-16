'use client';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function InsurancePage() {
    const router = useRouter();
    return <div className="py-8 px-4">
        <div className="flex flex-col gap-1">
            <div>Est. time:</div>
            <div className="border p-4 text-center text-4xl font-bold">
                00:00:00
            </div>
            <div className="text-center">Arrive at 15:20</div>
        </div>
        <div className="mt-8" >
            <h4 className="mt-4 text-center text-lg font-bold">Purchase an Insurance</h4>
            <div className="text-center mt-4">
                <span>Arrive latest time: 15:30</span>
                <div>Baht: 15:20</div>
            </div>
        </div>
        <Button className="w-full mt-8" onClick={() => {
            router.push(`/insurance/list`)
        }}>Pay</Button>
    </div>
}