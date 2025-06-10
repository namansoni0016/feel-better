import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

const signUpSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1),
})

export { loginSchema, signUpSchema };