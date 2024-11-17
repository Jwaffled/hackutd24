/*
  Warnings:

  - Added the required column `is_gas` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "is_gas" BOOLEAN NOT NULL;
