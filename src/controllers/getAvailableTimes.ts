import { generateTimesForDay } from "./generateTimes";
import { readData } from "./readData";
import { generateTimesAlreadyBooked } from "./getTimesBooked";
import { Data } from "../models/data.model";
import { City } from "../models/city.model";
import { Booking } from "../models/booking.model";

/**
* Base function for generating the availabilitites. The school
* will select a specific date from the calendar and this function
* will return the unblocked times.
*/
function findAvailableTimes(date: Date, city: City, currentBookings: Booking[]): Date[] {
  // Update so only get bookings for specific date
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
