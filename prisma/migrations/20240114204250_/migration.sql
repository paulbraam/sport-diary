/*
  Warnings:

  - You are about to drop the column `at` on the `Training` table. All the data in the column will be lost.
  - Added the required column `endedAt` to the `Training` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startedAt` to the `Training` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Training" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "startedAt" DATETIME NOT NULL,
    "endedAt" DATETIME NOT NULL,
    "userParamsId" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Training_userParamsId_fkey" FOREIGN KEY ("userParamsId") REFERENCES "UserParams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Training_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Training" ("createdAt", "id", "updatedAt", "userId", "userParamsId") SELECT "createdAt", "id", "updatedAt", "userId", "userParamsId" FROM "Training";
DROP TABLE "Training";
ALTER TABLE "new_Training" RENAME TO "Training";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
