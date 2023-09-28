// filename: db-reset.ts

import { prisma } from "@/lib/prisma"

// use: npx ts-node db-reset.ts

// add more tables if Required
const tableNames = ['User', 'Cart', 'Product', 'ProductsInCarts']


async function main() {
  for (const tableName of tableNames)
    await prisma.$queryRawUnsafe(
      `Truncate "${tableName}" restart identity cascade;`,
    )
}

main().finally(async () => {
  await prisma.$disconnect()
})
