'use client'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { Product } from '@/components/Shared/Product/Product'
import { getProductsQuery } from '@/services/ProductsList/getProductsQuery'
import Loader from '@/components/Shared/Loader/Loader'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  fetchCart,
  selectCartItems,
  selectCartStatus,
} from '@/redux/features/cart/cartSlice'

export const ProductsList = () => {
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: getProductsQuery,
  })

  const dispatch = useAppDispatch()

  const cartStatus = useAppSelector(selectCartStatus)
  const cartError = useAppSelector(selectCartStatus)
  const cartItems = useAppSelector(selectCartItems)

  useEffect(() => {
    if (cartStatus === 'idle') {
      dispatch(fetchCart())
    }
  }, [cartStatus, dispatch])

  console.log("cartItems: ", cartItems)


  return (
    <>
      {data ? (
        <div className="flex gap-3 flex-col">
          {data.map((item: any) => (
            <Product key={item.id} data={item} />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}
