import Link from "next/link";
import { PiHeartbeatFill } from "react-icons/pi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { auth } from "@/app/utils/auth";
import { User } from "lucide-react";
import { SignOut } from "./SignOut";

export async function Navbar() {
    const session = await auth();
    if(!session?.user) {
        return null;
    }
    return (
        <nav className="border-b border-blue-600 px-6 py-3 sticky top-0 z-50">
            <div className="mx-auto flex items-center justify-between">
                <div className="bg-white max-w-fit px-2 rounded-2xl flex flex-row">
                    <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">FeelBetter</Link>
                    <PiHeartbeatFill className="size-7 text-blue-500" />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={session.user.image || undefined} alt={session.user.name || "User avatar"} referrerPolicy="no-referrer" />
                                <AvatarFallback className="text-gray-700 font-bold">
                                    {session.user.name?.charAt(0) || session.user.email?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 space-y-2 pt-2" align="end" forceMount>
                        <DropdownMenuItem asChild>
                            <Link href="/profile" className="text-gray-700 font-bold cursor-pointer">
                                <User className="mr-2 h-4 w-4 text-gray-700 font-bold" />
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <SignOut />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
}