import express from "express";
import session from "express-session";
import path from "path";
import cors from "cors";
import { router as authRouter } from "./controllers/authController.js";
import { router as projectRouter } from "./controllers/projectController.js";
import { router as amiiboRouter } from "./controllers/amiiboController.js";

const __dirname = path.resolve();

export const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/auth', authRouter)
app.use('/projects', projectRouter)
app.use('/amiibo', amiiboRouter)

app.use(session({
  name: "session-id",
  secret: process.env.COOKIE_SECRET,
  saveUninitialized: false,
  resave: true
}))

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});