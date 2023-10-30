import express from "express";
import { extractionController } from "../controller/extract.js";

const router = express.Router();

router.post("/", extractionController);

export default router;
