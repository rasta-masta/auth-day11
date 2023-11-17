const jwt = require("jsonwebtoken");

module.exports = {
   verifyToken: (req, res, next) => {
      try {
         let token = req.headers.authorization;
         if (!token) {
            return res.status(401).send({ message: "Token empty" });
         }
         token = token.split(" ")[1];
         let verifyUser = jwt.verify(token, "TWITTER");
         req.user = verifyUser;
         next();
      } catch (error) {
         console.log(error);
         res.status(400).send({ message: error.message });
      }
   },
};
