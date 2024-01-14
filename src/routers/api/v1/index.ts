import express from "express";
import authRouter from "./auth";
import endeksRouter from "./endeks";

const router = express.Router();

router.use(authRouter);
router.use(endeksRouter);

export default router;