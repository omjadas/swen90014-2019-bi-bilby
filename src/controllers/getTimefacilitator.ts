import { Facilitator } from "../models/facilitator.model";

/**
 * Find all current bookings times for a specified date
 */
export function getTimefacilitator(facilitator: Facilitator[]): Date[] {
  const availableTimes = [];

  for (let i = 0; i < facilitator.length; i++) {
    //if (facilitator[i].confirmed) {
    // Get date for current booking
    const confirmedBooking = facilitator[i];
    const year = Number(confirmedBooking.date.substring(0,4));
    const month = Number(confirmedBooking.date.substring(5,7));
    const day = Number(confirmedBooking.date.substring(8,10));
    const hour = Number(confirmedBooking.date.substring(11,13));
    const minute = Number(confirmedBooking.date.substring(14,16));

    const d = new Date(year, month - 1, day, hour, minute);

    availableTimes.push(d);
  }
  return (availableTimes);
}
