const http = require("http")

app = require("./app")

const planetsModel = require("../src/models/planets.model")

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

async function startServer(){
    await planetsModel.loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening port ${PORT}`)
    })
}

startServer();