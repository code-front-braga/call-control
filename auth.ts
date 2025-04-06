import { db } from '@/lib/db/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import authConfig from './auth.config';

export const {
	handlers: { GET, POST },
	signIn,
	signOut,
	auth,
} = NextAuth({
	adapter: PrismaAdapter(db),
	session: { strategy: 'database' },
	...authConfig,
	callbacks: {
		async session({ session, user }) {
			session.user = { ...session.user, id: user.id } as {
				id: string;
				name: string;
				email: string;
			};

			return session;
		},
	},
});
