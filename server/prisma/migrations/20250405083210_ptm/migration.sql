/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `Reservations` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Reservations" ADD COLUMN     "paymentId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Reservations_paymentId_key" ON "Reservations"("paymentId");

-- AddForeignKey
ALTER TABLE "Reservations" ADD CONSTRAINT "Reservations_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
