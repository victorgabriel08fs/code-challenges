import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { prisma } from '../../../lib/prisma';

if (!process.env.GITHUB_CLIENT_SECRET || !process.env.GITHUB_CLIENT_ID) {
    throw new Error("Failed to initialize Gitbub authentication!");
}

export const authOptions: NextAuthOptions = {
    secret: process.env.SECRET,
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    ]
}

export default NextAuth(authOptions);