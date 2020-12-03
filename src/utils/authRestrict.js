const jwt = require("jsonwebtoken");
const { findById } =require("../Users/user-model");


function restrict() {
  return async (req, res, next) => {
      const authError = {
          message:
              "AUTH MIDDLEWARE, these are not the routes you are looking for!",
      };

      try {
          const token = req.headers.authorization;
          // console.log(token);
          if (!token) {
              return res.status(401).json(authError);
          }

          jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
              if (err) {
                  return res.status(401).json(authError);
              }
              const { userID, isLoggedIn } = decoded;
              if (!userID || !isLoggedIn) {
                  return res.status(403).json(authError);
              }

              const user = await findById(decoded.userID);
              if (!user) {
                  return res.status(404).json({
                      message: "AUTH, no user found.",
                  });
              }
              req.user = user;
              req.token = decoded;
              // all good
              // console.log(req.token);
              next();
          });
      } catch (err) {
          next(err);
      }
  };
}

module.exports = restrict;