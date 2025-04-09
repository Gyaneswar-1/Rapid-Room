-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_userId_fkey";

-- AlterTable
ALTER TABLE "Hotels" ADD COLUMN     "numberOfBathrooms" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "numberOfBeds" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "numberOfGuests" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "otpToken" TEXT DEFAULT '',
ADD COLUMN     "upiID" TEXT DEFAULT '';

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
