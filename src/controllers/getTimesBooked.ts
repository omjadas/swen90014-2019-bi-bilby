import { Booking } from "../models/booking.model";
import { City } from "../models/city.model";
import { SessionTime } from "../models/teacherPreference.model";

/**
 * Find all current bookings times for a specified date
 */
export function generateTimesAlreadyBooked(bookings: Booking[], city: City): SessionTime[] {
  const blockedTimes = [];

  for (let i = 0; i < bookings.length; i++) {
    // Only block out bookings in same area
    if (bookings[i].city === city) {
      if (bookings[i].confirmed) {
        // Get date for current booking
        const confirmedBooking = bookings[i];
        const sessionTime: SessionTime = {
          timeBegin: confirmedBooking.sessionTime.timeBegin,
          timeEnd: confirmedBooking.sessionTime.timeEnd
        };
        blockedTimes.push(sessionTime);
      }
    }
  }

  return (blockedTimes);
}
