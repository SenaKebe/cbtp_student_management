import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerOptions } from "./swaggerOptions.js";
import { HOST, PORT } from "./config/secret.js";
import appRoute from "./route/index.js";
import cors from "cors";
const app = express();

const specs = swaggerJsdoc(swaggerOptions);

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.urlencoded({ extended: true }));
app.use("/api", appRoute);

app.get("/", (req, res) => {
  res.send("response");
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
