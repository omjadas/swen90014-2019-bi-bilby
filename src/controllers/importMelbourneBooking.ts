import * as XLSX from 'xlsx';
import fs from 'fs';
import { Booking, BookingModel, BookingState } from '../models/booking.model';
import { CityModel, City } from '../models/city.model';
import { UserModel, User, UserType } from '../models/user.model';
import { SchoolModel } from '../models/school.model';
import { FacilitatorModel } from '../models/facilitator.model';
import { GuestSpeakerModel } from '../models/guestSpeaker.model';
import { LocationModel } from '../models/location.model';
import { WorkshopModel, Workshop } from '../models/workshop.model';
import { getconversionDate } from '../controllers/getDateFunction';
import { dayOfWeek } from '../models/availability';
import { TeacherModel } from '../models/teacher.model';

/**
  * Function to get the Cities
  */
export function getCities(file: Buffer): City[] {
  const wb = XLSX.read(file, { type: 'buffer' });
  const s = wb.Sheets["Locations | Workshops"];
  const mydataCity: any[] = XLSX.utils.sheet_to_json(s);
  const cities: City[] = [];

  Object.values(mydataCity[0]).forEach((city) => {
    cities.push(new CityModel({ city: city }));
  });
  return cities;
}
/**
  * Function for Getting all the Guest Speakers
  */
export function getGuestSpeakers(file: Buffer): User[]
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
/**
  * Function for Getting all the facilitators
  */
export function getFacilitators(file: Buffer): User[]
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
  return facilitatorusers;
}
/**
  * Function for Getting all the School details
  */
export function getSchools(file: Buffer): User[]
{
  const wb = XLSX.read(file, { type: 'buffer' });
  const c = wb.Sheets["Contact Information"];
  const contact: any[]  = XLSX.utils.sheet_to_json(c, { header: "A" });
  const schools: User[] = [];

  for (let i = 2; i < Object.keys(contact).length; i++) {
    schools.push(new UserModel({
      firstName: contact[i]["A"],
      email: contact[i]["D"],
      phoneNumber: contact[i]["E"],
      userType: UserType.TEACHER,
      _teacher: new TeacherModel({
        school: new SchoolModel({
          city: new CityModel({
            city: contact[i]["B"],
          }),
          name: contact[i]["C"],
        }),
      }),
    }));
  }
  return schools;
}
/**
  * Function to get Workshop types
  */
export function getWorkshopTypes(file: Buffer): Workshop[] {
  const wb = XLSX.read(file, { type: 'buffer' });
  const s = wb.Sheets["Locations | Workshops"];
  const mydataCity: any[] = XLSX.utils.sheet_to_json(s);
  const workshops: Workshop[] = [];

  for (let i = 1; i < Object.keys(mydataCity).length; i++) {
    workshops.push(new WorkshopModel({ workshopName: mydataCity[i]["Workshop Type"] }));
  }
  return workshops;
}
/**
  * Function for Getting all the Booking details
  */
function getBooking(file: Buffer, tilldate: Date): any //Return should be given booking...but its giving an error
{
  const wb = XLSX.read(file, { type: 'buffer' });
  const m = wb.Sheets["Melbourne"];
  const MelbourneObject: any[] = XLSX.utils.sheet_to_json(m, { header: "A" });
  const booking: Booking[] = [];

  for (let i = 2; i < Object.keys(MelbourneObject).length; i++) {
    const da = new Date(2019, 6, MelbourneObject[i]["D"]);
    //console.log(da);
    if (da <= tilldate)
    {
      booking.push(new BookingModel({
        state: BookingState.PENDING,
        facilitator: new FacilitatorModel({
        }),
        guestSpeaker: new GuestSpeakerModel({
        }),
        sessionTime: {
          timeBegin:  getconversionDate(MelbourneObject[i]["E"]),
          timeEnd:  getconversionDate(MelbourneObject[i]["F"]),
        },
        city:  new CityModel({
        }),
        location: new LocationModel({
          name:  MelbourneObject[i]["G"],
          capacity: MelbourneObject[i]["J"],
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
        //check this
        firstTime: false,
      }));
    }
  }
  return booking;
}
