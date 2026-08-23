import NextAuth from 'next-auth';
import type { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [
    {
      id: 'huggingface',
      name: 'Hugging Face',
      type: 'oauth',
      clientId: process.env.HF_CLIENT_ID!,
      clientSecret: process.env.HF_CLIENT_SECRET!,
      authorization: 'https://huggingface.co/oauth/authorize',
      token: 'https://huggingface.co/oauth/token',
      userinfo: 'https://huggingface.co/api/whoami-v2',
      profile(profile) {
        return {
          id: profile.name || profile.sub,
          name: profile.name || profile.fullname,
          email: profile.email,
          image: profile.avatarUrl,
        };
      },
    },
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
