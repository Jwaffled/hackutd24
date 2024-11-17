-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "avg_city_mpg" DECIMAL(65,30) NOT NULL,
    "avg_hwy_mpg" DECIMAL(65,30) NOT NULL,
    "avg_comb_mpg" DECIMAL(65,30) NOT NULL,
    "engine_displacement" DECIMAL(65,30) NOT NULL,
    "cylinders" INTEGER NOT NULL,
    "drive_type" TEXT NOT NULL,
    "is_supercharged" BOOLEAN NOT NULL,
    "is_turbocharged" BOOLEAN NOT NULL,
    "is_electric" BOOLEAN NOT NULL,
    "is_hybrid" BOOLEAN NOT NULL,
    "is_hydrogen" BOOLEAN NOT NULL,
    "avg_city_mpge" DECIMAL(65,30) NOT NULL,
    "avg_hwy_mpge" DECIMAL(65,30) NOT NULL,
    "avg_comb_mpge" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);
