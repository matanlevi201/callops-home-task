import { Router } from "express";
import { z } from "zod";
import { validateRequest } from "../middlewares/validate-request";
import {
  getSuggestedTasks,
  createSuggestedTask,
  updateSuggestedTask,
} from "../controllers/suggested-tasks";
import { TaskStatus } from "@prisma/client";

const router = Router();

const CreateSuggestedTaskSchema = z.object({
  description: z.string().min(5, "Description is too short."),
  tagIds: z.array(z.string()).default([]),
});

const UpdateSuggestedTaskSchema = z.object({
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
  validateRequest(UpdateSuggestedTaskSchema),
  updateSuggestedTask
);

export { router as SuggestedTasksRouter };
