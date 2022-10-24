const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const PORT = 3000;
const cors = require("cors")
const additionalClaims = {
        metaMaskAccount: 'marwenlabidimetamask',
      };
app.use(cors())

admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
});

app.get("/", (req, res) => {
        admin.auth()
                .createCustomToken(uuidv4(),additionalClaims)
                .then((customToken) => {
                        // Send token back to client
                        res.json(customToken);
                })
                .catch((error) => {
                        console.log("Error creating custom token:", error);
                });
});

app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`);
});

module.exports = app;
