/*
  Warnings:

  - A unique constraint covering the columns `[userId,hotelId]` on the table `WishList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WishList_userId_hotelId_key" ON "WishList"("userId", "hotelId");
