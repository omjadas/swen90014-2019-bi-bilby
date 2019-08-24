import { Booking } from "../models/booking.model";
import { City } from "../models/city.model";

/**
 * Find all current bookings times for a specified date
 */
export function generateTimesAlreadyBooked(bookings: Booking[], city: City): Date[][] {
  const blockedTimes = [];

  for (let i = 0; i < bookings.length; i++) {
    // Only block out bookings in same area
    if (bookings[i].city === city) {
      if (bookings[i].confirmed) {
        // Get date for current booking
        const confirmedBooking = bookings[i];
        const timeBegin = confirmedBooking.timeBegin;
        const timeEnd = confirmedBooking.timeEnd;

        blockedTimes.push([timeBegin,timeEnd]);
      }
    }
  }

  return (blockedTimes);
}
