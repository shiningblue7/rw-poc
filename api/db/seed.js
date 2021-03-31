/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')

dotenv.config()
const db = new PrismaClient()

async function main() {
  // https://www.prisma.io/docs/guides/prisma-guides/seed-database
  // Seed data is database data that needs to exist for your app to run.
  // Ideally this file should be idempotent: running it multiple times
  // will result in the same database state (usually by checking for the
  // existence of a record before trying to create it). For example:
  /*
    const result = await db.user.createMany({
      data: [
        { email: "alice@example.com" },
        { email: "mark@example.com" },
        { email: "jackie@example.com" },
        { email: "bob@example.com" },
      ],
      skipDuplicates: true, // Supported with Postgres database
    })
    console.log(`Created ${result.count} users!`)
  */
  // Note: createMany creates multiple records in a transaction.
  // To enable this feature, add createMany to previewFeatures in your schema.
  // See: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany-preview
  // Note: createMany is not supported by SQLite.
  //
  // Example without createMany (supported by all databases):
  /*
    const existing = await db.user.findMany({ where: { email: 'admin@email.com' }})
    if (!existing.length) {
      await db.user.create({ data: { name: 'Admin', email: 'admin@email.com' }})
    }
  */

  //console.info('No data to seed. See api/db/seed.js for info.')
  const resultUsers = await db.user.createMany({
    data: [
      { email: "kevin@example.com", userName: "kevin", name: "Kevin" },
      { email: "jace@benson.run", userName: "jacebenson", name: "Jace" },
      { email: "alice@example.com", userName: "alice", name: "Alice" },
      { email: "mark@example.com", userName: "mark", name: "Mark" },
      { email: "jackie@example.com", userName: "jackie", name: "Jackie" },
      { email: "bob@example.com", userName: "bob", name: "Bob" },
    ],
    skipDuplicates: true, // Supported with Postgres database
  })
  console.log(`Created ${resultUsers.count} users!`)
  const resultTickets = await db.ticket.createMany({
    data: [
      { number: "1000", title: "Lost iPhone", userId: 1 },
      { number: "1001", title: "iPhone screen is cracked", userId: 1 },
      { number: "1002", title: "iPhone won't hold a charge", userId: 1 },
      { number: "1003", title: "iPhone only shows a blank screen", userId: 1 },
      { number: "1004", title: "iPhone is overheating", userId: 1 },
      { number: "1005", title: "Samsung Apps won't download", userId: 2 },
      { number: "1006", title: "Samsung bad autocorrect suggestions", userId: 2 },
      { number: "1007", title: "Samsung Google Play not working", userId: 2 },
      { number: "1008", title: "Samsung Google Play doesn't download apps", userId: 2 },
      { number: "1009", title: "Samsung Google Play disappeared", userId: 2 },
    ],
    skipDuplicates: true, // Supported with Postgres database
  })
  console.log(`Created ${resultTickets.count} tickets!`)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect()
  })
