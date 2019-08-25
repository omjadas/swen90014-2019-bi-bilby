import { Booking } from "../models/booking.model";
import { TeacherPreference } from "../models/teacherPreference.model";
import {Facilitator} from "../models/facilitator.model";
import {GuestSpeaker} from "../models/guestSpeaker.model";
import { BookingModel } from "../models/booking.model";

/**
  * Create a new instance of Booking.
  */
/*export function newBooking(preference: TeacherPreference, facilitator: Facilitator, guestSpeaker: GuestSpeaker, timeBegin: Date, timeEnd: Date): Booking {
  const booking = new BookingModel({false, facilitator, guestSpeaker, timeBegin, timeEnd, preference.city,
    null, preference.workshop, preference.level, preference.user, null, preference.numberOfStudents});

  return (booking);
}
*/
/**
  * Set Booking status to confirmed or not confirmed.
  */
export function setBookingStatus(booking: Booking, confirmed: boolean): void {
  booking.confirmed = confirmed;
}

/**
  * Assign a Facilitator to the Booking.
  */
export function setBookingFacilitator(booking: Booking, facilitator: Facilitator): void {
  booking.facilitator = facilitator;
}

/**
  * Assign a Guest Spreker to the Booking.
  */
export function setBookingGuestSpeaker(booking: Booking, guestSpeaker: GuestSpeaker): void {
  booking.guestSpeaker = guestSpeaker;
}

/**
  * Set Booking time slot.
  */
export function setBookingTime(booking: Booking, timeBegin: Date, timeEnd: Date): void {
  booking.timeBegin = timeBegin;
  booking.timeEnd = timeEnd;
}
