import { SignupForm } from "@/components/SignupForm";
import { SubmitButton } from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { PiHeartbeatFill } from "react-icons/pi";

export default function SignupPage() {
    return (
        <>
            <div className="flex h-screen w-full items-center justify-center">
                <Card className="w-full max-w-md shadow-2xl rounded-2xl">
                    <CardHeader>
                        <CardTitle className="flex flex-row items-center justify-center text-3xl font-bold text-gray-700">
                            <div>
                                Welcome to <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">FeelBetter</span>
                            </div>
                            <PiHeartbeatFill className="ml-1 size-12 text-blue-500" />
                        </CardTitle>
                        <CardDescription className="text-center font-bold text-md">Create an account to get started</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-4">
                        <SignupForm />
                        <SubmitButton text="Sign Up" />
                        <Button variant="link" className="w-full space-y-0 text-sm font-semibold text-gray-700" asChild>
                            <Link href="/login">Already have an account?</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}