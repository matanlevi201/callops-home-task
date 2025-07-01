import { Request, Response, Router } from "express";
import { z } from "zod";
import { validateRequest } from "../middlewares/validate-request";
import {
  createCall,
  deleteCall,
  getCalls,
  updateCall,
} from "../controllers/calls";

const router = Router();

const CreateCallSchema = z.object({
  title: z.string(),
  description: z.string().default(""),
  tagIds: z.array(z.string()).default([]),
});

router.get("/", getCalls);
router.post("/", validateRequest(CreateCallSchema), createCall);
router.put("/:id", validateRequest(CreateCallSchema.partial()), updateCall);
router.delete("/:id", deleteCall);

export { router as CallsRouter };
