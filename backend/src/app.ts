import path from "path";
import express, { json } from "express";

const app = express();
app.use(json());

const staticPath = path.join(__dirname, "..", "../frontend/dist");
app.use(express.static(staticPath));

app.all("/api/*", async () => {
  throw new Error("Not Found");
});

app.get("/*", (_, res) => {
  res.sendFile(path.resolve(staticPath, "index.html"));
});

export { app };
