import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const fruits = ['Apple', 'Oranage', 'Pineapple', 'Banana', 'Grapes']
async function main() {
  const user = await prisma.product.createMany({
    data: [
      {
        name: 'Apple',
      },
      {
        name: 'Orange',
      },
      {
        name: 'Pineapple',
      },
      {
        name: 'Banana',
      },
    ],
  })

  console.log({ user })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit()
  })
