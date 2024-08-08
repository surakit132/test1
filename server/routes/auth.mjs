import { Router } from "express";
import { loginPetSitter, loginUser, registerPetSitter, registerUser } from "../controllers/auth.mjs";

export const authRouter = Router();

authRouter.post("/register/user", registerUser);

authRouter.post("/register/petsitter", registerPetSitter);

authRouter.post("/login/user", loginUser);

authRouter.post("/login/petsitter", loginPetSitter);
