import { z, ZodError } from "zod";

const envSchema = z.object({
  PORT: z.string(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

export const env = (() => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Invalid environment variables:", error.format());
    }
    process.exit(1);
  }
})();
