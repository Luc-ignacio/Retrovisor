/*
  Warnings:

  - You are about to alter the column `lat` on the `LocationLog` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `long` on the `LocationLog` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LocationLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startedAt" DATETIME NOT NULL,
    "endedAt" DATETIME NOT NULL,
    "lat" REAL NOT NULL,
    "long" REAL NOT NULL,
    "locationId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LocationLog_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LocationLog" ("createdAt", "description", "endedAt", "id", "lat", "locationId", "long", "name", "startedAt", "updatedAt") SELECT "createdAt", "description", "endedAt", "id", "lat", "locationId", "long", "name", "startedAt", "updatedAt" FROM "LocationLog";
DROP TABLE "LocationLog";
ALTER TABLE "new_LocationLog" RENAME TO "LocationLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
