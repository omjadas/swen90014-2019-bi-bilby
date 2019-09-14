import * as XLSX from 'xlsx';
import fs from 'fs';
import { Booking, BookingModel } from '../models/booking.model';


const buf = fs.readFileSync("src/ExcelSheetIO/BigIssueRostering.xlsx");
const wb = XLSX.read(buf, { type: 'buffer' });

//Getting Melbourne sheet
const m = wb.Sheets["Melbourne"];
const Melbournexlsx = XLSX.utils.sheet_to_json(m, { header: "A" });
const MelbourneObject = JSON.stringify(Melbournexlsx, null, 4);
const melbourne = JSON.parse(MelbourneObject);

//console.log(MelbourneObject);
fs.writeFile("src/ExcelSheetIO/Melbourne.json", MelbourneObject, function (err) {
  if (err) {
    console.log(err);
  }
  console.log("Done");
});


const bookings: Booking[] = [];

for (let i = 2; i < Object.keys(melbourne).length; i++) {
  bookings.push(new BookingModel({
    level: melbourne[i]["K"],
    numberOfStudents: melbourne[i]["j"]
  }));
}

console.log("Details  :" + bookings.toString());
