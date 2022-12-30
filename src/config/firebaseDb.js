const admin = require("firebase-admin");
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./src/config/credentials.json', 'utf-8'))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin