const http = require("http")
const mongoose = require('mongoose');

app = require("./app")

const planetsModel = require("../src/models/planets.model")

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

const MONGO_URL = "mongodb+srv://andrevinicius1899:FOM71QbUJZkZ8sCr@nasacluster.mjf7ixr.mongodb.net/?retryWrites=true&w=majority&appName=NASACluster"
mongoose.connection.once("open", () => {
    console.log('MongoDB successfully connected')
})

mongoose.connection.on("error", (err) => {
    console.error(`Error when connecting with MongoDB Cluster ${err}`)
})

async function startServer(){
    await mongoose.connect(MONGO_URL)
    await planetsModel.loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening port ${PORT}`)
    })
}

startServer();