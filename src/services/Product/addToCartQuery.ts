import axios from 'axios'

export const addToCartQuery = async (query: any) => {
  const { productId, quantity } = query
  return await axios.post(
    `/api/product?productId=${productId}&quantity=${quantity}`,
  )
}
