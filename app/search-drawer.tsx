'use client';
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
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchDrawer() {
    const router = useRouter();
    const [textQuery, setTextQuery] = useState('')
    const { places, isLoading, error } = usePlacesSearch({
        textQuery
    })
    const { location, isLoading: isLoadingLocation, error: errorLocation } = useCurrentLocation()
    console.log({ location, isLoadingLocation, errorLocation })
    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextQuery(e.target.value)
    }
    return <Drawer>
        <DrawerTrigger className="w-full">
            <Input className="bg-white"></Input>
        </DrawerTrigger>
        <DrawerContent className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-1">
                <Input value={textQuery} onChange={handleValueChange} placeholder="Destination" />
            </div>
            <div className="h-[70vh]">
                <Command className="rounded-lg border shadow-md ">
                    {/* <CommandInput placeholder="Type a command or search..." /> */}
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        {
                            places?.map((item, index) => (
                                <CommandItem onSelect={() => {
                                    console.log(123)
                                    router.push(`/insurance`)
                                }} key={index}>
                                    {item.shortFormattedAddress}
                                </CommandItem>
                            ))
                        }
                    </CommandList>
                </Command>
            </div>

        </DrawerContent>
    </Drawer>
}