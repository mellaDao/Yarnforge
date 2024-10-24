const express = require("express");
const app = express();
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const validator = require("validator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json({ limit: "10mb" }));

let db = new sqlite3.Database("yarnforge.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the access database.");
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization; // Assuming token is sent in the Authorization header
  if (!token) {
    return res.status(403).json({ message: "Token is missing" });
  }
  jwt.verify(token, "secret_key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token is invalid" });
    }
    req.user = decoded; // Store decoded user information in request object
    next(); // Call next middleware
  });
};

app.post("/validateLogin", (req, res) => {
  const { username, password } = req.body;
  const errors = [];
  // Prepare a SELECT statement to retrieve user data based on the provided username
  const query = "SELECT * FROM users WHERE username = ?";

  // Execute query
  db.all(query, [username], (err, rows) => {
    // Handle any potential database errors
    if (err) {
      // Handle any potential database errors
      return res.status(500).json({ errors: ["Database error occurred."] });
    }
    // No user found with the provided username, return an error message
    if (rows.length === 0) {
      errors.push("Login credentials do not match");
      return res.status(400).json({ errors });
    }
    // Check if a row is returned and verify the password
    const user = rows[0];
    if (user.password != password) {
      errors.push("Login credentials do not match");
      return res.status(400).json({ errors });
    }
    // Generate a JWT token
    const token = jwt.sign({ username }, "key", { expiresIn: "1h" });
    res.status(200).json({ token, username: user.username, email: user.email }); // Send the token back to the client
  });
});

const { promisify } = require("util");

// Convert db.get and db.run to promises
const dbGetAsync = promisify(db.get.bind(db));
const dbRunAsync = promisify(db.run.bind(db));

// Register endpoint
app.post("/validateRegistration", async (req, res) => {
  const { username, email, password, confirm_password } = req.body;
  const errors = [];

  // Validate username
  const forbiddenCharacters = ["&", "=", "'", "+", ",", "<", ">"];
  if (
    !username ||
    username.length < 4 ||
    username.length > 20 ||
    !/^[a-zA-Z]/.test(username)
  ) {
    errors.push(
      "Username must be 4-20 characters long and must start with a letter."
    );
  }

  for (const character of forbiddenCharacters) {
    if (username.includes(character)) {
      errors.push(`Username cannot contain the character '${character}'.`);
      break;
    }
  }

  if (/(.)\1\1/.test(username)) {
    errors.push(
      "Username cannot contain more than one period(.), underscore(_), or dash(-) in a row."
    );
  }

  // Validate password
  if (
    !password ||
    password.length < 8 ||
    password.length > 20 ||
    password.includes("%")
  ) {
    errors.push(
      "Password must be 8-20 characters long and cannot contain '%'."
    );
  }

  // Validate confirm password
  if (password !== confirm_password) {
    errors.push("Passwords do not match.");
  }

  // Validate email
  if (!validator.isEmail(email)) {
    errors.push("Invalid email format.");
  }

  try {
    // Check if username already exists
    const usernameExists = await dbGetAsync(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (usernameExists) {
      errors.push("Username already exists");
    }

    // Check if email already exists
    const emailExists = await dbGetAsync(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (emailExists) {
      errors.push("An account already exists for this email");
    }

    // If there are validation errors, return them
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // If no errors, insert new user into the database
    await dbRunAsync(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, password]
    );
    res.status(200).json({ message: "Success." });
  } catch (err) {
    // Handle unexpected errors
    console.error(err);
    res
      .status(500)
      .json({ errors: ["Internal server error. Please try again later."] });
  }
});

// Protected route example
app.get("/account", verifyToken, (req, res) => {
  const username = req.user.username; // Assuming you have stored the username in the JWT payload
  // Query the database to retrieve the user's information based on the username
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (!row) {
      return res.status(404).json({ error: "User not found" });
    }
    // If the user is found, send the username and email back to the client
    res.json({ username: row.username, email: row.email });
  });
});

app.post("/forgotPassword", async (req, res) => {
  const { email } = req.body;
  const errors = [];
  try {
    // Check if account exists for entered email
    const emailExists = await dbGetAsync(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (!emailExists) {
      errors.push("There is no account associated with that email.");
      return res.status(400).json({ errors });
    } else {
      try {
        // Generate a token and set expiry time
        const token = generateToken();
        const expiryTime = new Date(Date.now() + 3600000); // 1 hour from now

        // Insert the token into the password_resets table
        db.run(
          "INSERT INTO password_resets (email, token, expiry_time) VALUES (?, ?, ?)",
          [email, token, expiryTime.toISOString()],
          async (err) => {
            if (err) {
              console.error("Failed to insert token:", err);
              return res.status(500).json({ message: "Database error." });
            }

            // Send recovery email
            await sendRecoveryEmail(email, token);

            res
              .status(200)
              .json({ message: "Password recovery email sent successfully." });
          }
        );
      } catch (error) {
        console.error("Error:", error);
        res
          .status(500)
          .json({ message: "Failed to send password recovery email." });
      }
    }
  } catch (err) {
    // Handle unexpected errors
    console.error(err);
    res
      .status(500)
      .json({ errors: ["Internal server error. Please try again later."] });
  }
});

async function sendRecoveryEmail(to, token) {
  // Create a Nodemailer transporter
  let transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "apikey", // SMTP username
      pass: "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", // SMTP password
    },
  });

  // Send mail with defined transport object
  let info = await transporter.sendMail({
    from: "yarnforgeofficial@gmail.com", // sender address
    to: to, // list of receivers
    subject: "Password Recovery", // Subject line
    html: `<p>Your password recovery token is: ${token}</p>`, // HTML body
  });

  console.log("Message sent: %s", info.messageId);
}

function generateToken() {
  // Generate a random 6-digit number
  return Math.floor(100000 + Math.random() * 900000).toString();
}

app.post("/verifyToken", async (req, res) => {
  const { token, email } = req.body;
  const errors = [];

  try {
    // Check if account exists for entered email
    const row = await dbGetAsync(
      "SELECT * FROM password_resets WHERE email=? AND token=?",
      [email, token]
    );
    if (!row) {
      errors.push("Token does not match.");
      return res.status(400).json({ errors });
    } else {
      const expiry_time = new Date(row.expiry_time);
      const current_time = new Date();
      console.log(`Expiry time: ${expiry_time}, Current time: ${current_time}`);
      if (current_time > expiry_time) {
        errors.push("Entered verification token is expired.");
        return res.status(400).json({ errors });
      }

      // If no errors, delete tokens from db
      await dbRunAsync("DELETE FROM password_resets WHERE email = ?", [email]);
      return res.status(200).json({ message: "Success." });
    }
  } catch (err) {
    errors.push("Internal server error. Please try again later.");
    return res.status(500).json({ errors });
  }
});

app.post("/resetPassword", async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  const errors = [];

  // Validate password
  if (
    !password ||
    password.length < 8 ||
    password.length > 20 ||
    password.includes("%")
  ) {
    errors.push(
      "Password must be 8-20 characters long and cannot contain '%'."
    );
  }

  // Validate confirm password
  if (password !== confirmPassword) {
    errors.push("Passwords do not match.");
  }

  // Check if token matches and is not expired
  if (errors.length === 0) {
    db.get(
      "UPDATE users SET password = ? WHERE email = ?",
      [email, password],
      async (err) => {
        if (err) {
          errors.push("Oops! Something went wrong. Please try again later.");
          return res.status(500).json({ errors });
        }

        return res
          .status(200)
          .json({ message: "Password reset successfully." });
      }
    );
  } else {
    return res.status(500).json({ errors });
  }
});

// Save pattern endpoint
app.post("/savePattern", async (req, res) => {
  let { patternContent, patternParameters, username } = req.body;
  const errors = [];
  // Extract garment name and created for from patternParameters
  const garmentNameMatch = patternParameters.match(/Garment Name: (.*?)<br>/);
  const createdForMatch = patternParameters.match(/Created For: (.*?)<br>/);
  const garmentName = garmentNameMatch ? garmentNameMatch[1] : null;
  const createdFor = createdForMatch ? createdForMatch[1] : null;
  username = username.replace(/^"|"$/g, "");
  const user_id = [];

  try {
    const user = await retrieveUser(username);
    const user_id = user.user_id;

    // Insert pattern info into patterns table for specified user_id
    await dbRunAsync(
      "INSERT INTO patterns (user_id, pattern_name, created_for, pattern_instructions, pattern_parameters) VALUES (?, ?, ?, ?, ?)",
      [user_id, garmentName, createdFor, patternContent, patternParameters]
    );
    // Return successful response
    return res.status(200).json({ message: "Success." });
  } catch (err) {
    // Handle unexpected errors
    console.error(err);
    return res
      .status(500)
      .json({ errors: ["Internal server error. Please try again later."] });
  }
});

function retrieveUser(username) {
  const sql = "SELECT * FROM users WHERE username=?";
  return new Promise((resolve, reject) => {
    db.get(sql, [username], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

// Save pattern endpoint
app.post("/fetchPatterns", async (req, res) => {
  let { username } = req.body;
  if (!username) {
    return res.status(400).json({ errors: ["Username is required."] });
  }
  username = username.replace(/^"|"$/g, "");
  const errors = [];
  try {
    const user = await retrieveUser(username);
    const user_id = user.user_id;

    const patterns = await retrievePatterns(user_id);
    // Return successful response
    if (patterns == 0) {
      res.status(400).json({ errors: ["No patterns found for this account."] });
    }
    return res.status(200).json({ patterns });
  } catch (err) {
    // Handle unexpected errors
    console.error(err);
    return res
      .status(500)
      .json({ errors: ["Internal server error. Please try again later."] });
  }
});

function retrievePatterns(user_id) {
  const sql = "SELECT * FROM patterns WHERE user_id=?";
  return new Promise((resolve, reject) => {
    db.all(sql, [user_id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function retrievePattern(patternID) {
  const sql = "SELECT * FROM patterns WHERE pattern_id=?";
  return new Promise((resolve, reject) => {
    db.get(sql, [patternID], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

// Save pattern endpoint
app.post("/deletePattern", async (req, res) => {
  const { patternID } = req.body;
  const errors = [];

  try {
    // Insert pattern info into patterns table for specified user_id
    const patterns = await dbRunAsync(
      "DELETE FROM patterns WHERE pattern_id = ?",
      [patternID]
    );
    // Return successful response
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    // Handle unexpected errors
    console.error(err);
    return res
      .status(500)
      .json({ errors: ["Internal server error. Please try again later."] });
  }
});

// View pattern endpoint
app.post("/viewPattern", async (req, res) => {
  const { patternID } = req.body;
  console.log(patternID);
  const errors = [];

  try {
    // Insert pattern info into patterns table for specified user_id
    const result = await retrievePattern(patternID);
    console.log(result);
    const patternParameters = result.pattern_parameters;
    const patternContent = result.pattern_instructions;
    // Return successful response
    return res.status(200).json({ patternParameters, patternContent });
  } catch (err) {
    // Handle unexpected errors
    console.error(err);
    return res
      .status(500)
      .json({ errors: ["Internal server error. Please try again later."] });
  }
});

app.listen(3001, () => console.log("Listening at port 3001"));
