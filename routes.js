import Express from "express";
import jwt from 'jsonwebtoken'

export const router = new Express.Router()

router.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});