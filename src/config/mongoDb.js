const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config()

mongoose.set("strictQuery", false); 

mongoose.connect(process.env.MONGO_URL, (err) => {
    if (err) {
        console.log(err.message)
    } else {
        console.log("Conectado a la base de datos de mongo");
    }
})