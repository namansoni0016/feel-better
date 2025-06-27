"use server";

import { auth } from "@/app/utils/auth";
import prisma from "@/lib/prisma";

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