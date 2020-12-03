const jwt = require("jsonwebtoken");


const createToken = (user) => {
  const token = jwt.sign(
    {
      userID: user.id,
      isLoggedIn: true,
    } ,
    process.env.JWT_SECRET
  );
  return token;
};

// export default createToken;
module.exports = createToken;
