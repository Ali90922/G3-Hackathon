const admin = require("../config/firebase-config");

class Middleware {
  async decodeToken(req, res, next) {
    // if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    //   return res.status(401).json({ message: "Unauthorized access: No token provided or token is malformed." });
    // }

    // Extract the token by removing 'Bearer ' prefix
    const token = req.headers.authorization.split(" ")[1];
    console.log(token + "this is the token");

    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      console.log("YES YES YES YES");

      if (decodeValue) {
        console.log("HERE HERE HERE HERE HERE HERE");
        req.user = decodeValue;
        return next();
      }
      return res.json({ message: "Unauthorized" });
    } catch (e) {
      console.error(e); // It's good practice to log the error
      return res.status(500).json({ message: "Internal Error" });
    }
  }
}

module.exports = new Middleware();
