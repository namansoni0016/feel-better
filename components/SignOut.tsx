"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export function SignOut() {
    const handleSignOut = async() => {
        await signOut();
    }
    return (
        <div className="flex justify-center">
            <Button variant="destructive" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4 text-white font-bold" />
                Sign Out
            </Button>
        </div>
    )
}