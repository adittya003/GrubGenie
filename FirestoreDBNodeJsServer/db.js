var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

module.exports = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
//admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const auth = admin.auth();

module.exports = {auth,db,admin};