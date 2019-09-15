import * as XLSX from 'xlsx';
import fs from 'fs';
import { User, UserModel } from '../models/user.model';
import { dayOfWeek } from '../models/availability';
import { FacilitatorModel } from '../models/facilitator.model';
import { GuestSpeakerModel } from '../models/guestSpeaker.model';

/**
  * Function for Getting the date format
  */
function getDate(excelDate: any): Date {
  return new Date((excelDate - (25567 + 1 )) * 86400 * 1000);
}

/**
  * Function for Getting all the facilitators
  */
function getFacilitators(file: Buffer): User[]
{
  const wb = XLSX.read(file, { type: 'buffer' });
  const u = wb.Sheets["Facilitators | GuestSpeakers"];
  const FandGSO: any[] = XLSX.utils.sheet_to_json(u);

  const facilitatorusers: User[] = [];
  for (let i = 0; i < Object.keys(FandGSO).length; i++) {
    if (FandGSO[i]["Type"] == 'Facilitator'){
      facilitatorusers.push(new UserModel({
        firstName: FandGSO[i]["First Name"],
        lastName: FandGSO[i]["Last Name"],
        address: FandGSO[i]["Address"],
        email: FandGSO[i]["email"],
        userType: FandGSO[i]["Type"],
        phoneNumber: FandGSO[i]["Phone Number"],
        _facilitator: new FacilitatorModel({
          city: FandGSO[i]["City"],
          trained: FandGSO[i]["Trained"],
          reliable: FandGSO[i]["Reliable"],
          availabilities:[
            {
              availableFrom: getDate(FandGSO[i]["Monday Available From"]),
              availableUntil: getDate(FandGSO[i]["Monday Available Until"]),
              dayOfWeek: dayOfWeek.MON
            },
            {
              availableFrom: getDate(FandGSO[i]["Tuesday Available From"]),
              availableUntil: getDate(FandGSO[i]["Tuesday Available Until"]),
              dayOfWeek: dayOfWeek.TUE
            },
            {
              availableFrom: getDate(FandGSO[i]["Wednesday Available From"]),
              availableUntil: getDate(FandGSO[i]["Wednesday Available Until"]),
              dayOfWeek: dayOfWeek.WED
            },
            {
              availableFrom: getDate(FandGSO[i]["Thursday Available From"]),
              availableUntil: getDate(FandGSO[i]["Thursday Available Until"]),
              dayOfWeek: dayOfWeek.THU
            },
            {
              availableFrom: getDate(FandGSO[i]["Friday Available From"]),
              availableUntil: getDate(FandGSO[i]["Friday Available Until"]),
              dayOfWeek: dayOfWeek.FRI
            },
            {
              availableFrom: getDate(FandGSO[i]["Saturday Available From"]),
              availableUntil: getDate(FandGSO[i]["Saturday Available Until"]),
              dayOfWeek: dayOfWeek.SAT
            },
            {
              availableFrom: getDate(FandGSO[i]["Sunday Available From"]),
              availableUntil: getDate(FandGSO[i]["Sunday Available Until"]),
              dayOfWeek: dayOfWeek.SUN
            }],
          specificUnavailabilities:[
            {
              date: getDate(FandGSO[i]["Specific Unavailability 1"]),
              notes: FandGSO[i]["Notes"],
            },
            {
              date: getDate(FandGSO[i]["Specific Unavailability 2"]),
              notes: FandGSO[i]["Notes"],
            },
            {
              date: getDate(FandGSO[i]["Specific Unavailability 3"]),
              notes: FandGSO[i]["Notes"],
            },
            {
              date: getDate(FandGSO[i]["Specific Unavailability 4"]),
              notes: FandGSO[i]["Notes"],
            },
            {
              date: getDate(FandGSO[i]["Specific Unavailability 5"]),
              notes: FandGSO[i]["Notes"],
            },
            {
              date: getDate(FandGSO[i]["Specific Unavailability 6"]),
              notes: FandGSO[i]["Notes"],
            }]
        })
      }));
    }
  }
  return facilitatorusers;
}
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
          city: FandGSO[i]["City"],
          trained: FandGSO[i]["Trained"],
          reliable: FandGSO[i]["Reliable"],
          availabilities:[
            {
              availableFrom: getDate(FandGSO[i]["Monday Available From"]),
              availableUntil: getDate(FandGSO[i]["Monday Available Until"]),
              dayOfWeek: dayOfWeek.MON
            },
            {
              availableFrom: getDate(FandGSO[i]["Tuesday Available From"]),
              availableUntil: getDate(FandGSO[i]["Tuesday Available Until"]),
              dayOfWeek: dayOfWeek.TUE
            },
            {
              availableFrom: getDate(FandGSO[i]["Wednesday Available From"]),
              availableUntil: getDate(FandGSO[i]["Wednesday Available Until"]),
              dayOfWeek: dayOfWeek.WED
            },
            {
              availableFrom: getDate(FandGSO[i]["Thursday Available From"]),
              availableUntil: getDate(FandGSO[i]["Thursday Available Until"]),
              dayOfWeek: dayOfWeek.THU
            },
            {
              availableFrom: getDate(FandGSO[i]["Friday Available From"]),
              availableUntil: getDate(FandGSO[i]["Friday Available Until"]),
              dayOfWeek: dayOfWeek.FRI
            },
            {
              availableFrom: getDate(FandGSO[i]["Saturday Available From"]),
              availableUntil: getDate(FandGSO[i]["Saturday Available Until"]),
              dayOfWeek: dayOfWeek.SAT
            },
            {
              availableFrom: getDate(FandGSO[i]["Sunday Available From"]),
              availableUntil: getDate(FandGSO[i]["Sunday Available Until"]),
              dayOfWeek: dayOfWeek.SUN
            }],
          specificUnavailabilities:[
            {
              date: getDate(FandGSO[i]["Specific Unavailability 1"]),
              notes: FandGSO[i]["Notes"],
            },
            {
              date: getDate(FandGSO[i]["Specific Unavailability 2"]),
              notes: FandGSO[i]["Notes"],
            },
            {
              date: getDate(FandGSO[i]["Specific Unavailability 3"]),
              notes: FandGSO[i]["Notes"],
            },
            {
              date: getDate(FandGSO[i]["Specific Unavailability 4"]),
              notes: FandGSO[i]["Notes"],
            },
            {
              date: getDate(FandGSO[i]["Specific Unavailability 5"]),
              notes: FandGSO[i]["Notes"],
            },
            {
              date: getDate(FandGSO[i]["Specific Unavailability 6"]),
              notes: FandGSO[i]["Notes"],
            }]
        })
      }));
    }
  }
  return GSusers;
}
const buf = fs.readFileSync("src/ExcelSheetIO/BigIssueRostering.xlsx");
console.log("Facilitator Details  :\n" + getFacilitators(buf));
console.log("Guest Speaker Details  :\n" + getGuestSpeakers(buf));
