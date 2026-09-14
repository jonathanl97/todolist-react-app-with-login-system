import express from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import { pool } from "../db.js";

const router = express.Router();

//sign up
router.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;

  const inputCheck = validateInput(name, email, password);

  if (!inputCheck) return res.status(400).json("Invalid input");

  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email],
    );

    if (existingUser.rowCount > 0) {
      return res.status(409).json("User already exists.");
    }

    bcrypt.genSalt(function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        try {
          const response = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, email AS username",
            [name, email, hash],
          );
          const user = {
            id: response.rows[0].id,
            username: response.rows[0].username,
          };
          req.logIn(user, function (err) {
            if (err) {
              return next(err);
            }
            return res
              .status(201)
              .json(`User registered and signed in with email: ${email}`);
          });
        } catch (err) {
          throw err;
        }
      });
    });
  } catch (err) {
    throw err;
  }
});

//sign in
router.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(499).json("Incorrect email or password");
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      res.status(200).json("Signed in");
    });
  })(req, res, next);
});

//sign out
router.post("/signout", async (req, res, next) => {
  req.logOut(function (err) {
    if (err) return next(err);
  });
  return res.status(200).json("Signed out");
});

//get user info
router.post("/user/getuser", async (req, res) => {
  if (req.isAuthenticated()) {
    const user = {
      name: req.user.name,
      firstName: req.user.name.split(" ")[0],
      email: req.user.email,
      signedIn: true,
    };
    res.status(200).json(user);
  } else {
    res
      .status(498)
      .json({ name: null, firstName: null, email: null, signedIn: false });
    //No user signed in
  }
});

//update email
router.put("/user/email", checkAuthenticated, async (req, res) => {
  const { newEmail, oldEmail, password } = req.body;

  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [newEmail],
    );

    if (existingUser.rowCount > 0) {
      return res.status(409).json("Cannot change to this email");
    }
  } catch (err) {
    throw err;
  }

  if (req.user.email != oldEmail) {
    res.status(499).json("Incorrect email or password");
  } else {
    const { id, isMatch } = await verifyUser(oldEmail, password);

    if (id == req.user.id && isMatch) {
      try {
        await pool.query("UPDATE users SET email=$1 WHERE email=$2", [
          newEmail,
          oldEmail,
        ]);
        res.status(200).json(`Email updated from: ${oldEmail} to: ${newEmail}`);
      } catch (err) {
        throw err;
      }
    } else {
      res.status(499).json("Incorrect email or password");
    }
  }
});

//update password
router.put("/user/password", checkAuthenticated, async (req, res) => {
  const { newPassword, email, oldPassword } = req.body;

  if (req.user.email != email) {
    res.status(499).json("Incorrect email or password");
  } else {
    const { id, isMatch } = await verifyUser(email, oldPassword);

    if (id == req.user.id && isMatch) {
      try {
        const results = await pool.query("SELECT * FROM users WHERE email=$1", [
          email,
        ]);

        if (results.rows.length > 0) {
          const user = results.rows[0];

          //bcrypt
          bcrypt.genSalt(function (err, salt) {
            bcrypt.hash(newPassword, salt, async function (err, hash) {
              try {
                await pool.query(
                  "UPDATE users SET password=$1 WHERE email=$2",
                  [hash, email],
                );
                res.status(200).json(`Password updated for account: ${email}`);
              } catch (err) {
                throw err;
              }
            });
          });
        }
      } catch (err) {
        throw err;
      }
    } else {
      res.status(499).json("Incorrect email or password");
    }
  }
});

//delete account
router.delete("/user/delete", checkAuthenticated, async (req, res, next) => {
  const { email, password } = req.body;

  const { id, isMatch } = await verifyUser(email, password);

  if (id == req.user.id && isMatch) {
    try {
      await pool.query("DELETE FROM users WHERE email=$1", [email]);
      res.status(200).json(`User deleted with email: ${email}`);
    } catch (err) {
      throw err;
    }
  } else {
    return res.status(499).json("Incorrect email or password");
  }

  req.logOut(function (err) {
    if (err) return next(err);
  });
});

//check if user is authenticated/
export function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(498).json("Not authenticated");
  }
}

//verify user credentials for when changing email or password
async function verifyUser(email, password) {
  try {
    const results = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (results.rows.length > 0) {
      const user = results.rows[0];

      const match = await bcrypt.compare(password, user.password);

      if (match) {
        return {
          id: user.id,
          isMatch: match,
        };
      } else {
        return {
          id: -1,
          isMatch: match,
        };
      }
    } else {
      return false;
    }
  } catch (err) {
    throw err;
  }
}

//check valdity of form input
function validateInput(name, email, password) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (name.length > 32) return false;

  if (email.length > 50) return false;

  if (!emailRegex.test(email)) return false;

  if (password.length < 8) return false;

  if (password.length > 50) return false;

  return true;
}

export default router;
