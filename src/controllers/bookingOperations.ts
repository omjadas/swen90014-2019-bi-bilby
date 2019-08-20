import { Booking } from "./booking.model";
import { TeacherPreference } from "../models/teacherPreference.model";

/**
 * Create a new instance of Booking.
 */
export function newBooking(teacherPreference: TeacherPreference): Booking {
  BookingModel.confirmed = false;
  BookingModel.facilitator = null;
  BookingModel.due = 0;
  BookingModel.area = teacherPreference.location;
  BookingModel.timeBegin = null;
  BookingModel.timeEnd = null;
  BookingModel.workshop = teacherPreference.workshop;
  BookingModel.contact = teacherPreference.contact;
  BookingModel.numberOfStudents = teacherPreference.numberOfStudents;

  return (BookingModel);
}

/**
 * Set Booking status to confirmedd or not confirmed.
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
 * Set Booking timeslot.
 */
export function setBookingTime(booking: Booking, timeBegin: Date, timeEnd: Date): void {
  booking.timeBegin = timeBegin;
  booking.timeEnd = timeEnd;
}
