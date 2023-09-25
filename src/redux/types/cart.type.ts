import { TProduct } from '@/types/Shared/product'

type TCartItem = {
  count: number
  item: TProduct
}

export type TCartState = {
  items: TCartItem[]
}
