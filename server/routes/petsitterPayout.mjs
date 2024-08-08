import { Router } from "express";
import { protect } from "../middlewares/protect.mjs";
import { viewAllPayoutRecord } from "../controllers/petsitterPayout.mjs";


export const petSitterPayoutRouter = Router();

petSitterPayoutRouter.get("/",[protect], viewAllPayoutRecord);