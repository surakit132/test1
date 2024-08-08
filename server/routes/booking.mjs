import { Router } from "express";
import {
  saveBookingData,
  bookingInformation,
  bookingList,
  createPaymentIntent,
  cancelPaymentIntent,
} from "../controllers/booking.mjs";
import { protect } from "../middlewares/protect.mjs";

export const bookingRouter = Router();

bookingRouter.get("/", [protect], bookingList);
bookingRouter.post("/paymentIntent", [protect], createPaymentIntent);
bookingRouter.post("/cancelPaymentIntent", [protect], cancelPaymentIntent);
bookingRouter.post("/", [protect], saveBookingData);
bookingRouter.get("/information", [protect], bookingInformation);
bookingRouter.get("/", bookingList);
