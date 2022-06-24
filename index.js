import express from "express";
import { router as authRouter } from "./controllers/authController.js";
import { router as projectRouter } from "./controllers/projectController.js";

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extends: false }))

app.use('/auth', authRouter)
app.use('/projects', projectRouter)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});