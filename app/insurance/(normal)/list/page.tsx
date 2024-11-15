'use client';
import { useRouter } from "next/navigation";

export default function InsuranceListPage() {
    const router = useRouter();
    return <>
        {
            Array.from({ length: 14 }).map((_, index) => (
                <div onClick={() => {
                    router.push(`/insurance/detail`)
                }} key={index} className="text-center p-4 border">list item</div>
            ))
        }
    </>
}