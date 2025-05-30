import { SignupForm } from "@/components/SignupForm";
import { SubmitButton } from "@/components/SubmitButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PiHeartbeatFill } from "react-icons/pi";

export default function SignupPage() {
    return (
        <>
            <div className="flex h-screen w-full items-center justify-center">
                <Card className="w-full max-w-md shadow-2xl rounded-2xl">
                    <CardHeader>
                        <CardTitle className="flex flex-row items-center justify-center text-3xl font-bold text-gray-700">
                            <div>
                                Welcome to <span className="text-blue-600">FeelBetter</span>
                            </div>
                            <PiHeartbeatFill className="ml-1 size-12 text-blue-600" />
                        </CardTitle>
                        <CardDescription className="text-center font-bold text-md">Create an account to get started</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-4">
                        <SignupForm />
                        <SubmitButton text="Sign Up" />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}