/*
  Warnings:

  - You are about to drop the column `exerciseId` on the `TrainingSet` table. All the data in the column will be lost.
  - You are about to drop the column `trainingId` on the `TrainingSet` table. All the data in the column will be lost.
  - You are about to drop the `TrainingRepetition` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `count` to the `TrainingSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intensity` to the `TrainingSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `TrainingSet` table without a default value. This is not possible if the table is not empty.
  - Made the column `rest` on table `TrainingSet` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "TrainingRepetition" DROP CONSTRAINT "TrainingRepetition_setId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingSet" DROP CONSTRAINT "TrainingSet_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingSet" DROP CONSTRAINT "TrainingSet_trainingId_fkey";

-- AlterTable
ALTER TABLE "TrainingSet" DROP COLUMN "exerciseId",
DROP COLUMN "trainingId",
ADD COLUMN     "catalogExerciseId" TEXT,
ADD COLUMN     "count" INTEGER NOT NULL,
ADD COLUMN     "intensity" "Intensity" NOT NULL,
ADD COLUMN     "setId" TEXT,
ADD COLUMN     "trainingExerciseId" TEXT,
ADD COLUMN     "value" INTEGER NOT NULL,
ALTER COLUMN "rest" SET NOT NULL;

-- DropTable
DROP TABLE "TrainingRepetition";

-- CreateTable
CREATE TABLE "TrainingExercise" (
    "id" TEXT NOT NULL,
    "trainingId" TEXT,
    "rest" INTEGER,
    "exerciseId" TEXT NOT NULL,

    CONSTRAINT "TrainingExercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TrainingExercise" ADD CONSTRAINT "TrainingExercise_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingExercise" ADD CONSTRAINT "TrainingExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "CatalogExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingSet" ADD CONSTRAINT "TrainingSet_trainingExerciseId_fkey" FOREIGN KEY ("trainingExerciseId") REFERENCES "TrainingExercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingSet" ADD CONSTRAINT "TrainingSet_catalogExerciseId_fkey" FOREIGN KEY ("catalogExerciseId") REFERENCES "CatalogExercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
