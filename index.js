var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
});

const uid = "some-uid";

admin.auth()
        .createCustomToken(uid)
        .then((customToken) => {
                console.log("customToken: ", customToken);
                // Send token back to client
        })
        .catch((error) => {
                console.log("Error creating custom token:", error);
        });
