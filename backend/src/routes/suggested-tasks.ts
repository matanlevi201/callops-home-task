import { Router } from "express";
import { z } from "zod";
import { validateRequest } from "../middlewares/validate-request";
import {
  getSuggestedTasks,
  createSuggestedTask,
  updateSuggestedTask,
  updateSuggestedTaskStatus,
} from "../controllers/suggested-tasks";
import { TaskStatus } from "@prisma/client";

const router = Router();

const CreateSuggestedTaskSchema = z.object({
  description: z.string().min(5),
  tagIds: z.array(z.string()),
});

const UpdateSuggestedTaskSchema = z.object({
  callId: z.string(),
  status: z.enum([
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.COMPLETED,
  ]),
});

router.get("/", getSuggestedTasks);
router.post(
  "/",
  validateRequest(CreateSuggestedTaskSchema),
  createSuggestedTask
);
router.put(
  "/:id",
  validateRequest(CreateSuggestedTaskSchema.partial()),
  updateSuggestedTask
);
router.put(
  "/status/:id",
  validateRequest(UpdateSuggestedTaskSchema),
  updateSuggestedTaskStatus
);

export { router as SuggestedTasksRouter };
