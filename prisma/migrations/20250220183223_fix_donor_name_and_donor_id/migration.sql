/*
  Warnings:

  - Made the column `donorId` on table `donation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "donation" DROP CONSTRAINT "donation_donorId_fkey";

-- AlterTable
ALTER TABLE "donation" ALTER COLUMN "donorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "donation" ADD CONSTRAINT "donation_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
