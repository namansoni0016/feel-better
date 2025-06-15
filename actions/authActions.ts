"use server";

import { auth, signIn } from "@/app/utils/auth";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { profileSchema, signUpSchema } from "@/lib/zodSchemas";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export async function signInWithGoogle() {
    await signIn("google", { redirectTo: "/" });
}

export async function signUpWithCredentials(formData: FormData) {
    try {
        const name = formData.get("name")?.toString();
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();
        const validatedData = signUpSchema.safeParse({name, email, password}); 
        if(!validatedData.success) {
            return { success: false, error: "Validation Failed!", fieldErrors: validatedData.error.flatten().fieldErrors }
        }
        const existingUser = await prisma.user.findUnique({
            where: { email: validatedData.data.email },
        });
        if(existingUser) {
            return { success: false, error: "User with this email already exists!", field: "email" };
        }
        const hashedPassword = await bcrypt.hash(validatedData.data.password, 10);
        const user = await prisma.user.create({
            data: {
                name: validatedData.data.name,
                email: validatedData.data.email,
                password: hashedPassword,
            }
        });
        return { success: true };
    } catch (error) {
        console.error("Signup error: ", error);
        if(error instanceof AuthError) {
            return { success: false, error: error.message, field: null };
        }
        return { success: false, error: "Something went wrong during signup!", field: null };
    }
}

export async function signInWithCredentials(formData: FormData) {
    try {
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        if(result?.error) {
            if(result.error.includes("CallbackRouteError")) {
                return { success: false, error: "Invalid email or password!", field: null };
            }
            return { success: false, error: result.error, field: null }
        }
        return { success: true };
    } catch (error) {
        console.error(error);
        if(error instanceof AuthError) {
            if(error.type === "CredentialsSignin") {
                return { success: false, error: "Invalid email or password!" };
            }
        }
        return { success: false, error: "Something went wrong. Please try again!", field: null };
    }
}

export async function updateProfile(data: unknown) {
    const session = await auth();
    if(!session?.user?.id) {
        throw new Error("Unauthorized!");
    }
    try {
        const validatedData = profileSchema.parse(data);
        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                name: validatedData.name,
                image: validatedData.image,
            },
        });
        revalidatePath("/profile");
        return { success: true, user: updatedUser };
    } catch (error) {
        console.error("Update failed: ", error);
        throw new Error("Failed to updated profile!");
    }
}