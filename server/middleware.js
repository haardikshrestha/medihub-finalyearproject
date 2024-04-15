const jwt = require("jsonwebtoken");
require("dotenv").config();

const AuthGuard = (role) => {
  return (req, res, next) => {
    const token = req.headers["authorization"];
    console.log(token);
    if (!token) {
      return res.status(401).json({
        message: "No token found",
      });
    }
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(401).json({
          message: "Invalid token",
        });
      }
      console.log(user)

      if (!role.includes(user.role)) {
        return res.status(401).json({
          message: "You are not authorized",
        });
      }
      req.user = user;
      next();
    });
  };
};

module.exports = AuthGuard;
