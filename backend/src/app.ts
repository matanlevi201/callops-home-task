import path from "path";
import "express-async-errors";
import express, { json } from "express";
import { NotFoundError } from "./errors";
import { errorHandler } from "./middlewares/error-handler";
import { CallsRouter } from "./routes/calls";
import { SuggestedTasksRouter } from "./routes/suggested-tasks";
import { TagsRouter } from "./routes/tags";
import { TasksRouter } from "./routes/tasks";
import { env } from "./env";
import cors from "cors";

const app = express();
app.use(json());
app.use(
  cors({
    origin: env.FRONT_END_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
const staticPath = path.join(__dirname, "..", "../frontend/dist");
app.use(express.static(staticPath));

app.use("/api/calls", CallsRouter);
app.use("/api/suggested-tasks", SuggestedTasksRouter);
app.use("/api/tags", TagsRouter);
app.use("/api/tasks", TasksRouter);
app.all("/api/*", async () => {
  throw new NotFoundError();
});

app.get("/*", (_, res) => {
  res.sendFile(path.resolve(staticPath, "index.html"));
});

app.use(errorHandler);

export { app };
