import { Router } from "express";
import { protect } from "../middlewares/protect.mjs";
import { viewAllPetsitterBookingList } from "../controllers/petsitterBooking.mjs";
import { viewPetsitterBookingDetail } from "../controllers/petsitterBooking.mjs";
import { updateBookingStatus } from "../controllers/petsitterBooking.mjs";
import { getBookingStatus } from "../controllers/petsitterBooking.mjs";


export const petSitterBookingRouter = Router();


petSitterBookingRouter.get("/",[protect], viewAllPetsitterBookingList);
petSitterBookingRouter.get("/detail/:booking_id",[protect], viewPetsitterBookingDetail);
petSitterBookingRouter.put("/detail/:booking_id/status", [protect], updateBookingStatus);
petSitterBookingRouter.get("/status",[protect], getBookingStatus);
