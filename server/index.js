import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import OpenAI from "openai";
import extractRoutes from "./router/extract.js";
//env file config
dotenv.config();

const app = express();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
//middlewares
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//routes
app.use("/extract", extractRoutes);
//starting server
app.listen(process.env.PORT, () =>
  console.log(`server up and running at PORT ${process.env.PORT}`)
);
