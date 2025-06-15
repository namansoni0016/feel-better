import { redirect } from "next/navigation";
import { auth } from "../utils/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditProfileModal } from "@/components/EditProfileModal";

export default async function ProfilePage() {
    const session = await auth();
    if(!session?.user) {
        redirect("/login");
    }
    return (
        <div className="flex h-[calc(100vh-64px)] w-full items-start py-8 justify-center">
            <Card className="w-full max-w-3xl shadow-lg rounded-xl border-0"> 
                <CardHeader className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-400 rounded-t-xl h-32 -z-10" />
                    <div className="flex flex-col items-center pt-16">
                        <Avatar className="size-28 border-4 border-white shadow-lg">
                            <AvatarImage src={session.user.image || "/avatar.png"} className="object-cover" />
                            <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl font-bold">
                                {session.user.name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <CardTitle className="mt-4 text-3xl font-bold text-gray-700">{session.user.name}</CardTitle>
                        <CardDescription className="text-muted-foreground text-md">{session.user.email}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold">Edit Profile</h3>
                            <EditProfileModal user={session.user} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}