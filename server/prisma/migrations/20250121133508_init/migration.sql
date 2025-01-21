/*
  Warnings:

  - You are about to drop the column `isAllBooked` on the `Hotels` table. All the data in the column will be lost.
  - You are about to drop the column `isBooked` on the `Rooms` table. All the data in the column will be lost.
  - You are about to drop the `Booked` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `numberOfEmptyRooms` to the `Hotels` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booked" DROP CONSTRAINT "Booked_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "Booked" DROP CONSTRAINT "Booked_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Booked" DROP CONSTRAINT "Booked_userId_fkey";

-- DropForeignKey
ALTER TABLE "Hotels" DROP CONSTRAINT "Hotels_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Hotels" DROP CONSTRAINT "Hotels_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "Rooms" DROP CONSTRAINT "Rooms_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "WishList" DROP CONSTRAINT "WishList_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "WishList" DROP CONSTRAINT "WishList_userId_fkey";

-- AlterTable
ALTER TABLE "Hotels" DROP COLUMN "isAllBooked",
ADD COLUMN     "isAllReserved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "numberOfEmptyRooms" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Rooms" DROP COLUMN "isBooked",
ADD COLUMN     "isReserved" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Booked";

-- CreateTable
CREATE TABLE "Reserved" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "hotelId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "Reserved_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Hotels" ADD CONSTRAINT "Hotels_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hotels" ADD CONSTRAINT "Hotels_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserved" ADD CONSTRAINT "Reserved_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserved" ADD CONSTRAINT "Reserved_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserved" ADD CONSTRAINT "Reserved_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
