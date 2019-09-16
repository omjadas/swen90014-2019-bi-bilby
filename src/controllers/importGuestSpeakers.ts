import * as XLSX from 'xlsx';
import fs from 'fs';
import { User, UserModel } from '../models/user.model';
import { dayOfWeek } from '../models/availability';
import { GuestSpeakerModel } from '../models/guestSpeaker.model';
import { CityModel } from '../models/city.model';
import { getconversionDate } from '../controllers/getDateFunction';

/**
  * Function for Getting all the Guest Speakers
  */
function getGuestSpeakers(file: Buffer): User[]
{
  const wb = XLSX.read(file, { type: 'buffer' });
  const u = wb.Sheets["Facilitators | GuestSpeakers"];
  const FandGSO: any[] = XLSX.utils.sheet_to_json(u);
  const GSusers: User[] = [];

  for (let i = 0; i < Object.keys(FandGSO).length; i++) {
    if (FandGSO[i]["Type"] == 'Guest Speaker'){
      GSusers.push(new UserModel({
        firstName: FandGSO[i]["First Name"],
        lastName: FandGSO[i]["Last Name"],
        address: FandGSO[i]["Address"],
        email: FandGSO[i]["email"],
        userType: FandGSO[i]["Type"],
        phoneNumber: FandGSO[i]["Phone Number"],
        _guestSpeaker: new GuestSpeakerModel({
          trained: ((FandGSO[i]["Trained"] == "Yes") ? true : false),
          reliable: ((FandGSO[i]["Reliable"] == "Yes") ? true : false),
          city: new CityModel({
            city: FandGSO[i]["City"]
          }),
          availabilities:[
            {
              availableFrom: getconversionDate(FandGSO[i]["Monday Available From"]),
              availableUntil: getconversionDate(FandGSO[i]["Monday Available Until"]),
              dayOfWeek: dayOfWeek.MON
            },
            {
              availableFrom: getconversionDate(FandGSO[i]["Tuesday Available From"]),
              availableUntil: getconversionDate(FandGSO[i]["Tuesday Available Until"]),
              dayOfWeek: dayOfWeek.TUE
            },
            {
              availableFrom: getconversionDate(FandGSO[i]["Wednesday Available From"]),
              availableUntil: getconversionDate(FandGSO[i]["Wednesday Available Until"]),
              dayOfWeek: dayOfWeek.WED
            },
            {
              availableFrom: getconversionDate(FandGSO[i]["Thursday Available From"]),
              availableUntil: getconversionDate(FandGSO[i]["Thursday Available Until"]),
              dayOfWeek: dayOfWeek.THU
            },
            {
              availableFrom: getconversionDate(FandGSO[i]["Friday Available From"]),
              availableUntil: getconversionDate(FandGSO[i]["Friday Available Until"]),
              dayOfWeek: dayOfWeek.FRI
            },
            {
              availableFrom: getconversionDate(FandGSO[i]["Saturday Available From"]),
              availableUntil: getconversionDate(FandGSO[i]["Saturday Available Until"]),
              dayOfWeek: dayOfWeek.SAT
            },
            {
              availableFrom: getconversionDate(FandGSO[i]["Sunday Available From"]),
              availableUntil: getconversionDate(FandGSO[i]["Sunday Available Until"]),
              dayOfWeek: dayOfWeek.SUN
            }],
          specificUnavailabilities:[
            {
              date: getconversionDate(FandGSO[i]["Specific Unavailability 1"]),
              notes: FandGSO[i]["Notes"],
            },
            {
              date: getconversionDate(FandGSO[i]["Specific Unavailability 2"]),
              notes: FandGSO[i]["Notes"],
            },
            {
              date: getconversionDate(FandGSO[i]["Specific Unavailability 3"]),
              notes: FandGSO[i]["Notes"],
            },
            {
              date: getconversionDate(FandGSO[i]["Specific Unavailability 4"]),
              notes: FandGSO[i]["Notes"],
            },
            {
              date: getconversionDate(FandGSO[i]["Specific Unavailability 5"]),
              notes: FandGSO[i]["Notes"],
            },
            {
              date: getconversionDate(FandGSO[i]["Specific Unavailability 6"]),
              notes: FandGSO[i]["Notes"],
            }]
        })
      }));
    }
  }
  return GSusers;
}

const buf = fs.readFileSync("src/ExcelSheetIO/BigIssueRostering.xlsx");

// to get the all the details
console.log("Guest Speaker Details  :\n" + JSON.stringify(getGuestSpeakers(buf), null, 4));
