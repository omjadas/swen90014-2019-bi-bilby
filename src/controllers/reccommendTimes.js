// Read input data and all current constraints
const readData = () => {
        var fs = require("fs");

        console.log("\n *STARTING* \n");

        // Get content from file
        var contents = fs.readFileSync("./src/controllers/data/testData.json");

        // Define to JSON type
        var jsonContent = JSON.parse(contents);

        // Get available times
        timeSlots = getAvailableTimes(jsonContent.teacherPreference.day,
            jsonContent.teacherPreference.area, jsonContent.teacherPreference.workshop,
            jsonContent.currentBookings);

        console.log(timeSlots);
    }

// See what time slots are available for a specific date, area
const getAvailableTimes = (date, area, workshop, currentBookings) => {
    let numBookings = currentBookings.length;

    // Generate list of possible times
    possibleTimes = generateTimes();
    
    for (var i = 0; i < numBookings; i++) {
        if (currentBookings[i].area === area) {
            if (currentBookings[i].date === date) {
                if (currentBookings[i].confirmed) {
                    // If we have found a booking, remove from candidate list
                    var index = possibleTimes.indexOf(currentBookings[i].timeBegin);
                    
                    // Remove the next 2 30 min booking intervals
                    possibleTimes.splice(index, 3);
                }
            }
        }
    }

    // Return a list of the possible times for that date, area and workshop
    return (possibleTimes);
}

// Generate list of possible start time (every half an hour from 9 - 3)
const generateTimes = () => {
    let times = [];

    for (var i = 0; i < 20; i++) {
        times.push(900 + i*30);
    }

    return (times);
}

readData();