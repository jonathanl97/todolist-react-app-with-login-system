import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { pool } from "../db.js";

const authenticateUser = async (email, password, done) => {
  try {
    const results = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (results.rows.length > 0) {
      const user = results.rows[0];

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error("Error on bcrypt comparison", err);
        }

        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect email or password." });
        }
      });
    } else {
      return done(null, false, { message: "Incorrect email or password." });
    }
  } catch (err) {
    console.err("Error during authentication", err);
  }
};

const strategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  authenticateUser,
);

function initializePassport(passport) {
  passport.use(strategy);

  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    pool.query("SELECT * FROM users WHERE id = $1", [id], (err, results) => {
      if (err) {
        throw err;
      }
      return done(null, results.rows[0]);
    });
  });
}

export default initializePassport;
