'use client';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Command,
    CommandEmpty,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Drawer,

    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input";
import { usePlacesSearch } from "@/hooks/api/use-places-search";
import { useCurrentLocation } from "@/hooks/use-current-location";
import { calculateDistance } from "@/lib/utils";
import { CommandLoading } from "cmdk";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchDialog() {
    const router = useRouter();
    const [textQuery, setTextQuery] = useState('')

    const { location, isLoading: isLoadingLocation, error: errorLocation } = useCurrentLocation()
    const { places, isLoading, error } = usePlacesSearch({
        textQuery,
        latitude: location?.latitude,
        longitude: location?.longitude
    })
    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextQuery(e.target.value)
    }
    return <Dialog>
        <DialogTrigger asChild>
            <Input value={textQuery} className="bg-white"></Input>

        </DialogTrigger>
        <DialogContent className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-1">
                <Input value={textQuery} onChange={handleValueChange} placeholder="Destination" />
            </div>
            <div className="h-[70vh]">
                <Command className="rounded-lg border shadow-md ">
                    {/* <CommandInput placeholder="Type a command or search..." /> */}
                    <CommandList>
                        {isLoading ? <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
                            Searching places...
                        </div> : places?.length <= 0 ? <div>No results found.</div>
                            :
                            places?.map((item, index) => (
                                <CommandItem className="flex justify-between" onSelect={() => {
                                    router.push(`/insurance?origin=${location?.latitude + ',' + location?.longitude}&destination=${item.location.latitude + ',' + item.location.longitude}`)
                                }} key={index}>
                                    <div className="max-w-[200px]">{item.displayName.text}</div>
                                    <div className="w-[80px]">{calculateDistance(
                                        location?.latitude as number,
                                        location?.longitude as number,
                                        item.location.latitude,
                                        item.location.longitude
                                    )} KM</div>
                                </CommandItem>
                            ))
                        }
                    </CommandList>
                </Command>
            </div>
        </DialogContent>
    </Dialog>


}