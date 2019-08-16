import { generateTimesForDay } from "./generateTimes";
import { readData } from "./readData";
import { generateTimesAlreadyBooked } from "./getTimesBooked";

/**
 * Base function for generating the availabilitites for the facilitator
 * to choose on their specified day
 */
function findAvailableTimes(): void {
  const data = readData();
  
  // Need to update to define with data model
  const currentBookings = data.currentBookings;
  const teacherPreferences = data.teacherPreference;

  // Get date for the preference
  const preferredDate = teacherPreferences[0].date;
  const year = preferredDate.substring(0,4);
  const month = preferredDate.substring(5,7);
  const day = preferredDate.substring(8,10);

  const possibleTimes = generateTimesForDay(year, month - 1, day);

  generateTimesAlreadyBooked(currentBookings);

  console.log(possibleTimes);
}

findAvailableTimes();
