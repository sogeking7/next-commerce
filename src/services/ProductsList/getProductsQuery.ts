import axios from 'axios'

export const getProductsQuery = async () => {
  return await axios.get('/api/product').then((res) => res.data)
}
