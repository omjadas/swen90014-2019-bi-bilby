import { generateTimesForDay } from "./generateTimes";
import { readData } from "./readData";
import { generateTimesAlreadyBooked } from "./getTimesBooked";
import { Data } from "../models/data.model";
import { City } from "../models/city.model";

/**
* Base function for generating the availabilitites for the facilitator
* to choose on their specified day
*/
function findAvailableTimes(date: Date, city: City): Date[] {
  const data = readData();

  // Update so only get bookings for specific date
  const currentBookings: Data["bookings"] = data.bookings;

  const blockedTimes = generateTimesAlreadyBooked(currentBookings, city);

  const year = date.getFullYear();
  const month = date.getUTCMonth();
  const day = date.getDay();

  const possibleTimes = generateTimesForDay(year, month, day);

  // Remove all blocked out times from candidate list
  for (let i = 0; i < blockedTimes.length; i++) {
    for (let j = 0; j < possibleTimes.length; j++) {
      if (blockedTimes[i][0].getTime() === possibleTimes[j].getTime()) {
        // Remove the next 1.5 hours after clash
        possibleTimes.splice(j, 3);
      }
    }
  }

  return possibleTimes;
}
