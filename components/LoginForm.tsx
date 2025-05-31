"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export function LoginForm() {
    const [showPassword, setShowPassword] = useState<Boolean>(false); 
    return (
        <>
            <div className="flex flex-col space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="johndoe@email.com" required/>
            </div>
            <div className="flex flex-col space-y-2">
                <Label>Password</Label>
                <div className="flex flex-row relative">
                    <Input type={showPassword ? "text" : "password"} placeholder="******" required/>
                    <Button variant="outline" className="absolute inset-y-0 right-0 pr-3 flex items-center rounded-l-none" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                            <Eye />
                        ) : (
                            <EyeOff />
                        )}
                    </Button>
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                <Button variant="outline" className="w-full" size="lg">
                    <FcGoogle className="size-5" /> Continue with Google
                </Button>
            </div>
        </>
    );
}