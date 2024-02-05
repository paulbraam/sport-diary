/*
  Warnings:

  - You are about to drop the column `description` on the `CatalogExercise` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `CatalogExercise` table. All the data in the column will be lost.
  - You are about to drop the column `exerciseUnitId` on the `CatalogExercise` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `CatalogExercise` table. All the data in the column will be lost.
  - You are about to drop the column `muscle` on the `CatalogExercise` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `CatalogExercise` table. All the data in the column will be lost.
  - You are about to drop the `CatalogExerciseUnit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `CatalogExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equipment` to the `CatalogExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `force` to the `CatalogExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `CatalogExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mechanic` to the `CatalogExercise` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ExerciseCategory" AS ENUM ('STRENGTH', 'STRETCHING', 'PLYOMETRICS', 'STRONGMAN', 'POWERLIFTING', 'CARDIO', 'OLYMPIC_WEIGHTLIFTING', 'CROSSFIT', 'WEIGHTED_BODYWEIGHT', 'ASSISTED_BODYWEIGHT');

-- CreateEnum
CREATE TYPE "ExerciseMechanic" AS ENUM ('COMPOUND', 'ISOLATION');

-- CreateEnum
CREATE TYPE "ExerciseLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'EXPERT');

-- CreateEnum
CREATE TYPE "ExerciseEquipment" AS ENUM ('BODY', 'MACHINE', 'KETTLEBELLS', 'DUMBBELL', 'CABLE', 'BARBELL', 'BANDS', 'MEDICINE_BALL', 'EXERCISE_BALL', 'E_Z_CURL_BAR', 'FOAM_ROLL', 'OTHER');

-- CreateEnum
CREATE TYPE "ExerciseForce" AS ENUM ('PULL', 'PUSH', 'STATIC');

-- AlterEnum
ALTER TYPE "ExerciseMuscle" ADD VALUE 'SHOULDERS';

-- DropForeignKey
ALTER TABLE "CatalogExercise" DROP CONSTRAINT "CatalogExercise_exerciseUnitId_fkey";

-- AlterTable
ALTER TABLE "CatalogExercise" DROP COLUMN "description",
DROP COLUMN "difficulty",
DROP COLUMN "exerciseUnitId",
DROP COLUMN "image",
DROP COLUMN "muscle",
DROP COLUMN "type",
ADD COLUMN     "category" "ExerciseCategory" NOT NULL,
ADD COLUMN     "equipment" "ExerciseEquipment" NOT NULL,
ADD COLUMN     "force" "ExerciseForce" NOT NULL,
ADD COLUMN     "instructions" TEXT[],
ADD COLUMN     "level" "ExerciseLevel" NOT NULL,
ADD COLUMN     "mechanic" "ExerciseMechanic" NOT NULL,
ADD COLUMN     "primaryMuscles" "ExerciseMuscle"[],
ADD COLUMN     "secondaryMuscles" "ExerciseMuscle"[];

-- DropTable
DROP TABLE "CatalogExerciseUnit";

-- DropEnum
DROP TYPE "ExerciseDifficulty";

-- DropEnum
DROP TYPE "ExerciseMetric";

-- DropEnum
DROP TYPE "ExerciseType";
