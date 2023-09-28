import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuth } from '@clerk/nextjs/server'

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req)

  const user = await prisma.user.findUnique({
    where: {
      external_id: userId as string,
    },
    include: {
      cart: {
        include: {
          products: {
            include: {
              product: true
            }
          }
        },
      },
    },
  })

  const products = user?.cart?.products

  return NextResponse.json({ data: products }, { status: 200 })
}
