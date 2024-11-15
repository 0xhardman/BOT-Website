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

export default function SearchDrawer() {
    return <Drawer>
        <DrawerTrigger className="w-full">
            <Input className="bg-white"></Input>
        </DrawerTrigger>
        <DrawerContent className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-1">
                <Input placeholder="Destination" />
            </div>
            <div className="h-[70vh]">
                <Command className="rounded-lg border shadow-md md:min-w-[450px]">
                    {/* <CommandInput placeholder="Type a command or search..." /> */}
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandItem>
                            <span>Calendar</span>
                        </CommandItem>
                        <CommandItem>
                            <span>Search Emoji</span>
                        </CommandItem>
                    </CommandList>
                </Command>
            </div>

        </DrawerContent>
    </Drawer>
}