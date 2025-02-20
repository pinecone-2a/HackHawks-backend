-- DropForeignKey
ALTER TABLE "donation" DROP CONSTRAINT "donation_donorId_fkey";

-- AlterTable
ALTER TABLE "donation" ALTER COLUMN "donorId" DROP NOT NULL,
ALTER COLUMN "donorName" DROP DEFAULT,
ALTER COLUMN "donorName" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "donation" ADD CONSTRAINT "donation_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
