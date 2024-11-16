'use client'
import { useAuth } from "@/contexts/auth"
import { Button } from "../ui/button"

export default function BKCConnetBtn() {
    const { loginStatus, loginWithBitkubNext, logout, isLoggedIn, userInfo } = useAuth()
    return <>
        {isLoggedIn ? <Button onClick={logout}>{userInfo?.walletAddress.slice(0, 4)}...{userInfo?.walletAddress.slice(-4)}</Button>
            : <Button onClick={loginWithBitkubNext}>Connect</Button>}
    </>
}
