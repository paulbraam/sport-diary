-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Training" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "at" DATETIME NOT NULL,
    "userParamsId" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Training_userParamsId_fkey" FOREIGN KEY ("userParamsId") REFERENCES "UserParams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Training_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Training" ("at", "createdAt", "id", "updatedAt", "userParamsId") SELECT "at", "createdAt", "id", "updatedAt", "userParamsId" FROM "Training";
DROP TABLE "Training";
ALTER TABLE "new_Training" RENAME TO "Training";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
