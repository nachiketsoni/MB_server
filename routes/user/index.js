import express from "express";

import user from "./user.routes";

const router = express.Router();

router.use("/user", user);


export default router;
