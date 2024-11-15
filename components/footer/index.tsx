'use client';
import { useRouter } from 'next/navigation';

export default function Footer() {
    const router = useRouter();
    return <div className="flex justify-center gap-2 p-4">
        <div onClick={() => router.push('/')}>Trip</div>
        <div>|</div>
        <div onClick={() => router.push('/insurance/list')}>Profile</div>
    </div>
}