import { Router } from "express";
import {
  viewUserProfile,
  createUserProfile,
  viewPetProfile,
  createPetProfile,
  updatePetProfile,
  deletePetProfile,
  getProfilePicAndName,
} from "../controllers/user.mjs";
import { protect } from "../middlewares/protect.mjs";

export const userRouter = Router();

userRouter.get("/profile/:userId", [protect], viewUserProfile);
userRouter.put("/profile", [protect], createUserProfile);
userRouter.get("/pet/:userId", [protect], viewPetProfile);
userRouter.post("/pet", [protect], createPetProfile);
userRouter.put("/pet/:petId", [protect], updatePetProfile);
userRouter.delete("/pet/:petId", [protect], deletePetProfile);
userRouter.get("/", [protect], getProfilePicAndName);
