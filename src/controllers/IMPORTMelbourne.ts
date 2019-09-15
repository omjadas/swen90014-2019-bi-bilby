import * as XLSX from 'xlsx';
import fs from 'fs';
import { Booking, BookingModel } from '../models/booking.model';

// function getBooking(file: Buffer) : Booking
// {
//   const wb = XLSX.read(file, { type: 'buffer' });
//   const m = wb.Sheets["Melbourne"];
//   const MelbourneObject: any[] = XLSX.utils.sheet_to_json(m, { header: "A" });

//   const bookings: Booking[] = [];

//   for (let i = 2; i < Object.keys(MelbourneObject).length; i++) {
//     bookings.push(new BookingModel({
//       level: MelbourneObject[i]["K"],
//       numberOfStudents: MelbourneObject[i]["j"]
//     }));
//   }
//   return bookings;
// }

const buf = fs.readFileSync("src/ExcelSheetIO/BigIssueRostering.xlsx");
//console.log("Booking Details  :" + getBooking(buf));
