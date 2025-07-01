import "dotenv/config";
import { app } from "./app";
import { env } from "./env";

const init = async () => {
  const port = env.PORT || 1000;
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

init().catch(async (error) => {
  console.log(error);
});
