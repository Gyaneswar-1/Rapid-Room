/*
  Warnings:

  - You are about to drop the `Reserved` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reserved" DROP CONSTRAINT "Reserved_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "Reserved" DROP CONSTRAINT "Reserved_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Reserved" DROP CONSTRAINT "Reserved_userId_fkey";

-- DropTable
DROP TABLE "Reserved";

-- CreateTable
CREATE TABLE "Reservations" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "hotelId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "Reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "id" SERIAL NOT NULL,
    "reservationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentMethod" TEXT NOT NULL DEFAULT 'UPI',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Payments_reservationId_idx" ON "Payments"("reservationId");

-- CreateIndex
CREATE INDEX "Payments_userId_idx" ON "Payments"("userId");

-- AddForeignKey
ALTER TABLE "Reservations" ADD CONSTRAINT "Reservations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservations" ADD CONSTRAINT "Reservations_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservations" ADD CONSTRAINT "Reservations_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
