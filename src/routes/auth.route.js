import { Router } from "express";
import { userLogin, userRegister } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const authRoute = Router();

authRoute.post("/register", userRegister);
authRoute.post("/login", authMiddleware, userLogin);