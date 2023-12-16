import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '~/server/db'

export default NuxtAuthHandler({
  debug: true,
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user_id: user.id,
      user
    })
  },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login'
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ],
  // A secret string you define, to ensure correct encryption
  secret: process.env.AUTH_SECRET,
})