const admin = require('firebase-admin');

exports.verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization;
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
