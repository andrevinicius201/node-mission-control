const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration",
    rocket: "Explorer IS1",
    launchDate: new Date('December 27, 2030'),
    target: "Keppler-442 b",
    customers: ['NASA', 'BR'],
    upcoming: true,
    success: true
};

const launches = new Map();
launches.set(launch.flightNumber, launch);

let latestFlightNumber = 100

function existsLaunchWithId(launchId){
    return launches.has(launchId)
}

function getAllLaunches(){
    const upcomingLaunches = Array.from(launches.values())
    return upcomingLaunches
}

function addNewLaunch(launch){
    latestFlightNumber++
    const newLaunch = Object.assign(launch, {
        flightNumber: latestFlightNumber,
        customers: [
            "NASA",
            "BR"
        ],
        upcoming: true,
        success: true
    })    
    launches.set(latestFlightNumber, newLaunch);
    return newLaunch
}

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId)
    aborted.upcoming = false
    aborted.success = false
    return aborted
}


module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById
}