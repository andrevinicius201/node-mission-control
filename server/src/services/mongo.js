const mongoose = require("mongoose");
const dotenv = require("dotenv")

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.on("connecting", () => {
    console.log('Trying to connect to MongoDB database')
})

mongoose.connection.once("open", () => {
    console.log('MongoDB successfully connected')
})
mongoose.connection.on("error", (err) => {
    console.error(`Error when connecting with MongoDB Cluster ${err}`)
})

async function mongoConnect(){
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect(){
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}
