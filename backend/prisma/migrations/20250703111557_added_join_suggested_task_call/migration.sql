-- CreateTable
CREATE TABLE "SuggestedTaskCall" (
    "id" TEXT NOT NULL,
    "callId" TEXT NOT NULL,
    "suggestedTaskId" TEXT NOT NULL,

    CONSTRAINT "SuggestedTaskCall_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SuggestedTaskCall_suggestedTaskId_callId_key" ON "SuggestedTaskCall"("suggestedTaskId", "callId");

-- AddForeignKey
ALTER TABLE "SuggestedTaskCall" ADD CONSTRAINT "SuggestedTaskCall_callId_fkey" FOREIGN KEY ("callId") REFERENCES "Call"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuggestedTaskCall" ADD CONSTRAINT "SuggestedTaskCall_suggestedTaskId_fkey" FOREIGN KEY ("suggestedTaskId") REFERENCES "SuggestedTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;
