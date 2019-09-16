import * as XLSX from 'xlsx';
import fs from 'fs';
import { Booking, BookingModel, BookingState } from '../models/booking.model';
import { CityModel } from '../models/city.model';
import { UserModel } from '../models/user.model';
import { SchoolModel } from '../models/school.model';
import { FacilitatorModel } from '../models/facilitator.model';
import { GuestSpeakerModel } from '../models/guestSpeaker.model';
import { LocationModel } from '../models/location.model';
import { WorkshopModel } from '../models/workshop.model';
import { getDate } from '../controllers/getDateFunction';

/**
  * Function for Getting all the Booking details
  */
function getBooking(file: Buffer): any //Return should be given booking...but its giving an error
{
  const wb = XLSX.read(file, { type: 'buffer' });
  const m = wb.Sheets["Melbourne"];
  const MelbourneObject: any[] = XLSX.utils.sheet_to_json(m, { header: "A" });
  const booking: Booking[] = [];

  for (let i = 2; i < Object.keys(MelbourneObject).length; i++) {
    booking.push(new BookingModel({
      state: BookingState.PENDING,
      facilitator: new FacilitatorModel({
      }),
      guestSpeaker: new GuestSpeakerModel({
      }),
      sessionTime: {
        timeBegin:  getDate(MelbourneObject[i]["E"]),
        timeEnd:  getDate(MelbourneObject[i]["F"]),
      },
      city:  new CityModel({
        city: MelbourneObject[i]["G"],
      }),
      location: new LocationModel({
        location:  MelbourneObject[i]["G"],
      }),
      workshop: new WorkshopModel({
        workshopName: MelbourneObject[i]["I"],
      }),
      level: MelbourneObject[i]["K"],
      teacher: new UserModel({
        firstName:  MelbourneObject[i]["L"],
        email:  MelbourneObject[i]["N"],
        school: new SchoolModel({
          name: MelbourneObject[i]["M"],
        }),
      }),
      numberOfStudents: MelbourneObject[i]["J"],
      //check this
      firstTime: false,
    }));
  }
  return booking;
}

const buf = fs.readFileSync("src/ExcelSheetIO/BigIssueRostering.xlsx");
console.log("Booking Details  :" + getBooking(buf));
