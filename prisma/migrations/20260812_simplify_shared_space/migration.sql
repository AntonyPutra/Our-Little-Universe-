-- Migration: simplify_shared_space
-- Adds optional fromAuthor/toAuthor/addedBy fields, removes unused Admin table.

-- AlterTable
ALTER TABLE "DailyNote" ADD COLUMN "fromAuthor" TEXT, ADD COLUMN "toAuthor" TEXT;

-- AlterTable
ALTER TABLE "JarNote" ADD COLUMN "fromAuthor" TEXT;

-- AlterTable
ALTER TABLE "Letter" ADD COLUMN "fromAuthor" TEXT, ADD COLUMN "toAuthor" TEXT;

-- AlterTable
ALTER TABLE "LoveReason" ADD COLUMN "fromAuthor" TEXT;

-- AlterTable
ALTER TABLE "Song" ADD COLUMN "addedBy" TEXT;

-- DropTable
DROP TABLE IF EXISTS "Admin";
