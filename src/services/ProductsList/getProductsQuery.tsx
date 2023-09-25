import axios from 'axios'

export const getProductsQuery = async () => {
  return await axios('/api/product').then((res) => res.data)
}
