/*
  Warnings:

  - You are about to drop the column `cmdbId` on the `Ticket` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_cmdbId_fkey";

-- AlterTable
ALTER TABLE "Choice" ALTER COLUMN "column" DROP DEFAULT,
ALTER COLUMN "displayValue" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "cmdbId";
