import { PiHeartbeatFill } from "react-icons/pi";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="flex flex-col h-[calc(100vh-64px)] w-full items-center justify-center">
            <Card className="w-full max-w-md shadow-md rounded-2xl py-1">
                <CardHeader>
                    <CardTitle className="flex flex-row items-center justify-center text-6xl font-bold text-gray-700">
                        <div className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">FeelBetter</div>
                        <PiHeartbeatFill className="ml-1 size-24 text-blue-500"/>
                    </CardTitle>
                </CardHeader>
            </Card>
            <span className="italic mt-4 text-lg text-blue-900 font-semibold">Your safe space for mental wellness. Track your mood, journal your thoughts, and find peace</span>
            <Button variant="link" className="text-blue-900 font-semibold text-md" asChild>
                <Link href="/signup">Click Here & Get Started...</Link>
            </Button>
        </div>
    )
}