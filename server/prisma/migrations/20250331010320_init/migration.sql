-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "paymentStatus" ADD VALUE 'refund';
ALTER TYPE "paymentStatus" ADD VALUE 'refunded';

-- AlterTable
ALTER TABLE "Hotels" ADD COLUMN     "guestAllowed" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Payments" ADD COLUMN     "hostAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "platformFee" DOUBLE PRECISION NOT NULL DEFAULT 0;
