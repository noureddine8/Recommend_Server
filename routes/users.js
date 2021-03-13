import { Router } from "express";
import { auth } from "../middlewares/auth.js";
var router = Router();

import { signin, signup, getUser } from "../controllers/users.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/user", auth, getUser);

export default router;
