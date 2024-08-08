import jwt from "jsonwebtoken";
import sql from "../utils/db.mjs";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const { email, phone, password } = req.body;

  if (!email || !phone || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const existingUsers = await sql`
      select * from users where email = ${email}`;

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = {
      email,
      phone,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    console.log("User object before insertion:", user);

    const results = await sql`
              insert into users (email, phone_number, password, created_at, updated_at)
              values (${user.email}, ${user.phone}, ${user.password}, ${user.created_at}, ${user.updated_at})
              returning *`;

    return res.status(201).json({
      message: "User has been created.",
      data: results,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const registerPetSitter = async (req, res) => {
  const { email, phone, password } = req.body;

  if (!email || !phone || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const existingUsers = await sql`
      select * from pet_sitters where email = ${email}`;

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

  const user = {
    email,
    phone,
    password,
    created_at: new Date(),
    updated_at: new Date(),
  };

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    console.log("User object before insertion:", user);

    const results = await sql`
              insert into pet_sitters (email, phone_number, password, created_at, updated_at)
              values (${user.email}, ${user.phone}, ${user.password}, ${user.created_at}, ${user.updated_at})
              returning *`;

    return res.status(201).json({
      message: "User has been created.",
      data: results,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const users = await sql`
              select * from users where email = ${email}`;

    if (users.length === 0) {
      return res.status(400).json({ message: "Invalid user" });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: "user" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginPetSitter = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const users = await sql`
              select * from pet_sitters where email = ${email}`;

    if (users.length === 0) {
      return res.status(400).json({ message: "Invalid user" });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: "petsitter" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
