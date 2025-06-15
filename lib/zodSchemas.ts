import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email({ message: "Email is required!" }),
    password: z.string().min(1, { message: "Password is required!" }),
});

const signUpSchema = z.object({
    name: z.string().min(1, { message: "Name is required!" }),
    email: z.string().email({ message: "Email is required!" }),
    password: z.string().min(6, { message: "Password should be 6 characters long!" }),
});

const profileSchema = z.object({
    name: z.string().min(1, { message: "Name is required!" }),
    image: z.string().url().optional(),
})

export { loginSchema, signUpSchema, profileSchema };