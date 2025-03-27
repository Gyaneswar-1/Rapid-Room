/*
  Warnings:

  - You are about to drop the column `drafted` on the `Hotels` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Hotels" DROP COLUMN "drafted",
ADD COLUMN     "status" "status" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Reservations" ALTER COLUMN "ReservationStatus" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "status" NOT NULL DEFAULT 'PENDING';
