import { NextRequest } from 'next/server'
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const authHandler = NextAuth(authOptions)

async function handler(req: NextRequest, ctx: { params?: { nextauth?: string[] } }) {
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host')
  const proto = req.headers.get('x-forwarded-proto') || (host?.includes('localhost') ? 'http' : 'https')
  if (host) {
    process.env.NEXTAUTH_URL = `${proto}://${host}`
  }
  return (authHandler as any)(req, ctx)
}

export { handler as GET, handler as POST }
