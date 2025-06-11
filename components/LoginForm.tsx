"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { signInWithCredentials, signInWithGoogle } from "@/actions/authActions";
import { SubmitButton } from "./SubmitButton";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/lib/zodSchemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

type LoginFormValues = z.infer<typeof loginSchema>;

type LoginResponse = {
    success: boolean;
    error?: string;
    field?: null,
};

export function LoginForm() {
    const [showPassword, setShowPassword] = useState<Boolean>(false); 
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const router = useRouter();
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });
    const handleLogin = async (values: LoginFormValues) => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("email", values.email);
            formData.append("password", values.password);
            const response: LoginResponse = await signInWithCredentials(formData);
            if(response?.success) {
                router.refresh();
                router.push("/");
            } else if(response?.error) {
                form.clearErrors();
                if(response.field) {
                    form.setError(response.field, {
                        type: "manual",
                        message: response.error
                    });
                } else {
                    form.setError("root", {
                        type: "manual",
                        message: response.error
                    });
                }
            }
        } catch (error) {
            console.error(error);
            form.setError("root", {
                type: "manual",
                message: "An unexpected error occured. Please try again!"
            });
        } finally{
            setIsSubmitting(false);
        }
    };
    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="johndoe@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="password" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className="flex flex-row relative">
                                    <Input type={showPassword ? "text" : "password"} placeholder="******" {...field}/>
                                    <Button variant="outline" type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center rounded-l-none" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? (<Eye />) : (<EyeOff />)}
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    {form.formState.errors.root && (
                        <p className="text-sm font-medium text-destructive">
                            {form.formState.errors.root.message}
                        </p>
                    )}
                    <SubmitButton text="Log In" isLoading={isSubmitting} />
                </form>
            </Form>
            <div className="flex flex-col space-y-2">
                <Button variant="outline" className="w-full" size="lg" onClick={handleGoogleSignIn}>
                    <FcGoogle className="size-5" /> Continue with Google
                </Button>
            </div>
        </>
    );
}