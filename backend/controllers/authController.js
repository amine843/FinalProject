      const User = require("../models/User");
      const jwt = require("jsonwebtoken");
      const bcrypt = require("bcryptjs");

      const generateToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      };

      exports.registerUser = async (req, res) => {
        const { fullName, username, email, password, profileImageUrl } = req.body;

        if (!fullName || !username || !email || !password) {
          return res.status(400).json({ message: "All fields are required" });
        }

        const usernameRegex = /^[a-zA-Z0-9-_]+$/;
        if (!usernameRegex.test(username)) {
          return res.status(400).json({
            message: "Username can only contain alphanumeric characters and hyphens",
          });
        }

        try {
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
          }

          const existingUsername = await User.findOne({ username });
          if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
          }
          const user = await User.create({
            fullName,
            username,
            email,
            password,
            profileImageUrl,
          });

          res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
          });
        } catch (err) {
          res.status(500).json({ message: "error registering user", error: err.message });
        }
      };

      exports.loginUser = async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
          return res.status(400).json({ message: "All fields are required" });
        }

        try {
          const user = await User.findOne({ email });
          if (!user || !(await user.comparePassword(password)))
          {
            return res.status(401).json({ message: "Invalid email or password" });
          }
          res.status(200)
            .json({
              id: user._id, 
              user: {
                ...user.toObject(),
                totalPollsCreated : 0,
                totalPollsVotes : 0,
              totalPollsBookmarked : 0, 
            },  
            token: generateToken(user._id),
          });
        } catch (err) {
          res.status(500).json({ message: "Error logging in user", error: err.message });
        }
      };
        exports.getUserInfo = async (req, res) => {
          const { user } = req;
          if (!user) {
            return res.status(401).json({ message: "Not authorized" });
          }
          res.status(200).json({
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            username: user.username,
            profileImageUrl: user.profileImageUrl,
            totalPollsCreated: 0,
            totalPollsVotes: 0,
            totalPollsBookmarked: 0,
          });
        };

