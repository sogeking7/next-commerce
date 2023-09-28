import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuth } from '@clerk/nextjs/server'

export async function GET(req: NextRequest) {
  const products = await prisma.product.findMany()
  return NextResponse.json([...products])
}

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req)
  const { searchParams } = new URL(req.url)

  const productId = searchParams.get('productId')
  const quantity = Number(searchParams.get('quantity'))

  const user = await prisma.user.findUnique({
    where: {
      external_id: userId as string,
    },
    include: {
      cart: {
        include: {
          products: true,
        },
      },
    },
  })

  console.log('Log from backend: ', productId)
  if (!user) {
    return NextResponse.json(
      { message: `User with ID ${userId} not found\`` },
      { status: 400 },
    )
  } else {
    const cart = user.cart!
    const cartId = cart.id
    const cartProducts = cart.products

    const existingProductInCart = cartProducts.find(
      (productInCart) => productInCart.productId === productId,
    )

    if (existingProductInCart) {
      if (!quantity) {
        const removedProductInCart = await prisma.productsInCarts.delete({
          where: {
            cartId_productId: {
              cartId: cartId as string,
              productId: productId as string,
            },
          },
        })
        return NextResponse.json(
          {
            data: removedProductInCart,
            message: `Product with id ${productId} was removed from cart with id ${cart}`,
          },
          { status: 200 },
        )
      }
      const updatedProductsInCarts = await prisma.productsInCarts.update({
        where: {
          cartId_productId: {
            cartId: cartId as string,
            productId: productId as string,
          },
        },
        data: {
          quantity: quantity as number,
        },
      })
      return NextResponse.json(
        {
          data: updatedProductsInCarts,
          message: `Product with id ${productId} was added to cart with id ${cart}, current quantity: ${quantity}`,
        },
        { status: 200 },
      )
    }

    const newProductInCart = await prisma.productsInCarts.create({
      data: {
        cartId: cartId as string,
        productId: productId as string,
        quantity: quantity as number,
      },
    })

    return NextResponse.json(
      {
        data: newProductInCart,
        message: `Product with id ${productId} was added to cart with id ${cart}, current quantity: ${quantity}`,
      },
      { status: 200 },
    )
  }
}
