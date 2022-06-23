import Express from "express";
import Cors from "cors";
import cookieSession from "cookie-session";
import { router } from './routes.js'

export const app = new Express()

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(Cors(corsOptions));

app.use(router)

app.use(Express.json());

app.use(Express.urlencoded({ extended: true }));

app.use(cookieSession({
    name: "bezkoder-session",
    secret: "COOKIE_SECRET",
    httpOnly: true
  })
);