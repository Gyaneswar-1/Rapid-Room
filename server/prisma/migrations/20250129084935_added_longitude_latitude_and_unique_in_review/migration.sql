/*
  Warnings:

  - A unique constraint covering the columns `[userId,hotelId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "latitude" TEXT,
ADD COLUMN     "longitude" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_hotelId_key" ON "Review"("userId", "hotelId");
