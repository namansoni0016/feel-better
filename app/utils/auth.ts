import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { loginSchema } from "@/lib/zodSchemas";
import { v4 as uuid } from "uuid";
import { encode } from "next-auth/jwt";
import bcrypt from "bcrypt";

const adapter = PrismaAdapter(prisma);

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter,
    providers: [Google, Credentials({
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
            try {
                const validatedCredentials = loginSchema.parse(credentials);
                const user = await prisma.user.findUnique({
                    where: { email: validatedCredentials.email },
                });
                if(!user) {
                    return null;
                }
                if(!user.password) {
                    throw new Error("User registered with different method!");
                }
                const isValid = await bcrypt.compare(validatedCredentials.password, user.password);
                if(!isValid) {
                    return null;
                }
                return user;
            } catch (error) {
                console.error(error);
                return null;
            }
        },
    }),],
    callbacks: {
        async jwt({token, account}) {
            if(account?.provider === "credentials") {
                token.credentials = true;
            }
            return token;
        },
    },
    jwt: {
        encode: async function (params) {
            if(params.token?.credentials) {
                const sessionToken = uuid();
                if(!params.token.sub) {
                    throw new Error("No user ID found in token");
                }
                const createdSession = await adapter?.createSession?.({
                    sessionToken: sessionToken,
                    userId: params.token.sub,
                    expires: new Date(Date.now() + 30*24*60*60*1000),
                });
                if(!createdSession) {
                    throw new Error("Failed to create session");
                }
                return sessionToken;
            }
            return encode(params);
        }
    }
});