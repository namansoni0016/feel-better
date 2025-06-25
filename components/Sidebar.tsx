import { auth } from "@/app/utils/auth";
import { NavLinks } from "./NavLinks";

export async function Sidebar() {
    const session = await auth();
    if(!session?.user) {
        return null;
    }
    return (
        <aside className="hidden md:flex flex-col w-64 h-[calc(100vh-64px)] px-4 py-8 border-r border-blue-950 sticky top-16">
            <div className="flex flex-col justify-between flex-1">
                <div>
                    <NavLinks />
                </div>
            </div>
        </aside>
    );
}