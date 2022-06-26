import express from "express";
import cookieSession from "cookie-session";
import cors from "cors"
import { router as authRouter } from "./controllers/authController.js";
import { router as projectRouter } from "./controllers/projectController.js";

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extendsed: true }))

app.use('/auth', authRouter)
app.use('/projects', projectRouter)

app.use(cors())

app.use(cookieSession({
  name: 'session',
  secret: process.env.COOKIE_SECRET,
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});