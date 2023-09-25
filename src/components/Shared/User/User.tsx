import { UserButton, auth, clerkClient, currentUser } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/server'
import { IconUser } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'
import { redirect } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { setUser } from '@/redux/features/user/userSlice'
import axios from 'axios'

export const  MyUser = async () => {
  //     const { userId } = auth()

  //     if (!userId) {
  //     redirect('/sign-in')
  //   }

  // const user = await clerkClient.users.getUser(userId)

  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

axios
    .get('/api/auth')
    .then((res) => {
        console.log(res)
      dispatch(setUser(user))
    })
    .catch((error) => {
      console.error('Error fetching user:', error)
    })

  return <>{user.firstName}</>
}
