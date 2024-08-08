import { Router } from "express";
import { protect } from "../middlewares/protect.mjs";
import { createPetsitterProfile, viewPetsitterProfile, viewPetsitterProfiles, updatePetsitterProfile, checkPetsitterProfile,  searchPetsitterProfile, getProfilePicAndName} from "../controllers/petSitterProfile.mjs";



export const petSitterProfileRouter = Router();

petSitterProfileRouter.post(
  "/petsitter/profile",
  [protect],
  createPetsitterProfile
);

petSitterProfileRouter.get(
  "/petsitter/profile",
  [protect],
  viewPetsitterProfile
);

petSitterProfileRouter.get("/search/:id", viewPetsitterProfiles);

petSitterProfileRouter.get(
  "/petsitter/profile/check",
  [protect],
  checkPetsitterProfile
);

petSitterProfileRouter.put(
  "/petsitter/profile",
  [protect],
  updatePetsitterProfile
);

petSitterProfileRouter.get("/search", searchPetsitterProfile);

petSitterProfileRouter.get("/petsitter", [protect], getProfilePicAndName);
