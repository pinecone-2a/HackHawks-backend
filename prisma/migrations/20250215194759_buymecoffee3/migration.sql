/*
  Warnings:

  - You are about to drop the column `opt` on the `otp` table. All the data in the column will be lost.
  - Added the required column `otp` to the `otp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "otp" DROP COLUMN "opt",
ADD COLUMN     "otp" INTEGER NOT NULL;
