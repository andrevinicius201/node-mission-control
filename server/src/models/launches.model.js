const launchesDatabase = require("./launches.mongo")
const planets = require("./planets.mongo")

const DEFAULT_FLIGHT_NUMBER = 100


async function findLaunch(filter) {
    return await launchesDatabase.findOne(filter);
}

async function existsLaunchWithId(launchId) {
    return await findLaunch({
      flightNumber: launchId,
    });
  }


async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
      .findOne()
      .sort('-flightNumber');
  
    if (!latestLaunch) {
      return DEFAULT_FLIGHT_NUMBER;
    }
  
    return latestLaunch.flightNumber;
}

async function scheduleNewLaunch(launch) {
    const planet = await planets.findOne({
      keplerName: launch.target,
    });
  
    if (!planet) {
      throw new Error('No matching planet found');
    }
  
    const newFlightNumber = await getLatestFlightNumber() + 1;
  
    const newLaunch = Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ['Zero to Mastery', 'NASA'],
      flightNumber: newFlightNumber,
    });
  
    await saveLaunch(newLaunch);
}

async function saveLaunch(launch) {
    await launchesDatabase.findOneAndUpdate({
      flightNumber: launch.flightNumber,
    }, launch, {
      upsert: true,
    });
}

function getAllLaunches(){
    return launchesDatabase.find({}, {
        '_id':0, '__v':0
    })
}

async function abortLaunchById(launchId){
    return await launchesDatabase.updateOne({
        flightNumber:launchId
    }, {
        upcoming: false,
        success: false
    })
}


module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    abortLaunchById,
    scheduleNewLaunch,
}