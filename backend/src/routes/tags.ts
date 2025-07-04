import { Router } from "express";
import { z } from "zod";
import { validateRequest } from "../middlewares/validate-request";
import { createTag, deleteTag, getTags, updateTag } from "../controllers/tags";

const router = Router();

const CreateTagSchema = z.object({
  name: z.string().min(1),
});

router.get("/", getTags);
router.post("/", validateRequest(CreateTagSchema), createTag);
router.put("/:id", validateRequest(CreateTagSchema.partial()), updateTag);
router.delete("/:id", deleteTag);

export { router as TagsRouter };
