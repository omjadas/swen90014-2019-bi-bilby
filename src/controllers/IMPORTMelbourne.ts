import * as XLSX from 'xlsx';
import fs from 'fs';
import { Booking, BookingModel } from '../models/booking.model';

const buf = fs.readFileSync("src/ExcelSheetIO/BigIssueRostering.xlsx");
const wb = XLSX.read(buf, { type: 'buffer' });
const m = wb.Sheets["Melbourne"];
console.log(XLSX.utils.sheet_to_json(m));
/**
  * Function for Getting all the Booking details
  */
// function getBooking(file: Buffer): Booking
// {
//   const wb = XLSX.read(file, { type: 'buffer' });
//   const m = wb.Sheets["Melbourne"];
//   const MelbourneObject: any[] = XLSX.utils.sheet_to_json(m, { header: "A" });

//   const bookings: Booking[] = [];

//   for (let i = 2; i < Object.keys(MelbourneObject).length; i++) {
//     bookings.push(new BookingModel({
//         :  MelbourneObject[i]["A"],
//         :  MelbourneObject[i]["B"],
//         :  MelbourneObject[i]["C"],
//         :  MelbourneObject[i]["D"],
//         :  MelbourneObject[i]["E"],
//         :  MelbourneObject[i]["F"],
//         :  MelbourneObject[i]["G"],
//         :  MelbourneObject[i]["H"],
//         :  MelbourneObject[i]["I"],
//       numberOfStudents: MelbourneObject[i]["J"],
//       level: MelbourneObject[i]["K"],
//         :  MelbourneObject[i]["P"],
//         :  MelbourneObject[i]["L"],
//         :  MelbourneObject[i]["M"],
//         :  MelbourneObject[i]["N"],
//         :  MelbourneObject[i]["O"],
//     }));
//   }
//   return bookings;
// }

// const buf = fs.readFileSync("src/ExcelSheetIO/BigIssueRostering.xlsx");
// console.log("Booking Details  :" + getBooking(buf));
