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
export function upload(req: Request, res: Response): any {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  if (Array.isArray(req.files.excel)) {
    return res.status(400).send("Only one file is allowed to be uploaded.");
  }

  const file = req.files.excel.data;
  const cities = getCities(file);
  const bookings: Booking[] = [];
  cities.forEach(city => {
    bookings.concat(getBooking(file, city.city, new Date(req.body.from), new Date(req.body.to)));
  });
  const guestSpeakers = getGuestSpeakers(file);
  const facilitators = getFacilitators(file);
  const roster = rosterByPreferences(bookings, guestSpeakers, facilitators);
  return res.sendStatus(200);
}
