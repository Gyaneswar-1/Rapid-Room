/*
  Warnings:

  - You are about to drop the column `checkIn` on the `Rooms` table. All the data in the column will be lost.
  - You are about to drop the column `checkOut` on the `Rooms` table. All the data in the column will be lost.
  - Added the required column `checkOut` to the `Reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reservationsDuration` to the `Reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservations" ADD COLUMN     "checkIn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "checkOut" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "reservationsDuration" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Rooms" DROP COLUMN "checkIn",
DROP COLUMN "checkOut";
