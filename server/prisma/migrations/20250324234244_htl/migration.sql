/*
  Warnings:

  - The `status` column on the `Payments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `razorpay_order_id` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `razorpay_payment_id` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ReservationStatus` to the `Reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountPaid` to the `Reservations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "reservtionStatus" AS ENUM ('pending', 'active', 'cancled');

-- CreateEnum
CREATE TYPE "paymentStatus" AS ENUM ('pending', 'success', 'failed');

-- AlterTable
ALTER TABLE "Payments" ADD COLUMN     "razorpay_order_id" TEXT NOT NULL,
ADD COLUMN     "razorpay_payment_id" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "paymentStatus" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "Reservations" ADD COLUMN     "ReservationStatus" "reservtionStatus" NOT NULL,
ADD COLUMN     "amountPaid" INTEGER NOT NULL,
ADD COLUMN     "paymentStatus" "paymentStatus" NOT NULL DEFAULT 'pending',
ALTER COLUMN "checkIn" DROP DEFAULT,
ALTER COLUMN "reservationsDuration" DROP NOT NULL;
