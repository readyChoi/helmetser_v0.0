export var fcm = require("firebase-admin");

import serviceAccount from "./hackathon-9891c-firebase-adminsdk-mtkmm-c5623cb20e.json";
fcm.initializeApp({
  credential: fcm.credential.cert(serviceAccount)
});
