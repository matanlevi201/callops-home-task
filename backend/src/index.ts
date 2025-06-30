import "dotenv/config";
import path from "path";
import express from "express";
import { env } from "./env";

const app = express();

const staticPath = path.join(__dirname, "..", "../frontend/dist");
app.use(express.static(staticPath));

app.all("/api/*", async () => {
  throw new Error("Not Found");
});

app.get("/*", (_, res) => {
  res.sendFile(path.resolve(staticPath, "index.html"));
});

const port = env.PORT || 1000;
app.listen(port, () => console.log(`Listening on port: ${port}`));
