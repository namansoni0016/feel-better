"use server";

import { signIn } from "@/app/utils/auth";

export async function signInWithGoogle() {
    await signIn("google");
}