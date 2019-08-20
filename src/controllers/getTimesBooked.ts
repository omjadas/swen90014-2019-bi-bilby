import { Booking } from "../models/booking.model";

/**
 * Find all current bookings times for a specified date
 */
export function generateTimesAlreadyBooked(bookings: Booking[], area: string): Date[] {
  const blockedTimes = [];

  for (let i = 0; i < bookings.length; i++) {
    // Only block out bookings in same area
    if (bookings[i].area === area) {
      if (bookings[i].confirmed) {
        // Get date for current booking
        const confirmedBooking = bookings[i];
        const year = Number(confirmedBooking.date.substring(0,4));
        const month = Number(confirmedBooking.date.substring(5,7));
        const day = Number(confirmedBooking.date.substring(8,10));
        const hour = confirmedBooking.timeBeginHour;
        const minute = confirmedBooking.timeBeginMinute;

        const d = new Date(year, month - 1, day, hour, minute);

        blockedTimes.push(d);
      }
    }
  }

  return (blockedTimes);
}
