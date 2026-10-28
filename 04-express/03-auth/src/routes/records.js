import { Router } from "express";
import * as record from "../controllers/records.js";

const router = Router();

// getRecords
router.get("/", record.getRecords);

export default router;
