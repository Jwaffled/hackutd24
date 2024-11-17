-- AlterTable
ALTER TABLE "Vehicle" ALTER COLUMN "avg_city_mpg" DROP NOT NULL,
ALTER COLUMN "avg_hwy_mpg" DROP NOT NULL,
ALTER COLUMN "avg_comb_mpg" DROP NOT NULL,
ALTER COLUMN "engine_displacement" DROP NOT NULL,
ALTER COLUMN "cylinders" DROP NOT NULL,
ALTER COLUMN "avg_city_mpge" DROP NOT NULL,
ALTER COLUMN "avg_hwy_mpge" DROP NOT NULL,
ALTER COLUMN "avg_comb_mpge" DROP NOT NULL;
