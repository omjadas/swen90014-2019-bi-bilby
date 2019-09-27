import { Request, Response } from "express";
import stream from "stream";
import rosterByPreferences from "./rosterAlg";
import { getCities, getBookings, getGuestSpeakers, getFacilitators, printBooking } from "./excelOperations";
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
  let bookings: Booking[] = [];
  cities.forEach(city => {
    bookings = bookings.concat(getBookings(file, city.city, new Date(req.body.from), new Date(req.body.to)));
  });
  const guestSpeakers = getGuestSpeakers(file);
  const facilitators = getFacilitators(file);
  const roster = rosterByPreferences(bookings, guestSpeakers, facilitators);
  const out = printBooking(roster);

  const readStream = new stream.PassThrough();
  readStream.end(out);

  res.set("Content-disposition", "attachment; filename=out.xlsx");
  res.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

  readStream.pipe(res);

  // return res.send(out);
}
