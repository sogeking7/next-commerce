'use client'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  addProduct,
  removeProduct,
  selectCartProductQuantity,
} from '@/redux/features/cart/cartSlice'
import { addToCartQuery } from '@/services/Product/addToCartQuery'
import { TProduct } from '@/types/Shared/product'
import { Button } from '@/components/ui/button'
import { IconMinus, IconPlus } from '@tabler/icons-react'

const ProductAddToCartBtn = ({ data }: { data: TProduct }) => {
  const { id } = data

  const productCount = useAppSelector((state) =>
    selectCartProductQuantity(state, id),
  )
  const dispatch = useAppDispatch()

  const handleAddToCart = () => {
    dispatch(addProduct(data))
    const query = {
      productId: id,
      quantity: productCount + 1,
    }
    addToCartQuery(query)
  }

  const handleRemoveFromCart = () => {
    dispatch(removeProduct(data))
    const query = {
      productId: id,
      quantity: productCount - 1,
    }
    addToCartQuery(query)
  }

  return (
    <>
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
    </>
  )
}

export default ProductAddToCartBtn
