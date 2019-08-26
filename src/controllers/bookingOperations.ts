import { Booking, BookingModel } from "../models/booking.model";
import {Facilitator} from "../models/facilitator.model";
import {GuestSpeaker} from "../models/guestSpeaker.model";
import {City} from "../models/city.model";
import {Workshop} from "../models/workshop.model";
import {Location} from "../models/location.model";
import {User} from "../models/user.model";
import * as mongoose from "mongoose";

/**
  * Create a new instance of Booking.
  */
export function newBooking(confirmed: boolean, facilitator: Facilitator, guestSpeaker: GuestSpeaker,
  timeBegin: Date, timeEnd: Date, city: mongoose.Schema.Types.ObjectId | City,
  location: Location, workshop: Workshop, level: string, teacher: User,
  firstTime: boolean, numberOfStudents: number): Booking {

  const booking = new BookingModel({
    confirmed, facilitator, guestSpeaker, timeBegin, timeEnd, city,
    location, workshop, level, teacher, firstTime, numberOfStudents
  });


  return booking;
}

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
  * Assign a Guest Speaker to the Booking.
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
