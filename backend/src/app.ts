import path from "path";
import "express-async-errors";
import express, { json } from "express";
import { NotFoundError } from "./errors";
import { errorHandler } from "./middlewares/error-handler";

const app = express();
app.use(json());

const staticPath = path.join(__dirname, "..", "../frontend/dist");
app.use(express.static(staticPath));

app.all("/api/*", async () => {
  throw new NotFoundError();
});

app.get("/*", (_, res) => {
  res.sendFile(path.resolve(staticPath, "index.html"));
});

app.use(errorHandler);

export { app };
