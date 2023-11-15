"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    bet: z.string().min(10, {
        message: "Bet must be at least 10 characters.",
    }),
    value: z.number(),
    minParticipants: z.number(),
    judge: z.string().min(1, {
        message: "Judge must be at least 1 character.",
    }),
    endTime: z.date(),
})

export function CreateForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            bet: "",
            value: 0,
            minParticipants: 0,
            judge: "",
            endTime: new Date(),
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Initiator</FormLabel>
                            <FormControl>
                                <Input placeholder="0x123..." {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bet"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bet</FormLabel>
                            <FormControl>
                                <Textarea placeholder="The bet you want to make" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Value</FormLabel>
                            <FormControl>
                                <div className="flex items-center gap-2">
                                    <Input placeholder="How much you oyt into the pool"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*\.?\d*$/.test(value)) {
                                                field.onChange((value))
                                            }
                                        }}
                                        value={field.value}
                                    />
                                    <span>ETH</span>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="minParticipants"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Minimum Participants</FormLabel>
                            <FormControl>
                                <div className="flex items-center gap-2">
                                    <Input placeholder="10" {...field}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*\.?\d*$/.test(value)) {
                                                field.onChange((value))
                                            }
                                        }}
                                        value={field.value}
                                    />
                                    <span>ETH</span>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="judge"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Judge</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Judge" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="xx">XX</SelectItem>
                                        <SelectItem value="yy">YY</SelectItem>
                                        <SelectItem value="zz">ZZ</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>End Time</FormLabel>
                            <FormControl>
                                <Input type="datetime-local" {...field} value={field.value ? new Date(field.value).toISOString().split('T')[0] + 'T' + new Date(field.value).toISOString().split('T')[1].slice(0, -1) : ''} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
