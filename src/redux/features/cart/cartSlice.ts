import { RootState } from '@/redux/store'
import { TCartState } from '@/redux/types/cart.type'
import { TProduct } from '@/types/Shared/product'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState: TCartState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' |  'succeed' | 'failed'
  error: null,
}

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  try {
    const response = await axios.get('api/user/cart')
    return response.data
  } catch (err) {
    return err
  }
})

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const productId = action.payload.id
      const index = state.items.findIndex(
        (value) => value.item.id === productId,
      )
      if (index === -1) {
        state.items.push({
          count: 1,
          item: action.payload,
        })
      } else {
        state.items[index].count += 1
      }
    },
    removeProduct: (state, action) => {
      const productId = action.payload.id
      const index = state.items.findIndex(
        (value) => value.item.id === productId,
      )
      if (state.items[index].count > 1) {
        state.items[index].count--
      } else {
        state.items.splice(index, 1)
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCart.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeed'
        const loadedCart = action.payload.data.map((cartItem: any) => {
          const formatted_product: TProduct = {
            id: cartItem.product.id,
            name: cartItem.product.name,
          }
          return {
            count: cartItem.quantity,
            item: formatted_product,
          }
        })
        state.items = loadedCart
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { addProduct, removeProduct } = cartSlice.actions

export const selectCartProductQuantity = (state: RootState, id: string) => {
  const index = state.cart.items.findIndex((value) => value.item?.id === id)
  return index === -1 ? 0 : state.cart.items[index].count
}

export const selectCartItems = (state: RootState) => state.cart.items
export const selectCartStatus = (state: RootState) => state.cart.status
export const selectCartError = (state: RootState) => state.cart.error

export default cartSlice.reducer
