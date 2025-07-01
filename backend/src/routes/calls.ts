import { Request, Response, Router } from "express";
import { z } from "zod";
import { validateRequest } from "../middlewares/validate-request";

const router = Router();

const CreateCallSchema = z.object({
  title: z.string(),
  description: z.string().default(""),
  tagIds: z.array(z.string()).default([]),
});

router.get("/");
router.post("/", validateRequest(CreateCallSchema));
router.put("/:id", validateRequest(CreateCallSchema.partial()));
router.delete("/:id");

export { router as CallsRouter };
