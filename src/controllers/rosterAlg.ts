import { generateTimesForDay } from "./generateTimes";
import { readData } from "./readData";

/**
 * Find all current bookings times for a specified date
 */
function generateTimesAlreadyBooked(currentBookings: JSON[]): Date[] {
  const blockedTimes = [];

  for (const i = 0; i < currentBookings.length; i++) {
    if (currentBookings[i].confirmed) {
      // Get date for current booking
      const confirmedBooking = currentBookings[i].date;
      const year = confirmedBooking.substring(0,4);
      const month = confirmedBooking.substring(5,7);
      const day = confirmedBooking.substring(8,10);
      const hour = confirmedBooking.timeBeginHour;
      const minute = confirmedBooking.timeBeginMinute;

      const d = new Date(year, month, day, hour, minute);

      blockedTimes.push(d);
    }
  }

  return (blockedTimes);
}

/**
 * Base function for generating the availabilitites
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
