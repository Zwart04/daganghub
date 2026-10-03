import NextAuth from 'next-auth';

// next-auth v5 beta: AuthOptions type not exported as named — use any for compatibility
export const authOptions: any = {
  providers: [
    {
      id: 'huggingface',
      name: 'Hugging Face',
      type: 'oauth' as const,
      clientId: process.env.HF_CLIENT_ID!,
      clientSecret: process.env.HF_CLIENT_SECRET!,
      authorization: 'https://huggingface.co/oauth/authorize',
      token: 'https://huggingface.co/oauth/token',
      userinfo: 'https://huggingface.co/api/whoami-v2',
      profile(profile: any) {
        return {
          id: profile.name || profile.sub,
          name: profile.name || profile.fullname,
          email: profile.email,
          image: profile.avatarUrl,
        };
      },
    },
  ],
  session: { strategy: 'jwt' as const },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
