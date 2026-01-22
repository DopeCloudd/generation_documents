const { PrismaClient } = require("@prisma/client")
const { hashPassword } = require("better-auth/crypto")
const { randomUUID } = require("crypto")

const prisma = new PrismaClient()

const users = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: "Admin1234!",
    role: "ADMIN",
  },
  {
    name: "User",
    email: "user@example.com",
    password: "User1234!",
    role: "USER",
  },
]

async function main() {
  for (const user of users) {
    const passwordHash = await hashPassword(user.password)

    const upsertedUser = await prisma.user.upsert({
      where: { email: user.email.toLowerCase() },
      update: {
        name: user.name,
        role: user.role,
        emailVerified: true,
        updatedAt: new Date(),
      },
      create: {
        id: randomUUID(),
        name: user.name,
        email: user.email.toLowerCase(),
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: user.role,
      },
    })

    const existingAccount = await prisma.account.findFirst({
      where: {
        userId: upsertedUser.id,
        providerId: "credential",
      },
    })

    if (existingAccount) {
      await prisma.account.update({
        where: { id: existingAccount.id },
        data: {
          password: passwordHash,
          updatedAt: new Date(),
        },
      })
    } else {
      await prisma.account.create({
        data: {
          id: randomUUID(),
          userId: upsertedUser.id,
          providerId: "credential",
          accountId: upsertedUser.id,
          password: passwordHash,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
