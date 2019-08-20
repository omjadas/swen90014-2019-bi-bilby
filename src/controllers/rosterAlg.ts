//  import { generateTimesForDay } from "./generateTimes";
//  import { readData } from "./readData";
//  import { generateTimesAlreadyBooked } from "./getTimesBooked";

//  /**
//   * Base function for generating the availabilitites for the facilitator
//   * to choose on their specified day
//   */
//  async function findAvailableTimes(): Promise<void> {
//    const data = readData();

//    // Need to update to define with data model
//    const currentBookings = data.bookings;
//    const teacherPreferences = data.teacherPreference;
//    //const facilitators = data.facilitators;
//    //const guestSpeakers = data.guestSpeakers;

//    // Create new booking instances acording to teacher preferences.
//    const bookings = [];

//    for (let k = 0; k < teacherPreferences.lenght; k++) {
//      bookings.push(newBooking(teacherPreferences[k]));
//    }

//    // Get date for the preference
//    const preferredDate = teacherPreferences[0].date;
//    const year = Number(preferredDate.substring(0,4));
//    const month = Number(preferredDate.substring(5,7));
//    const day = Number(preferredDate.substring(8,10));

//    const possibleTimes = await generateTimesForDay(year, month - 1, day);

//    const blockedTimes = await generateTimesAlreadyBooked(currentBookings, teacherPreferences[0].area);

//    // Remove all blocked out times from candidate list
//    for (let i = 0; i < blockedTimes.length; i++) {
//      for (let j = 0; j < possibleTimes.length; j++) {
//        if (blockedTimes[i].getTime() === possibleTimes[j].getTime()) {
//          // Remove the next 1.5 hours after clash
//          possibleTimes.splice(j, 3);
//        }
//      }
//    }

//    // for (let i = 0; i < possibleTimes.length; i++) {
//    //   console.log(possibleTimes[i]);
//    // }

//    // From remaining times, manually select preference and add to unconfirmed bookings

//  }

// findAvailableTimes();
// >>>>>>> b7976871f3871018239ed66bb8ec78f614312001
