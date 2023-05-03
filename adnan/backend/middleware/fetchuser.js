const jwt = require("jsonwebtoken");
const myToken = "AdnaN";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(403).json({message: "User not authenticated"});
  }

  try {
    const data = jwt.verify(token, myToken);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(403).json({message: "User not logged in"})
  }
};

module.exports = fetchuser;
