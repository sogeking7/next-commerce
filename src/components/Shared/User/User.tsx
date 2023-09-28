// 'use client'
import React, { useEffect } from 'react'
import { SignInButton, UserButton, auth, useUser } from '@clerk/nextjs'
import { IconUser } from '@tabler/icons-react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setUser } from '@/redux/features/user/userSlice'
import Image from 'next/image'
import Link from 'next/link'

// export const MyUser = () => {
//   const { user } = useUser()

//   const User = useAppSelector((state) => state.user)
//   const dispatch = useAppDispatch()

//   useEffect(() => {
//     dispatch(
//       setUser({
//         id: user?.id,
//         firstName: user?.firstName,
//         username: user?.username,
//         imageUrl: user?.imageUrl,
//       }),
//     )
//   }, [user])

//   return (
//     <>
//       {User ? (
//         <Link href="#">
//           <Image
//             alt="user"
//             className="rounded-full"
//             width={32}
//             height={32}
//             quality={100}
//             src={User.imageUrl}
//           />
//         </Link>
//       ) : (
//         <IconUser />
//       )}
//     </>
//   )
// }

export const MyUser = () => {
  const { userId }: { userId: string | null } = auth()
  if (!userId) {
    return <SignInButton />
  }
  return <UserButton />
}
