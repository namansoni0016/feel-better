'use client';

import { EditorContent, useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useState } from "react";
import { Button } from "./ui/button";
import { FaEraser, FaUnderline, FaBold, FaItalic, FaStrikethrough } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import { createJournalEntry } from "@/actions/journalActions";
import toast from "react-hot-toast";

export function JournalEditor({ initialContent = '' }: { initialContent?: string }) {
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isClearing, setIsClearing] = useState<boolean>(false);
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write your thoughts here....',
            }),
            Underline,
        ],
        content: initialContent,
    });
    const handleSave = async () => {
        if(!editor) return;
        setIsSaving(true);
        try {
            const content = editor.getHTML();
            const result = await createJournalEntry(content);
            if(result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error("Failed to save journal: ", error);
            toast.error("An unexpected error occured. Please try again!");
        } finally {
            editor.commands.clearContent();
            setIsSaving(false);
        }
    };
    const handleClear = async () => {
        if(!editor) return;
        setIsClearing(true);
        try {
            editor.commands.clearContent();
        } finally {
            setIsClearing(false);
        }
    };
    return (
        <>
            <div className="flex flex-col h-full">
                <div className="flex flex-wrap justify-center items-center gap-1 p-1 mb-2 max-w-[180px] bg-gray-100 rounded-full border-b">
                    <Button variant={editor?.isActive('bold') ? 'default' : 'ghost'} size="sm"
                        onClick={() => editor?.chain().focus().toggleBold().run()}
                        disabled={!editor?.can().chain().focus().toggleBold().run()}>
                        <FaBold className="size-4" />
                    </Button>
                    <Button variant={editor?.isActive('italic') ? 'default' : 'ghost'} size="sm"
                        onClick={() => editor?.chain().focus().toggleItalic().run()}
                        disabled={!editor?.can().chain().focus().toggleItalic().run()}>
                        <FaItalic className="size-4" />
                    </Button>
                    <Button variant={editor?.isActive('underline') ? 'default' : 'ghost'} size="sm"
                        onClick={() => editor?.chain().focus().toggleUnderline().run()}
                        disabled={!editor?.can().chain().focus().toggleUnderline().run()}>
                        <FaUnderline className="size-4" />
                    </Button>
                    <Button variant={editor?.isActive('strike') ? 'default' : 'ghost'} size="sm"
                        onClick={() => editor?.chain().focus().toggleStrike().run()}
                        disabled={!editor?.can().chain().focus().toggleStrike().run()}>
                        <FaStrikethrough className="size-4" />
                    </Button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="p-4 bg-white rounded-lg min-h-[60vh] max-h-[60vh] overflow-y-auto">
                        <EditorContent editor={editor} className="focus:outline-none prose max-w-none h-full" />
                    </div>
                </div>
                <div className="text-sm font-semibold text-blue-950 mt-2">
                    {editor?.getText().split(/\s+/).filter(Boolean).length || 0} words
                </div>
                <div className="flex justify-end mt-2 gap-4">
                    <Button variant="destructive" className="font-bold" onClick={handleClear} disabled={isClearing || !editor?.getText()}>
                        <FaEraser className="size-4" />
                        {isClearing ? "Clearing..." : "Clear"}
                    </Button>
                    <Button onClick={handleSave} className="font-bold" disabled={isSaving || !editor?.getText()}>
                        <IoIosSave className="size-4" />
                        {isSaving ? "Saving..." : "Save Journal"}
                    </Button>
                </div>
            </div>
        </>
    );
}