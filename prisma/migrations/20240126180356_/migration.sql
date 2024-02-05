/*
  Warnings:

  - You are about to drop the column `userParamsId` on the `Training` table. All the data in the column will be lost.
  - You are about to drop the `Circumference` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Repetition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Set` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserParams` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Intensity" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "ExerciseType" AS ENUM ('CARDIO', 'OLYMPIC_WEIGHTLIFTING', 'PLYOMETRICS', 'POWERLIFTING', 'STRENGTH', 'STRETCHING', 'STRONGMAN');

-- CreateEnum
CREATE TYPE "ExerciseMetric" AS ENUM ('TIME', 'WEIGHT', 'DISTANCE', 'LENGTH', 'HEIGHT', 'SPEED');

-- CreateEnum
CREATE TYPE "ExerciseMuscle" AS ENUM ('ABDOMINALS', 'ABDUCTORS', 'ADDUCTORS', 'BICEPS', 'CALVES', 'CHEST', 'FOREARMS', 'GLUTES', 'HAMSTRINGS', 'LATS', 'LOWER_BACK', 'MIDDLE_BACK', 'NECK', 'QUADRICEPS', 'TRAPS', 'TRICEPS');

-- CreateEnum
CREATE TYPE "ExerciseDifficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'EXPERT');

-- DropForeignKey
ALTER TABLE "Circumference" DROP CONSTRAINT "Circumference_userParamsId_fkey";

-- DropForeignKey
ALTER TABLE "Repetition" DROP CONSTRAINT "Repetition_setId_fkey";

-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_trainingId_fkey";

-- DropForeignKey
ALTER TABLE "Training" DROP CONSTRAINT "Training_userParamsId_fkey";

-- AlterTable
ALTER TABLE "Training" DROP COLUMN "userParamsId";

-- DropTable
DROP TABLE "Circumference";

-- DropTable
DROP TABLE "Exercise";

-- DropTable
DROP TABLE "Repetition";

-- DropTable
DROP TABLE "Set";

-- DropTable
DROP TABLE "UserParams";

-- CreateTable
CREATE TABLE "BodyParameter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "trainingId" TEXT,
    "bodyParameterUnitId" TEXT NOT NULL,

    CONSTRAINT "BodyParameter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingSet" (
    "id" TEXT NOT NULL,
    "trainingId" TEXT,
    "rest" INTEGER NOT NULL,
    "exerciseId" TEXT NOT NULL,

    CONSTRAINT "TrainingSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingRepetition" (
    "id" TEXT NOT NULL,
    "setId" TEXT,
    "count" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "intensity" "Intensity" NOT NULL,
    "rest" INTEGER NOT NULL,

    CONSTRAINT "TrainingRepetition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CatalogBodyParameterUnit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CatalogBodyParameterUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CatalogExercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "muscle" "ExerciseMuscle" NOT NULL,
    "description" VARCHAR(300),
    "image" TEXT,
    "type" "ExerciseType",
    "difficulty" "ExerciseDifficulty",
    "exerciseUnitId" TEXT NOT NULL,

    CONSTRAINT "CatalogExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CatalogExerciseUnit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CatalogExerciseUnit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BodyParameter" ADD CONSTRAINT "BodyParameter_bodyParameterUnitId_fkey" FOREIGN KEY ("bodyParameterUnitId") REFERENCES "CatalogBodyParameterUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BodyParameter" ADD CONSTRAINT "BodyParameter_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingSet" ADD CONSTRAINT "TrainingSet_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingSet" ADD CONSTRAINT "TrainingSet_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "CatalogExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingRepetition" ADD CONSTRAINT "TrainingRepetition_setId_fkey" FOREIGN KEY ("setId") REFERENCES "TrainingSet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CatalogExercise" ADD CONSTRAINT "CatalogExercise_exerciseUnitId_fkey" FOREIGN KEY ("exerciseUnitId") REFERENCES "CatalogExerciseUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
