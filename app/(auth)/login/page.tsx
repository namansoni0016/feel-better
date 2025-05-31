import { LoginForm } from "@/components/LoginForm";
import { SubmitButton } from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { PiHeartbeatFill } from "react-icons/pi";

export default function LoginPage() {
    return (
        <>
            <div className="flex h-screen w-full items-center justify-center">
                <Card className="w-full max-w-md shadow-2xl rounded-2xl">
                    <CardHeader>
                        <CardTitle className="flex flex-row items-center justify-center text-3xl font-bold text-gray-700">
                            <div>
                                Log In to <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">FeelBetter</span>
                            </div>
                            <PiHeartbeatFill className="ml-1 size-12 text-blue-500" />
                        </CardTitle>
                        <CardDescription className="text-center font-bold text-md">Your personal mental health journal</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-4">
                        <LoginForm />
                        <SubmitButton text="Log In" />
                        <Button variant="link" className="w-full space-y-0 text-sm font-semibold text-gray-700" asChild>
                            <Link href="/signup">Don't have an account?</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}