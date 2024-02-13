/*
  Warnings:

  - You are about to drop the column `count` on the `TrainingSet` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `TrainingSet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TrainingSet" DROP COLUMN "count",
DROP COLUMN "value",
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "reps" INTEGER,
ADD COLUMN     "weight" INTEGER,
ALTER COLUMN "rest" DROP NOT NULL,
ALTER COLUMN "intensity" DROP NOT NULL;
