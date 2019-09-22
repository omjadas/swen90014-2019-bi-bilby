import { Request, Response } from "express";
import rosterByPreferences from "./rosterAlg";
import { getCities, getBooking, getGuestSpeakers, getFacilitators } from "./excelOperations";
import { Booking } from "../models/booking.model";

/**
 * Function to handle uploading an excel file and generate a roster.
 *
 * @export
 * @param {Request} req request object
 * @param {Response} res response object
 * @returns {void}
 */
export function upload (req: Request, res: Response): void {
  if (req.files && !Array.isArray(req.files.excel)) {
    const file = req.files.excel.data;
    const cities = getCities(file);
    const bookings: Booking[] = [];
    cities.forEach(city => {
      bookings.concat(getBooking(file, city.city, new Date(), new Date()));
    });
    const guestSpeakers = getGuestSpeakers(file);
    const facilitators = getFacilitators(file);
    const roster = rosterByPreferences(bookings, guestSpeakers, facilitators);
  } else {
    res.send("File not found");
  }
}
