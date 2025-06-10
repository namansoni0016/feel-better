"use server";

import { signIn } from "@/app/utils/auth";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { signUpSchema } from "@/lib/zodSchemas";

export async function signInWithGoogle() {
    await signIn("google", { redirectTo: "/" });
}

export async function signUpWithCredentials(formData: FormData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const validatedData = signUpSchema.parse({name, email, password}); 

    const existingUser = await prisma.user.findUnique({
        where: { email: validatedData.email },
    });
    if(existingUser) throw new Error("User already exists!");

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const user = await prisma.user.create({
        data: {
            name: validatedData.name,
            email: validatedData.email,
            password: hashedPassword,
        }
    });
    return user;
}

export async function signInWithCredentials(formData: FormData) {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
    });
    if(result?.error) {
        throw new Error(result.error);
    }
    return { success: true };
}