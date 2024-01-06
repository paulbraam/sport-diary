-- CreateTable
CREATE TABLE "Training" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "at" DATETIME NOT NULL,
    "userParamsId" TEXT NOT NULL,
    CONSTRAINT "Training_userParamsId_fkey" FOREIGN KEY ("userParamsId") REFERENCES "UserParams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserParams" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "weight" INTEGER NOT NULL,
    "heartRate" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Circumference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "userParamsId" TEXT,
    CONSTRAINT "Circumference_userParamsId_fkey" FOREIGN KEY ("userParamsId") REFERENCES "UserParams" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Set" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "trainingId" TEXT,
    "exerciseId" TEXT NOT NULL,
    "rest" INTEGER NOT NULL,
    CONSTRAINT "Set_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Set_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Repetition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "setId" TEXT,
    "weight" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "intensity" INTEGER NOT NULL,
    "rest" INTEGER NOT NULL,
    CONSTRAINT "Repetition_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL
);
