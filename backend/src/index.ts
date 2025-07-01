import "dotenv/config";
import { app } from "./app";
import { env } from "./env";
import { Server } from "http";
import prisma from "./db";

let server: Server;

const init = async () => {
  const port = env.PORT || 1000;
  await prisma.$connect();
  console.log("Connected to db");
  server = app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

const gracefullShutdown = async () => {
  console.log("Received kill signal, shutting down gracefully");
  await prisma.$disconnect();
  if (server) {
    server.close(() => {
      console.log("Closed out remaining connections");
      process.exit(0);
    });
  }
};

init().catch(gracefullShutdown);
process.on("SIGINT", gracefullShutdown);
