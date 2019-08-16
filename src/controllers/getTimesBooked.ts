/**
 * Find all current bookings times for a specified date
 */
export function generateTimesAlreadyBooked(currentBookings: JSON[]): Date[] {
  const blockedTimes = [];
  
  for (let i = 0; i < currentBookings.length; i++) {
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
