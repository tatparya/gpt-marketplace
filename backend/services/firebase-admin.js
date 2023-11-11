const admin = require('firebase-admin');
const serviceAccount = require('../configs/firebase-config.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
module.exports = {admin, db};
