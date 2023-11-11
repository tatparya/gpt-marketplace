const admin = require('firebase-admin');

exports.verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization;
  if (!idToken) {
    console.log("Token not provided")
    return res.status(403).send('Unauthorized');
  }
  console.log(idToken)
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    console.log(decodedToken)
    next();
  } catch (error) {
    console.log(error)
    res.status(403).send('Unauthorized');
  }
};
