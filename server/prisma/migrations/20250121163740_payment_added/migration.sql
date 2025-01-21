/*
  Warnings:

  - You are about to drop the column `reservationId` on the `Payments` table. All the data in the column will be lost.
  - Added the required column `hotelId` to the `Payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_reservationId_fkey";

-- DropIndex
DROP INDEX "Payments_reservationId_idx";

-- AlterTable
ALTER TABLE "Payments" DROP COLUMN "reservationId",
ADD COLUMN     "hotelId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Payments_hotelId_idx" ON "Payments"("hotelId");

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
