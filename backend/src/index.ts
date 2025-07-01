import "dotenv/config";
import { app } from "./app";
import { env } from "./env";
import { Server } from "http";

let server: Server;

const init = async () => {
  const port = env.PORT || 1000;
  server = app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

init().catch(async (error) => {
  console.log(error);
});

process.on("SIGINT", async () => {
  console.log("Received kill signal, shutting down gracefully");
  server.close(() => {
    console.log("Closed out remaining connections");
    process.exit(0);
  });
});
