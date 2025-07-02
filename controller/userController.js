const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide Email and Password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is not Registered",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid username or password",
      });
    }

  
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1d" } 
    );

    return res.status(200).send({
      success: true,
      message: "Login Successful...",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}, "-password"); // exclude passwords
    return res.status(200).send({
      success: true,
      message: "All users fetched successfully",
      users,
    });
  } catch (error) {
    console.error("Get Users Error:", error);
    return res.status(500).send({
      success: false,
      message: "Error while fetching users",
      error,
    });
  }
};




// Register Controller
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error during registration",
      error,
    });
  }
};
