import axios from 'axios'

export const getUserCartQuery = async () => {
  return await axios.get('/api/user/cart').then((res) => res.data)
}
