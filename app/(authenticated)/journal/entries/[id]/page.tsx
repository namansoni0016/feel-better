import { getJournalEntry } from "@/actions/journalActions";
import { auth } from "@/app/utils/auth"
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default async function JournalEntryPage({ params } : { params: { id: string }}) {
    const session = await auth();
    const entry = await getJournalEntry(params.id);
    if(!entry || entry.userId !== session?.user?.id) {
        redirect("/journal/entries");
    }
    return (
        <div className="container mx-auto p-4 max-w-5xl h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <Link href="/journal/entries" className="flex items-center text-blue-950 hover:text-blue-700 font-semibold">
                    <FaArrowLeft className="mr-2" />
                    Back to Entries
                </Link>
            </div>
            <div className="flex-1 flex flex-col bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="p-6 pb-0">
                    <h2 className="text-2xl font-bold text-blue-950 mb-2">{entry.formattedDate}</h2>
                    <p className="text-gray-500 font-semibold">{entry.formattedTime}</p>
                </div>
                <div className="p-6 overflow-y-auto prose max-w-none">
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{__html: entry.content}} />
                </div>
            </div>
        </div>
    )
}