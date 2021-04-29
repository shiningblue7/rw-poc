/*
  Warnings:

  - Added the required column `ticketId` to the `TicketNote` table without a default value. This is not possible if the table is not empty.
  - Made the column `field` on table `TicketNote` required. This step will fail if there are existing NULL values in that column.
  - Made the column `value` on table `TicketNote` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `TicketNote` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TicketNote" ADD COLUMN     "ticketId" INTEGER NOT NULL,
ALTER COLUMN "field" SET NOT NULL,
ALTER COLUMN "value" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "TicketNote" ADD FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;
