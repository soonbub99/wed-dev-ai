import { Router } from "express";
import * as record from "../controllers/records.js";

const router = Router();

// getRecords
router.get("/", record.getRecords);

// getRecord
router.get("/:id", record.getRecord);

export default router;
