const express = require("express");

const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

/* Zod Schema for validation */
const zodSignupSchemaBody = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  username: zod.string().email(),
  password: zod.string(),
});

// POST route for user signup
router.post("/signup", async (req, res) => {
  // Validating the request body using Zod schema
  const { success } = zodSignupSchemaBody.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ message: "Invalid request" });
  }

  // Check if a user with the same username already exists
  const existingUser = await User.findOne({ username: req.body.username });

  if (existingUser) {
    return res.status(411).json({ message: "Username already exists" });
  }
  // Create a new User document
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
  });
  newUser.save(); // save newUser to Databse
  const userId = newUser._id;

  const newAccount = await Account.create({
    userId: newUser._id,
    balance: 1 + Math.random() * 10000, // Initialize with random balance
  });
  console.log("Account created:", newAccount);

  const token = jwt.sign({ userId }, JWT_SECRET);
  console.log(token);

  console.log(newUser);
  console.log(newAccount);

  res.json({
    message: "User created successfully",
    token: token,
  });
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ message: "Invalid request" });
  }

  const { username, password } = req.body;

  const user = await User.findOne({ username: username });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid password" });
  }
  const userId = user._id;
  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });
  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  return res
    .status(200)
    .json({ message: "User logged in successfully", token: token });
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }
  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    //SELECT * FROM users WHERE firstname LIKE '%filter%'
    $or: [
      {
        firstname: { $regex: filter },
      },
      {
        lastname: { $regex: filter },
      },
    ],
  }); 

  res.json({
    user: users.map((user) => ({
      id: user._id,
      firstName: user.firstname,
      lastName: user.lastname,
      username: user.username,
    })),
  });
});

module.exports = router;
