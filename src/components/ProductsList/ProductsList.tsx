'use client'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Product } from '@/components/Shared/Product/Product'
import { getProductsQuery } from '@/services/ProductsList/getProductsQuery'
import Loader from '@/components/Shared/Loader/Loader'

export const ProductsList = () => {
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: getProductsQuery,
  })

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
