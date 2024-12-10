import express from "express";

import user from "./user";
import task from "./task.routes";
import common from "./common.routes";


const router = express.Router();


router.use("/", user);
router.use("/", common);
router.use("/task", task);

export default router;
