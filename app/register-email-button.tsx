'use client';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useRegisterEmail } from "@/hooks/api/useRegisterEmail";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { sdk } from "@/lib/bitkubchain-sdk";
import { useToast } from "@/hooks/use-toast";

export function RegisterEmailButton() {
    const { trigger: registerEmail, isMutating } = useRegisterEmail()
    const { toast } = useToast()
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    useEffect(() => {
        sdk.getUserWalletAddress().then((address) => {
            setAddress(address)
        })
    }, [])
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={isMutating} className="w-full mt-10" >
                    {isMutating ? 'Registering...' : 'Register Email'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Register Email</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Please enter your email address to receive notifications about your trip.
                </DialogDescription>
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="text" placeholder="Address" disabled value={address ? address : "Please connect wallet"} />
                <Button type="submit" onClick={async () => {
                    if (address && email) {
                        await registerEmail({ address, email })
                        toast({
                            title: "Success",
                            description: "Email registered",
                        })
                    } else {
                        toast({
                            variant: "destructive",
                            title: "Please connect wallet and enter email",
                        })
                    }
                }}>Register</Button>
            </DialogContent>
        </Dialog>
    )
}