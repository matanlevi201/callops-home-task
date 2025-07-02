-- CreateTable
CREATE TABLE "SuggestedTask" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SuggestedTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuggestedTaskTag" (
    "tagId" TEXT NOT NULL,
    "suggestedTaskId" TEXT NOT NULL,

    CONSTRAINT "SuggestedTaskTag_pkey" PRIMARY KEY ("suggestedTaskId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "SuggestedTask_description_key" ON "SuggestedTask"("description");

-- AddForeignKey
ALTER TABLE "SuggestedTaskTag" ADD CONSTRAINT "SuggestedTaskTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuggestedTaskTag" ADD CONSTRAINT "SuggestedTaskTag_suggestedTaskId_fkey" FOREIGN KEY ("suggestedTaskId") REFERENCES "SuggestedTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;
