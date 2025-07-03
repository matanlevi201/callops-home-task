import { Router } from "express";
import { z } from "zod";
import { validateRequest } from "../middlewares/validate-request";
import { getTasks, createTask, updateTask } from "../controllers/tasks";
import { TaskStatus } from "@prisma/client";

const router = Router();

const CreateTaskSchema = z.object({
  callId: z.string(),
  description: z.string().min(5, "Description is too short."),
});

const UpdateTaskSchema = z.object({
  callId: z.string(),
  status: z.enum([
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.COMPLETED,
  ]),
});

router.get("/", getTasks);
router.post("/", validateRequest(CreateTaskSchema), createTask);
router.put("/:id", validateRequest(UpdateTaskSchema), updateTask);

export { router as TasksRouter };
