import { auth } from "@/app/utils/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CiCirclePlus } from "react-icons/ci";

export default async function NewJournal() {
    const session = await auth();
    if(!session?.user) {
        redirect('/login');
    }
    return (
        <>
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
                <div className="flex flex-col items-center justify-center gap-8 text-center">
                    <div className="relative-group">
                        <Link href="/journal/new/create" className="flex flex-col items-center">
                            <CiCirclePlus className="size-40 text-blue-950 transition-colors duration-200 hover:text-blue-900" />
                            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-100/30 blur-xl -z-10"></div>
                        </Link>
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-3xl font-bold text-blue-950">New Journal Entry</h2>
                        <p className="text-blue-950 text-md font-semibold">
                            Begin your reflection. Click above to start writing about your thoughts and feelings.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}