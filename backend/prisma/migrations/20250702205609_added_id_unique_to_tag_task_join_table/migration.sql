/*
  Warnings:

  - The primary key for the `SuggestedTaskTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[suggestedTaskId,tagId]` on the table `SuggestedTaskTag` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `SuggestedTaskTag` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "SuggestedTaskTag" DROP CONSTRAINT "SuggestedTaskTag_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "SuggestedTaskTag_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "SuggestedTaskTag_suggestedTaskId_tagId_key" ON "SuggestedTaskTag"("suggestedTaskId", "tagId");
