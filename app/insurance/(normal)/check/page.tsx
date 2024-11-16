"use client";
import { Button } from "@/components/ui/button"
import { useTaxiTime } from "@/hooks/api/use-taxi-time";
import { useCurrentLocation } from "@/hooks/use-current-location";
import { calculateDistance } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Countdown from 'react-countdown';

export default function Check() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Distance />
            </Suspense>
        </div>
    )
}

function Distance() {
    const router = useRouter();
    const { location, isLoading, error, retry } = useCurrentLocation();
    const searchParams = useSearchParams();
    const destination = searchParams?.get('destination') ?? '';
    const endTime = Number(searchParams?.get('endTime') ?? '0');
    const destinationArray = destination.split(',');
    const destLatitude = parseFloat(destinationArray[0]);
    const destLongitude = parseFloat(destinationArray[1]);
    const [stage, setStage] = useState(-1)

    const distance = calculateDistance(
        location?.latitude as number,
        location?.longitude as number,
        destLatitude,
        destLongitude
    );

    useEffect(() => {
        if (stage == -1) {
            return
        }
        if (stage > 2) {
            router.push(`/insurance/detail?isOnTime=${endTime > new Date().getTime()}`)
        }
        setTimeout(() => {
            setStage(stage + 1)
        }, 2000)
    }, [stage])
    const handleCheck = async () => {
        try {
            // 获取当前位置
            // router.push(`/insurance/detail?isOnTime=${endTime > new Date().getTime()}`)
            setStage(1)
        } catch (error) {
            console.error("Error getting location:", error);
        }
    };



    return <div className="mb-4 p-4 rounded-lg bg-gray-100">
        {isLoading ? (
            <p>Loading location...</p>
        ) : error ? (
            <p className="text-red-500">Error: {error}</p>
        ) : location ? (
            <div className="text-center">
                <p>(latitude,longitude)</p>
                <p>({location.latitude},{location.longitude})</p>
                <p>Distance: {distance} KM</p>
                <Countdown date={endTime} />
            </div>
        ) : (
            <p>No location data available</p>
        )}
        <Button
            onClick={retry}
            disabled={isLoading}
            className="mt-4 w-full"
        >
            Refresh Current Location
        </Button>
        {stage < 0 ? <Button
            onClick={handleCheck}
            disabled={(isLoading || distance > 0.1) && endTime > new Date().getTime()}
            className="mt-4 w-full"
        >
            Arrive
        </Button> : <Uploading stage={stage} />}
    </div>
}

function Uploading({ stage }: { stage: number }) {

    return <div className="mt-4 space-y-4">
        <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
            <div className="flex items-center gap-2">

                {
                    stage < 1 ? <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                        <span className="text-sm text-gray-600">Uploading current location to Nillion...</span>
                    </>
                        :
                        <>
                            <CircleCheck className="text-green-600 text-xs" />
                            <span className="text-sm text-gray-600">Uploaded current location to Nillion</span>
                        </>
                }
            </div>
            <div className="flex items-center gap-2">
                {
                    stage < 2 ? <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                        <span className="text-sm text-gray-600 transition-opacity delay-2000 duration-500">Uploading destination location to Nillion...</span>
                    </>
                        :
                        <>
                            <CircleCheck className="text-green-600 text-xs" />
                            <span className="text-sm text-gray-600">Uploaded destination location to Nillion</span>
                        </>
                }
            </div>
        </div>
    </div>
}