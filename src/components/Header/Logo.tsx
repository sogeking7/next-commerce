import Link from 'next/link'
import React from 'react'

export default function Logo() {
  return (
    <Link href="/">
      <h1 className="font-medium text-2xl text-black whitespace-nowrap">
        Next.js Commerce
      </h1>
    </Link>
  )
}
