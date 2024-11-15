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
import { useRouter } from "next/navigation";

export default function SearchDrawer() {
    const router = useRouter();
    return <Drawer>
        <DrawerTrigger className="w-full">
            <Input className="bg-white"></Input>
        </DrawerTrigger>
        <DrawerContent className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-1">
                <Input placeholder="Destination" />
            </div>
            <div className="h-[70vh]">
                <Command className="rounded-lg border shadow-md ">
                    {/* <CommandInput placeholder="Type a command or search..." /> */}
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        {
                            Array.from({ length: 100 }).map((_, index) => (
                                <CommandItem onSelect={() => {
                                    console.log(123)
                                    router.push(`/insurance`)
                                }} key={index}>
                                    {index}12313123131123
                                </CommandItem>
                            ))
                        }
                    </CommandList>
                </Command>
            </div>

        </DrawerContent>
    </Drawer>
}