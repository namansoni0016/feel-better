"use client";

import { deleteJournalEntry, getJournalEntries } from "@/actions/journalActions";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

export default function JournalEntries() {
    const { data: session } = useSession();
    if(!session?.user) {
        redirect("/login");
    }
    const [entries, setEntries] = useState<Awaited<ReturnType<typeof getJournalEntries>>>([]);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    useEffect(() => {
        async function loadEntries() {
            try {
                const data = await getJournalEntries();
                setEntries(data);
            } catch (error) {
                toast.error("Failed to load journal entries!");
                console.error("Failed to load journal entries!", error);
            }
        }
        loadEntries();
    }, []);
    const handleDelete = async (entryId: string) => {
        setIsDeleting(entryId);
        try {
            const result = await deleteJournalEntry(entryId);
            setEntries(entries.filter(entry => entry.id !== entryId));
            toast.success(result.message);
        } catch (error) {
            toast.error("Failed to delete entry!");
            console.error("Failed to delete entry: ", error);
        } finally {
            setIsDeleting(null);
        }
    };
    return (
        <>
            <div className="container mx-auto p-4 max-w-5xl">
                <h1 className="text-3xl font-bold mb-8 text-center text-blue-950">Your Personal Space</h1>
                {entries.length === 0 ? (
                    <div className="text-center mt-12">
                        <p className="text-md font-semibold text-blue-950">No journal entries yet. Start writing your thoughts!</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {entries.map((entry) => (
                            <div key={entry.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-6 bg-white rounded-full shadow-lg hover:shadow-2xl hover:cursor-pointer transition-shadow">
                                <div className="md:col-span-1 flex justify-start items-center ml-4">
                                    <div className="sticky top-4">
                                        <p className="text-md font-semibold text-blue-950">{entry.formattedDate}</p>
                                        <p className="text-sm font-semibold text-blue-950">{entry.formattedTime}</p>
                                    </div>
                                </div>
                                <div className="md:col-span-3">
                                    <div className="prose max-w-none line-clamp-3" dangerouslySetInnerHTML={{__html: entry.content}} />
                                </div>
                                <div className="md:col-span-1 flex items-center justify-end">
                                    <button type="submit" onClick={() => handleDelete(entry.id)} disabled={isDeleting === entry.id}
                                    className={`p-2 ${isDeleting === entry.id ? 'text-gray-500' : 'text-red-500 hover:text-red-700 transition-colors'}`} aria-label="Delete Entry">
                                        <FaTrash className="text-lg" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}