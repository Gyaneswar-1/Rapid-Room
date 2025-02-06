/*
  Warnings:

  - The `latitude` column on the `Address` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `longitude` column on the `Address` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `ownerId` on the `Hotels` table. All the data in the column will be lost.
  - You are about to drop the column `comment` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `isOwner` on the `Users` table. All the data in the column will be lost.
  - Added the required column `hostId` to the `Hotels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomType` to the `Hotels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewComment` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Hotels" DROP CONSTRAINT "Hotels_ownerId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "latitude",
ADD COLUMN     "latitude" DECIMAL(65,30),
DROP COLUMN "longitude",
ADD COLUMN     "longitude" DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Hotels" DROP COLUMN "ownerId",
ADD COLUMN     "hasBalcony" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasGarden" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasGrummingEqupments" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasKitchen" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasTv" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasWashingMachine" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasWorkSpace" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hostId" INTEGER NOT NULL,
ADD COLUMN     "roomType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "comment",
DROP COLUMN "rating",
ADD COLUMN     "accuracyRating" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "checkInRating" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "cleanlinessRating" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "communicationRating" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "locationRating" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "overallRating" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "parkingRating" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "priceRating" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "reviewComment" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "isOwner",
ADD COLUMN     "hostExperience" INTEGER,
ADD COLUMN     "hostRating" INTEGER DEFAULT 5,
ADD COLUMN     "hostResponseRate" INTEGER DEFAULT 100,
ADD COLUMN     "isHost" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Hotels" ADD CONSTRAINT "Hotels_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
