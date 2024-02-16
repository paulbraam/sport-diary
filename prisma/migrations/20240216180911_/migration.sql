-- CreateEnum
CREATE TYPE "TrainingStatus" AS ENUM ('STARTED', 'FINISHED');

-- AlterTable
ALTER TABLE "Training" ADD COLUMN     "status" "TrainingStatus" NOT NULL DEFAULT 'STARTED';
