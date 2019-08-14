import React from 'react';

export class Roster extends React.Component {
    /**
     * This method returns the preferred timeslot
     * @returns JSON Object
     */
    // Define JSON File 
    readDate() {
        var fs = require("fs");

        console.log("\n *STARTING* \n");

        // Get content from file
        var contents = fs.readFileSync("testData.json");

        // Define to JSON type
        var jsonContent = JSON.parse(contents);

        // Get Value from JSON
        console.log("User Name:", jsonContent.teacherPreference.day);
    }
}

export default Roster;
