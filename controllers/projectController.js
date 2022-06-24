import express from "express";
import { authMiddleware } from "../middlewares/auth.js";

export const router = new express.Router()

router.use(authMiddleware);

router.get('/', (req, res) => {
    res.send({ok: true, user: req.userId})
})