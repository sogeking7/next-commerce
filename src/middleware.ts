import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  // "/" will be accessible to all users
  publicRoutes: ['/', '/api/webhooks/user', '/api/product'],
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)', '/api/webhooks/user'],
}
