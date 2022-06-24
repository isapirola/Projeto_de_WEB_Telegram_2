import express from "express";
import { router } from "./controllers/authController.js";

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extends: false }))

app.use('/auth', router)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});