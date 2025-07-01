'use client';
import { JournalEditor } from "@/components/JournalEditor";

export default function CreateJournal() {
    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-center text-3xl font-bold mb-6">New Journal Entry</h1>
            <JournalEditor />
        </div>
    );
}