import NextAuth, { type NextAuthOptions } from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../server/db/client';

export const authOptions: NextAuthOptions = {
    // Include user.id on session
    callbacks: {
        session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;
            }
            return session;
        }
    },
    // Configure one or more authentication providers
    adapter: PrismaAdapter(prisma),
    providers: [
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID ?? '',
            clientSecret: process.env.TWITTER_CLIENT_SECRET ?? ''
        })
    ]
};

export default NextAuth(authOptions);
