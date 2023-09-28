import React from 'react'
import Link from 'next/link'
import { IconHeart } from '@tabler/icons-react'
// import { UserButton } from '@clerk/nextjs'
import { ReduxProvider } from '@/redux/provider'
import CartButton from './CartButton'
import { Input } from '@/components/ui/input'
import Logo from './Logo'
import { MyUser } from '../Shared/User/User'
import { SignInButton, SignedIn, UserButton } from '@clerk/nextjs'

export default function Header() {
  return (
    <header className="py-4 border-bottom border">
      <nav className="container flex gap-8 items-center justify-between">
        <Logo />
        <div className="w-2/5">
          <Input placeholder="Search for products"></Input>
        </div>
        <nav className="gap-5 flex items-center">
          <ReduxProvider>
            <CartButton />
          </ReduxProvider>
          <Link href="/">
            <IconHeart />
          </Link>
          <MyUser />
        </nav>
      </nav>
    </header>
  )
}
