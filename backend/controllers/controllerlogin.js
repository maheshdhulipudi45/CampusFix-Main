import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 1. ADMIN AUTHENTICATION (NO DATABASE LOOKUP)
    if (role === "admin") {
      const secureAdminEmail = process.env.ADMIN_LOGIN_EMAIL || "24p31f00a8@acet.ac.in";
      const secureAdminPassword = process.env.ADMIN_LOGIN_PASSWORD || "Mahesh@45";

      if (email === secureAdminEmail && password === secureAdminPassword) {
        const token = jwt.sign(
          { id: "60d5ec4b8d77d70420dfbc09", role: "admin" },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        return res.status(200).json({
          message: "Login successful",
          token,
          role: "admin",
          user: {
            _id: "60d5ec4b8d77d70420dfbc09",
            email: email,
          },
        });
      } else {
        return res.status(401).json({ message: "Invalid Admin Credentials" });
      }
    }

    // 2. STUDENT AUTHENTICATION (DATABASE DEPENDENT)
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.accountType !== role) {
      return res.status(403).json({ message: "Invalid role selected" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.accountType },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.accountType,
      user: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
