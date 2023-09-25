'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { IconShoppingCart } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

const CartButton = () => {
  const cart = useAppSelector((state) => state.cart.items.length)
  const dispatch = useAppDispatch()

  return (
    <Link href="/">
      <div className="h-8 w-16 flex items-center justify-between">
        <IconShoppingCart />
        <div className="text-sm bg-green-500 w-8 flex justify-center py-[2px] rounded-full text-white font-medium">
          {cart}
        </div>
      </div>
    </Link>
  )
}

export default CartButton
