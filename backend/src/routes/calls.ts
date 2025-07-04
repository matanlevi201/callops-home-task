import { Request, Response, Router } from "express";
import { z } from "zod";
import { validateRequest } from "../middlewares/validate-request";
import {
  addCallTag,
  removeCallTag,
  createCall,
  deleteCall,
  getCalls,
  addCallSuggestedTask,
} from "../controllers/calls";

const router = Router();

const CreateCallSchema = z.object({
  title: z.string().min(1),
  description: z.string().default(""),
  tagIds: z.array(z.string()).default([]),
});

const ToggleTagSchema = z.object({
  tagId: z.string(),
});

const AddSuggestedTaskSchema = z.object({
  suggestedTaskId: z.string(),
});

router.get("/", getCalls);
router.post("/", validateRequest(CreateCallSchema), createCall);
router.put("/tags/:id", validateRequest(ToggleTagSchema), addCallTag);
router.put(
  "/suggested-tasks/:id",
  validateRequest(AddSuggestedTaskSchema),
  addCallSuggestedTask
);
router.delete("/tags/:id", validateRequest(ToggleTagSchema), removeCallTag);
router.delete("/:id", deleteCall);

export { router as CallsRouter };
