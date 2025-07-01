const jwt = require("jsonwebtoken");

const requireSignIn = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
    req.user = decode; // adds `userId` to req.user
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = requireSignIn;
