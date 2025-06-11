"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle, signUpWithCredentials } from "@/actions/authActions";
import { SubmitButton } from "./SubmitButton";
import { redirect, useRouter } from "next/navigation";
import { signUpSchema } from "@/lib/zodSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { z } from "zod";

type SignupFormValues = z.infer<typeof signUpSchema>;

type SignupResponse = {
    success: boolean;
    error?: string;
    field?: string | null,
    fieldErrors?: Record<string, string[]>;
};

export function SignupForm() {
    const [showPassword, setShowPassword] = useState<Boolean>(false); 
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const router = useRouter();
    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });
    const handleSignup = async (values: SignupFormValues) => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("email", values.email);
            formData.append("password", values.password);
            const result: SignupResponse = await signUpWithCredentials(formData);
            if(result?.success) {
                router.push("/login");
            } else if(result) {
                form.clearErrors();
                if(result.fieldErrors) {
                    Object.entries(result.fieldErrors).forEach(([field, messages]) => {
                        form.setError(field as keyof SignupFormValues, {
                            type: "manual",
                            message: messages?.join(",")
                        });
                    });
                }
                if(result.error && result.field) {
                    form.setError(result.field as keyof SignupFormValues, {
                        type: "manual",
                        message: result.error
                    });
                } else if (result.error) {
                    form.setError("root", {
                        type: "manual",
                        message: result.error
                    });
                }
            }
        } catch (error) {
            console.error("Signup Error: ", error);
            form.setError("root", {
                type: "manual",
                message: "An unexpected error occured. Please try again!"
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.log(error);
            form.setError("root", {
                type: "manual",
                message: "Failed to sign in with google!"
            });
        }
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
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
                                    <Button variant="outline" className="absolute inset-y-0 right-0 pr-3 flex items-center rounded-l-none" onClick={() => setShowPassword(!showPassword)}>
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
                    <SubmitButton text="Sign Up" isLoading={isSubmitting} />
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