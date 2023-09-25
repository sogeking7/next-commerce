import { RootState } from '@/redux/store'
import { TCartState } from '@/redux/types/cart.type'
import { createSlice } from '@reduxjs/toolkit'

const initialState: TCartState = {
  items: [],
}

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
})

export const { addProduct, removeProduct } = cartSlice.actions

export const selectCart = (state: RootState) => state.cart

export default cartSlice.reducer
