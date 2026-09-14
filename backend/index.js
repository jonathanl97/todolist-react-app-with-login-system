import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db.js";
import authRouter from "./routes/auth.js";
import todoRouter from "./routes/listActions.js";
import initializePassport from "./strategies/localPassport.js";

const pgSession = connectPgSimple(session);

const app = express();
const port = Number(process.env.EX_PORT);

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializePassport(passport);

app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "session",
      //createTableIfMissing: true,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      //maxAge: 1000 * 60 * 60 * 24,  //24 hours
      maxAge: 1000 * 60 * 60 * 12, //12 hours
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRouter);
app.use("/", todoRouter);

app.listen(port, () => {
  console.log(`Api runnning on port ${port}.`);
});
