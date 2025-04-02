/*
  Warnings:

  - You are about to drop the column `hasGrummingEqupments` on the `Hotels` table. All the data in the column will be lost.
  - You are about to drop the column `hasPools` on the `Hotels` table. All the data in the column will be lost.
  - Made the column `hasParking` on table `Hotels` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hasWifi` on table `Hotels` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hasBalcony` on table `Hotels` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hasGarden` on table `Hotels` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hasKitchen` on table `Hotels` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hasTv` on table `Hotels` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hasWashingMachine` on table `Hotels` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hasWorkSpace` on table `Hotels` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Hotels" DROP COLUMN "hasGrummingEqupments",
DROP COLUMN "hasPools",
ADD COLUMN     "hasAccessibility" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasAirConditioning" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasBBQGrill" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasDiningArea" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasExerciseEquipment" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasFireExtinguisher" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasFirepit" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasFirstAidKit" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasHotTub" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasOutdoorShower" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasPool" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasPoolTable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasSmokeAlarm" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "hasParking" SET NOT NULL,
ALTER COLUMN "hasWifi" SET NOT NULL,
ALTER COLUMN "hasBalcony" SET NOT NULL,
ALTER COLUMN "hasGarden" SET NOT NULL,
ALTER COLUMN "hasKitchen" SET NOT NULL,
ALTER COLUMN "hasTv" SET NOT NULL,
ALTER COLUMN "hasWashingMachine" SET NOT NULL,
ALTER COLUMN "hasWorkSpace" SET NOT NULL;
