import { Router } from "express";
import { z } from "zod";
import { validateRequest } from "../middlewares/validate-request";

const router = Router();

const CreateTagSchema = z.object({
  name: z.string(),
});

router.get("/");
router.post("/", validateRequest(CreateTagSchema));
router.put("/:id", validateRequest(CreateTagSchema.partial()));
router.delete("/:id");

export { router as TagsRouter };
