/*
  Warnings:

  - You are about to drop the column `avg_city_mpge` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `avg_comb_mpge` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `avg_hwy_mpge` on the `Vehicle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "avg_city_mpge",
DROP COLUMN "avg_comb_mpge",
DROP COLUMN "avg_hwy_mpge";
