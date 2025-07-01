"use client";

import { deleteJournalEntry, getJournalEntries } from "@/actions/journalActions";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

export default function JournalEntries() {
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
    const handleDelete = async (e: React.MouseEvent, entryId: string) => {
        e.preventDefault();
        e.stopPropagation();
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
            <div className="flex flex-col h-screen">
                <div className="container mx-auto p-4 max-w-5xl flex-1 flex flex-col">
                    <h1 className="text-3xl font-bold mb-8 text-center text-blue-950">Your Personal Space</h1>
                    {entries.length === 0 ? (
                        <div className="text-center mt-12">
                            <p className="text-md font-semibold text-blue-950">No journal entries yet. Start writing your thoughts!</p>
                        </div>
                    ) : (
                        <div className="flex-1 overflow-hidden">
                            <div className="h-full overflow-y-auto pb-8 pr-2">
                                {entries.map((entry) => (
                                    <div key={entry.id} className="relative group mb-4">
                                        <Link href={`/journal/entries/${entry.id}`} className="block">
                                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-6 mb-8 bg-white rounded-full shadow-lg hover:shadow-2xl hover:cursor-pointer transition-shadow">
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
                                                    <button type="submit" onClick={(e) => handleDelete(e, entry.id)} disabled={isDeleting === entry.id}
                                                    className={`p-2 ${isDeleting === entry.id ? 'text-gray-500' : 'text-red-500 hover:text-red-700 transition-colors'}`} aria-label="Delete Entry">
                                                        <FaTrash className="text-lg" />
                                                    </button>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}