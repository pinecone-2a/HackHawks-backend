/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `CVC` to the `bankCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bankCard" ADD COLUMN     "CVC" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "donation" ALTER COLUMN "specialMessage" SET DEFAULT 'Thank you, good sir',
ALTER COLUMN "socialURLOrBuyMeACoffee" SET DEFAULT 'https://buymeacoffee.com/glpzghoo';

ALTER TABLE "donation" ADD COLUMN "donorName" VARCHAR NOT NULL DEFAULT 'Guest';


-- AlterTable
ALTER TABLE "profile" ALTER COLUMN "backgroundImage" DROP NOT NULL,
ALTER COLUMN "successMessage" SET DEFAULT 'Thank you good sir';


-- CreateTable
CREATE TABLE "otp" (
    "id" TEXT NOT NULL,
    "opt" INTEGER NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
