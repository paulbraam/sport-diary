-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Training" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "startedAt" DATETIME NOT NULL,
    "endedAt" DATETIME,
    "userParamsId" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Training_userParamsId_fkey" FOREIGN KEY ("userParamsId") REFERENCES "UserParams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Training_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Training" ("createdAt", "endedAt", "id", "startedAt", "updatedAt", "userId", "userParamsId") SELECT "createdAt", "endedAt", "id", "startedAt", "updatedAt", "userId", "userParamsId" FROM "Training";
DROP TABLE "Training";
ALTER TABLE "new_Training" RENAME TO "Training";
CREATE TABLE "new_UserParams" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "weight" INTEGER,
    "heartRate" INTEGER
);
INSERT INTO "new_UserParams" ("heartRate", "id", "weight") SELECT "heartRate", "id", "weight" FROM "UserParams";
DROP TABLE "UserParams";
ALTER TABLE "new_UserParams" RENAME TO "UserParams";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
