import React from 'react'
import { TProduct } from '@/types/Shared/product'
import ProductAddToCartBtn from './ProductAddToCartBtn'

export const Product = ({ data }: { data: TProduct }) => {
  const { name } = data

  return (
    <div className="p-5 rounded-lg border">
      <div className="flex items-center justify-between">
        <h1 className="text-lg">{name}</h1>
        <ProductAddToCartBtn data={data} />
      </div>
    </div>
  )
}
