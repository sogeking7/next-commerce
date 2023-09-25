import { RootState } from '@/redux/store'
import { TUser } from '@/types/Shared/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: TUser = {}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { setUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
