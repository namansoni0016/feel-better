"use client";
import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { profileSchema } from "@/lib/zodSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "next-auth";
import { Input } from "./ui/input";
import { z } from "zod";
import { SubmitButton } from "./SubmitButton";
import { updateProfile } from "@/actions/authActions";
import toast from "react-hot-toast";

type ProfileFormValues = z.infer<typeof profileSchema>;

export function EditProfileModal({ user }: { user: User}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user.name || "",
        }
    });
    const onSubmit = async (data: ProfileFormValues) => {
        setIsSubmitting(true);
        try {
            const result = await updateProfile(data);
            if(result?.success) {
                toast.success("Profile updated successfully!");
                setIsOpen(false);
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to update profile!");
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsOpen(true)}>
                <Pencil className="size-4" />
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-gray-700">Edit Profile</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700">Full Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <SubmitButton text="Save Changes" isLoading={isSubmitting} />
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}