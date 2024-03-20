const http = require("http")
const { mongoConnect } = require('../src/services/mongo')
const { loadPlanetsData } = require("../src/models/planets.model")
const { loadLaunches } = require("../src/models/launches.model")

require("dotenv").config()

app = require("./app")


const PORT = process.env.PORT || 8000

const server = http.createServer(app)


async function startServer(){
    await mongoConnect()
    await loadPlanetsData();
    await loadLaunches();

    server.listen(PORT, () => {
        console.log(`Listening port ${PORT}`)
    })
}

startServer();