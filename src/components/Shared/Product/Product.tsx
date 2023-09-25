'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { addProduct, removeProduct } from '@/redux/features/cart/cartSlice'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import { TProduct } from '@/types/Shared/product'

export const Product = ({ data }: { data: TProduct }) => {
  const { name, id } = data

  const productCount = useAppSelector((state) => {
    const index = state.cart.items.findIndex((value) => value.item.id === id)
    return index === -1 ? 0 : state.cart.items[index].count
  })

  const dispatch = useAppDispatch()

  const handleAddToCart = () => {
    dispatch(addProduct(data))
  }
  const handleRemoveFromCart = () => {
    dispatch(removeProduct(data))
  }

  return (
    <div className="p-5 rounded-lg border">
      <div className="flex items-center justify-between">
        <h1 className="text-lg">{name}</h1>

        {!productCount ? (
          <Button
            size="sm"
            onClick={handleAddToCart}
            radius="full"
            className="w-28"
          >
            Add to Cart
          </Button>
        ) : (
          <div className="flex items-center justify-between  rounded-full h-8 w-28 bg-green-500">
            <button
              onClick={handleRemoveFromCart}
              className="px-2 hover:bg-green-600 h-full rounded-tl-2xl rounded-bl-2xl flex justify-center items-center "
            >
              <IconMinus size={20} color="white" />
            </button>
            <span className="text-sm w-10 text-center font-bold text-white">
              {productCount}
            </span>
            <button
              onClick={handleAddToCart}
              className="px-2 hover:bg-green-600 h-full rounded-br-2xl rounded-tr-2xl flex justify-center items-center "
            >
              <IconPlus size={20} color="white" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
