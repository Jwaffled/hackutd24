/*
  Warnings:

  - Made the column `avg_city_mpg` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `avg_hwy_mpg` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `avg_comb_mpg` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Vehicle" ALTER COLUMN "avg_city_mpg" SET NOT NULL,
ALTER COLUMN "avg_hwy_mpg" SET NOT NULL,
ALTER COLUMN "avg_comb_mpg" SET NOT NULL;
