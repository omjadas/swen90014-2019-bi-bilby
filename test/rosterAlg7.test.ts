import rosterByPreferences from "../src/controllers/rosterAlg";
import { getCities, getBookings, getGuestSpeakers, getFacilitators, printBooking } from "../src/controllers/excelOperations";
import { Booking } from "../src/models/booking.model";
import { rosterFile } from "../src/controllers/apiControllers";
import fs from "fs";

const buf = fs.readFileSync("test/data/BigIssueRostering.xlsx");

test("bookings on different days", () => {
  expect(rosterFile(new Date(2019, 8, 5), new Date(2019, 8, 9), buf));
});
