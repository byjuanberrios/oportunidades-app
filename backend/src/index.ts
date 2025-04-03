import express, { type Express } from "express";
import cors from "cors";
import router from "./routes/opportunities";

import { APP_PORT } from "./config/env";

const app: Express = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", router);

app.listen(APP_PORT, () => {
  console.log(`Server running on port ${APP_PORT}`);
});
