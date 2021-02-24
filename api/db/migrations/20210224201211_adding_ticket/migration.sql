/*
  Warnings:

  - You are about to drop the column `assignedToId` on the `Ticket` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_assignedToId_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "assignedToId",
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Ticket" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
