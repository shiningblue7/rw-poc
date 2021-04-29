/*
  Warnings:

  - You are about to drop the `Choice` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "state" SET DEFAULT E'new',
ALTER COLUMN "state" SET DATA TYPE TEXT,
ALTER COLUMN "priority" SET DEFAULT E'low',
ALTER COLUMN "priority" SET DATA TYPE TEXT,
ALTER COLUMN "impact" SET DEFAULT E'low',
ALTER COLUMN "impact" SET DATA TYPE TEXT,
ALTER COLUMN "urgency" SET DEFAULT E'low',
ALTER COLUMN "urgency" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Choice";
