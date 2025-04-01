/*
  Warnings:

  - The values [BEACH,BUDGET,AMAZING_POOLS,SURFING,BOATS,TOP_OF_THE_WORLD,TOP_CITIES,TREEHOUSES,CABINS,TINY_HOMES,MANSIONS] on the enum `HotelType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "HotelType_new" AS ENUM ('CITY', 'MOUNTAIN', 'RESORT', 'LUXURY', 'AMAZING_VIEWS', 'FARMS', 'HISTORICAL_HOMES', 'BEACHFRONT', 'LAKEFRONT', 'CASTLES', 'CAMPING', 'TROPICAL', 'ARCTIC', 'ISLANDS', 'COUNTRYSIDE');
ALTER TABLE "Hotels" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Hotels" ALTER COLUMN "type" TYPE "HotelType_new" USING ("type"::text::"HotelType_new");
ALTER TYPE "HotelType" RENAME TO "HotelType_old";
ALTER TYPE "HotelType_new" RENAME TO "HotelType";
DROP TYPE "HotelType_old";
ALTER TABLE "Hotels" ALTER COLUMN "type" SET DEFAULT 'CITY';
COMMIT;

-- AlterTable
ALTER TABLE "Hotels" ALTER COLUMN "type" SET DEFAULT 'CITY';
