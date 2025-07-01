"use server";

import { auth } from "@/app/utils/auth";
import prisma from "@/lib/prisma";
import { format } from "date-fns";

interface JournalEntryResponse {
    success: boolean,
    message: string,
    entry: {
        id: string,
        content: string,
        userId: string,
        createdAt: Date,
        updatedAt: Date,
    } | null;
}

export async function createJournalEntry(content: string): Promise<JournalEntryResponse> {
    const session = await auth();
    if(!session?.user?.id) {
        return {
            success: false,
            message: "Unauthorized! Please login!",
            entry: null
        };
    }
    try {
        const entry = await prisma.journalEntry.create({
            data: {
                content,
                userId: session.user.id,
            }
        });
        return {
            success: true,
            message: "Journal saved successfully!",
            entry
        };
    } catch (error) {
        console.error("Error saving journal: ", error);
        return {
            success: false,
            message: "Failed to save journal! Please try again!",
            entry: null,
        };
    }
}

export async function getJournalEntries() {
    const session = await auth();
    if(!session?.user?.id) {
        throw new Error("Unauthorized!");
    }
    try {
        const entries = await prisma.journalEntry.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" },
        });
        return entries.map(entry => ({
            ...entry,
            formattedDate: format(entry.createdAt, "dd MMMM yyyy"),
            formattedTime: format(entry.createdAt, "h:mm a"),
        }));
    } catch (error) {
        console.error("Error fetching entries: ", error);
        throw new Error("Failed to fetch journal entries!");
    }
}

export async function deleteJournalEntry(entryId: string) {
    const session = await auth();
    if(!session?.user?.id) {
        return { success: false, message: "Unauthorized!"};
    }
    try {
        const entry = await prisma.journalEntry.findUnique({
            where: { id: entryId },
        });
        if(entry?.userId !== session.user.id) {
            return { success: false, message: "Not authorized to delete this entry!" };
        }
        await prisma.journalEntry.delete({
            where: { id: entryId },
        });
        return { success: true, message: "Entry deleted successfully!" };
    } catch (error) {
        console.error("Error deleting entry: ", error);
        return { success: false, message: "Failed to delete journal entry!" };
    }
}

export async function getJournalEntry(entryId: string) {
    const session = await auth();
    if(!session?.user?.id) {
        throw new Error("Unauthorized!");
    }
    try {
        const entry = await prisma.journalEntry.findUnique({
            where: { id: entryId },
        });
        if(!entry || entry.userId !== session.user.id) {
            return null;
        }
        return {
            ...entry,
            formattedDate: format(entry.createdAt, "dd MMMM yyyy"),
            formattedTime: format(entry.createdAt, "h:mm a"),
        };
    } catch (error) {
        console.error("Error fetching entry: ", error);
        throw new Error("Failed to fetch journal entry!");
    }
}