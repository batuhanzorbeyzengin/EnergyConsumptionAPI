import express, { Express } from "express";
import config from "../src/conf/config";
import { verifyDatabaseConnection } from "../src/utils/database";
import apiV1Router from "../src/routers/api/v1";
import errorHandler from "../src/middleware/errorHandler";

const app: Express = express();

app.use(express.json());

app.use("/api/v1", apiV1Router);

app.use(errorHandler);

verifyDatabaseConnection();

app.listen(config.PORT, () => {
  console.log(`Server is Fire at http://localhost:${config.PORT}`);
});