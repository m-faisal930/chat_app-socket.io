import express from "express";

import {sinupController, loginController, logoutController}  from "../controllers/auth.controller.js"

const router = express.Router();

router.post("/signup", sinupController);

router.post("/login", loginController);

router.post("/logout", logoutController);

export default router;