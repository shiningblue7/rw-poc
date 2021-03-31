-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "cmdbId" INTEGER;

-- CreateTable
CREATE TABLE "Cmdb" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "title" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cmdb.number_unique" ON "Cmdb"("number");

-- AddForeignKey
ALTER TABLE "Ticket" ADD FOREIGN KEY ("cmdbId") REFERENCES "Cmdb"("id") ON DELETE SET NULL ON UPDATE CASCADE;
