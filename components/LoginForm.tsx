"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { signInWithCredentials, signInWithGoogle } from "@/actions/authActions";
import { SubmitButton } from "./SubmitButton";
import { useRouter } from "next/navigation";

export function LoginForm() {
    const [showPassword, setShowPassword] = useState<Boolean>(false); 
    const router = useRouter();
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            await signInWithCredentials(formData);
            router.refresh();
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }
    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <form onSubmit={handleLogin} className="space-y-4">
                <div className="flex flex-col space-y-2">
                    <Label>Email</Label>
                    <Input type="email" name="email" placeholder="johndoe@email.com" required/>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label>Password</Label>
                    <div className="flex flex-row relative">
                        <Input type={showPassword ? "text" : "password"} name="password" placeholder="******" required/>
                        <Button variant="outline" className="absolute inset-y-0 right-0 pr-3 flex items-center rounded-l-none" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <Eye />
                            ) : (
                                <EyeOff />
                            )}
                        </Button>
                    </div>
                </div>
                <SubmitButton text="Log In" />
            </form>
            <div className="flex flex-col space-y-2">
                <Button variant="outline" className="w-full" size="lg" onClick={handleGoogleSignIn}>
                    <FcGoogle className="size-5" /> Continue with Google
                </Button>
            </div>
        </>
    );
}