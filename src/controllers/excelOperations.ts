import * as XLSX from "xlsx";
import { Booking, BookingModel, BookingState } from "../models/booking.model";
import { CityModel, City } from "../models/city.model";
import { UserModel, User, UserType } from "../models/user.model";
import { SchoolModel } from "../models/school.model";
import { FacilitatorModel } from "../models/facilitator.model";
import { GuestSpeakerModel } from "../models/guestSpeaker.model";
import { LocationModel, Location } from "../models/location.model";
import { WorkshopModel, Workshop } from "../models/workshop.model";
import { dayOfWeek } from "../models/availability";
import { TeacherModel } from "../models/teacher.model";

/**
 * Function for Getting the date format
 * @param {number} excelDate The date to be converted
 * @returns {Date} converted Date
 */
function getConversionDate(excelDate: number): Date {
  return new Date((excelDate - (25567 + 2)) * 86400 * 1000);
}

/**
 * Function to get the Cities
 * @param {Buffer} file - The excel sheet
 * @returns {City} Cities array
 */
export function getCities(file: Buffer): City[] {
  const wb = XLSX.read(file, { type: "buffer" });
  const s = wb.Sheets["Locations | Workshops"];
  const myDataCity: any[] = XLSX.utils.sheet_to_json(s);
  const cities: City[] = [];

  Object.values(myDataCity[0]).forEach((city) => {
    cities.push(new CityModel({ city: city }));
  });
  return cities;
}

/**
 * Function for Getting all the Guest Speakers
 * @param {Buffer} file - The excel sheet
 * @returns {User} Users array
 */
export function getGuestSpeakers(file: Buffer): User[] {
  const wb = XLSX.read(file, { type: "buffer" });
  const u = wb.Sheets["Facilitators | GuestSpeakers"];
  const FAndGSO: any[] = XLSX.utils.sheet_to_json(u);
  const GSUsers: User[] = [];

  for (let i = 0; i < Object.keys(FAndGSO).length; i++) {
    if (FAndGSO[i]["Type"] === "Guest Speaker") {
      GSUsers.push(new UserModel({
        firstName: FAndGSO[i]["First Name"],
        lastName: FAndGSO[i]["Last Name"],
        address: FAndGSO[i]["Address"],
        email: FAndGSO[i]["Email"],
        userType: UserType.GUEST_SPEAKER,
        phoneNumber: FAndGSO[i]["Phone Number"],
        _guestSpeaker: new GuestSpeakerModel({
          trained: ((FAndGSO[i]["Trained"] === "Yes") ? true : false),
          reliable: ((FAndGSO[i]["Reliable"] === "Yes") ? true : false),
          city: new CityModel({
            city: FAndGSO[i]["City"]
          }),
          availabilities: [
            {
              availableFrom: getConversionDate(FAndGSO[i]["Monday Available From"]),
              availableUntil: getConversionDate(FAndGSO[i]["Monday Available Until"]),
              dayOfWeek: dayOfWeek.MON
            },
            {
              availableFrom: getConversionDate(FAndGSO[i]["Tuesday Available From"]),
              availableUntil: getConversionDate(FAndGSO[i]["Tuesday Available Until"]),
              dayOfWeek: dayOfWeek.TUE
            },
            {
              availableFrom: getConversionDate(FAndGSO[i]["Wednesday Available From"]),
              availableUntil: getConversionDate(FAndGSO[i]["Wednesday Available Until"]),
              dayOfWeek: dayOfWeek.WED
            },
            {
              availableFrom: getConversionDate(FAndGSO[i]["Thursday Available From"]),
              availableUntil: getConversionDate(FAndGSO[i]["Thursday Available Until"]),
              dayOfWeek: dayOfWeek.THU
            },
            {
              availableFrom: getConversionDate(FAndGSO[i]["Friday Available From"]),
              availableUntil: getConversionDate(FAndGSO[i]["Friday Available Until"]),
              dayOfWeek: dayOfWeek.FRI
            },
            {
              availableFrom: getConversionDate(FAndGSO[i]["Saturday Available From"]),
              availableUntil: getConversionDate(FAndGSO[i]["Saturday Available Until"]),
              dayOfWeek: dayOfWeek.SAT
            },
            {
              availableFrom: getConversionDate(FAndGSO[i]["Sunday Available From"]),
              availableUntil: getConversionDate(FAndGSO[i]["Sunday Available Until"]),
              dayOfWeek: dayOfWeek.SUN
            }],
          specificUnavailabilities: [
            {
              date: getConversionDate(FAndGSO[i]["Specific Unavailability 1"]),
              notes: FAndGSO[i]["Notes"],
            },
            {
              date: getConversionDate(FAndGSO[i]["Specific Unavailability 2"]),
              notes: FAndGSO[i]["Notes"],
            },
            {
              date: getConversionDate(FAndGSO[i]["Specific Unavailability 3"]),
              notes: FAndGSO[i]["Notes"],
            },
            {
              date: getConversionDate(FAndGSO[i]["Specific Unavailability 4"]),
              notes: FAndGSO[i]["Notes"],
            },
            {
              date: getConversionDate(FAndGSO[i]["Specific Unavailability 5"]),
              notes: FAndGSO[i]["Notes"],
            },
            {
              date: getConversionDate(FAndGSO[i]["Specific Unavailability 6"]),
              notes: FAndGSO[i]["Notes"],
            }],
          assignedTimes: []
        })
      }));
    }
  }
  return GSUsers;
}

/**
 * Function for Getting all the facilitators
 * @param {Buffer} file - The excel sheet
 * @returns {User} Users array
 */
export function getFacilitators(file: Buffer): User[] {
  const wb = XLSX.read(file, { type: "buffer" });
  const u = wb.Sheets["Facilitators | GuestSpeakers"];
  const FAndGSO: any[] = XLSX.utils.sheet_to_json(u);
  const facilitatorUsers: User[] = [];
  for (let i = 0; i < Object.keys(FAndGSO).length; i++) {
    if (FAndGSO[i]["Type"] === "Facilitator") {
      facilitatorUsers.push(new UserModel({
        firstName: FAndGSO[i]["First Name"],
        lastName: FAndGSO[i]["Last Name"],
        address: FAndGSO[i]["Address"],
        email: FAndGSO[i]["Email"],
        userType: UserType.FACILITATOR,
        phoneNumber: FAndGSO[i]["Phone Number"],
        _facilitator: new FacilitatorModel({
          trained: ((FAndGSO[i]["Trained"] === "Yes") ? true : false),
          reliable: ((FAndGSO[i]["Reliable"] === "Yes") ? true : false),
          city: new CityModel({
            city: FAndGSO[i]["City"]
          }),
          availabilities: [
            {
              availableFrom: getConversionDate(FAndGSO[i]["Monday Available From"]),
              availableUntil: getConversionDate(FAndGSO[i]["Monday Available Until"]),
              dayOfWeek: dayOfWeek.MON
            },
            {
              availableFrom: getConversionDate(FAndGSO[i]["Tuesday Available From"]),
              availableUntil: getConversionDate(FAndGSO[i]["Tuesday Available Until"]),
              dayOfWeek: dayOfWeek.TUE
            },
            {
              availableFrom: getConversionDate(FAndGSO[i]["Wednesday Available From"]),
              availableUntil: getConversionDate(FAndGSO[i]["Wednesday Available Until"]),
              dayOfWeek: dayOfWeek.WED
            },
            {
              availableFrom: getConversionDate(FAndGSO[i]["Thursday Available From"]),
              availableUntil: getConversionDate(FAndGSO[i]["Thursday Available Until"]),
              dayOfWeek: dayOfWeek.THU
            },
            {
              availableFrom: getConversionDate(FAndGSO[i]["Friday Available From"]),
              availableUntil: getConversionDate(FAndGSO[i]["Friday Available Until"]),
              dayOfWeek: dayOfWeek.FRI
            },
            {
              availableFrom: getConversionDate(FAndGSO[i]["Saturday Available From"]),
              availableUntil: getConversionDate(FAndGSO[i]["Saturday Available Until"]),
              dayOfWeek: dayOfWeek.SAT
            },
            {
              availableFrom: getConversionDate(FAndGSO[i]["Sunday Available From"]),
              availableUntil: getConversionDate(FAndGSO[i]["Sunday Available Until"]),
              dayOfWeek: dayOfWeek.SUN
            }],
          specificUnavailabilities: [
            {
              date: getConversionDate(FAndGSO[i]["Specific Unavailability 1"]),
              notes: FAndGSO[i]["Notes"],
            },
            {
              date: getConversionDate(FAndGSO[i]["Specific Unavailability 2"]),
              notes: FAndGSO[i]["Notes"],
            },
            {
              date: getConversionDate(FAndGSO[i]["Specific Unavailability 3"]),
              notes: FAndGSO[i]["Notes"],
            },
            {
              date: getConversionDate(FAndGSO[i]["Specific Unavailability 4"]),
              notes: FAndGSO[i]["Notes"],
            },
            {
              date: getConversionDate(FAndGSO[i]["Specific Unavailability 5"]),
              notes: FAndGSO[i]["Notes"],
            },
            {
              date: getConversionDate(FAndGSO[i]["Specific Unavailability 6"]),
              notes: FAndGSO[i]["Notes"],
            }],
          assignedTimes: []
        })
      }));
    }
  }
  return facilitatorUsers;
}

/**
 * Function for Getting all the School details
 * @param {Buffer} file - The excel sheet
 * @returns {User} Users array
 */
export function getSchools(file: Buffer): User[] {
  const wb = XLSX.read(file, { type: "buffer" });
  const c = wb.Sheets["Contact Information"];
  const contact: any[] = XLSX.utils.sheet_to_json(c, { header: "A" });
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
  * @param {Buffer} file - The excel sheet
  * @returns {Workshop} Workshop array
  */
export function getWorkshopTypes(file: Buffer): Workshop[] {
  const wb = XLSX.read(file, { type: "buffer" });
  const s = wb.Sheets["Locations | Workshops"];
  const myDataCity: any[] = XLSX.utils.sheet_to_json(s, { header: "A" });
  const workshops: Workshop[] = [];

  for (let i = 2; i < Object.keys(myDataCity).length; i++) {
    workshops.push(new WorkshopModel({
      workshopName: myDataCity[i]["E"],
      requireFacilitator: (myDataCity[i]["F"]),
      requireGuestSpeaker: (myDataCity[i]["G"])
    }));
  }
  return workshops;
}

/**
 * Function for Getting all the Booking details
 * @param {Buffer} file - The excel sheet
 * @param {string} cityName - Sheet name
 * @param {Date} fromDate - From Date
 * @param {Date} toDate - Till Date
 * @returns {Booking} booking
 */
export function getBookings(file: Buffer, cityName: string, fromDate: Date, toDate: Date): Booking[] {
  const wb = XLSX.read(file, { type: "buffer" });
  if (wb.Sheets[cityName]) {
    const m = wb.Sheets[cityName];
    const cityObject: any[] = XLSX.utils.sheet_to_json(m, { header: "A" });
    const booking: Booking[] = [];
    toDate.setDate(toDate.getDate() + 1);
    for (let i = 2; i < Object.keys(cityObject).length; i++) {
      const da = getConversionDate(cityObject[i]["B"]);
      if (da > fromDate && da < toDate) {
        booking.push(new BookingModel({
          state: BookingState.PENDING,
          facilitator: undefined,
          guestSpeaker: undefined,
          sessionTime: {
            timeBegin: new Date(getConversionDate(cityObject[i]["C"]).setFullYear(da.getFullYear(), da.getMonth(), da.getDate())),
            timeEnd: new Date(getConversionDate(cityObject[i]["D"]).setFullYear(da.getFullYear(), da.getMonth(), da.getDate())),
          },
          city: new CityModel({
            city: cityName
          }),
          location: new LocationModel({
            name: cityObject[i]["E"],
            capacity: cityObject[i]["H"],
          }),
          workshop: new WorkshopModel({
            workshopName: cityObject[i]["G"],
            requireFacilitator: true,
            requireGuestSpeaker: true
          }),
          level: cityObject[i]["I"],
          teacher: new UserModel({
            email: cityObject[i]["L"],
            firstName: cityObject[i]["J"],
            lastName: cityObject[i]["J"],
            userType: UserType.TEACHER,
            phoneNumber: cityObject[i]["M"],
            _teacher: new TeacherModel({
              school: new SchoolModel({
                name: cityObject[i]["K"],
                city: new CityModel({
                  city: cityName
                })
              })
            })
          }),
          firstTime: false, // Check This ..cant find any first time option in the excel sheet
        }));
      }
    }
    return booking;
  } else {
    return [];
  }
}

/**
 * Function for Getting all the Booking details
 * @param {Booking} b - The Booking array
 * @returns {void}
 */
export function printBooking(b: Booking[]): void {
  const sheetName = "Roster";
  const wb = XLSX.utils.book_new();
  const wsData = [
    ["Booking Date", "Location", "Pax", "Workshop", "Level", "Teacher", "Phone", "GuestSpeaker", "Guest Speaker Mobile", "Guest Speaker Email", "Facilitator", "Facilitator Mobile", "Facilitator Email", "TimeBegin", "TimeEnd"],
  ];

  for (let i = 0; i < Object.keys(b).length; i++) {
    const timeBegin = b[i].sessionTime.timeBegin.toLocaleTimeString();
    const timeEnd = b[i].sessionTime.timeEnd.toLocaleTimeString();
    const row: string[] = [];
    row.push(b[i].sessionTime.timeBegin.toDateString());
    if (b[i].location instanceof LocationModel) {
      const location = b[i].location as Location;
      row.push(location.name);
      if (location.capacity) {
        row.push(location.capacity.toString());
      } else {
        row.push("");
      }
    } else {
      row.push("", "");
    }

    if (b[i].workshop instanceof WorkshopModel) {
      const Workshoptype = b[i].workshop as Workshop;
      row.push(Workshoptype.workshopName);
    } else {
      row.push("", "");
    }

    if (b[i].level) {
      row.push(b[i].level);
    } else {
      row.push("");
    }

    if (b[i].teacher instanceof UserModel) {
      const teacher = b[i].teacher as User;
      row.push(teacher.firstName, teacher.phoneNumber);
    } else {
      row.push("", "");
    }

    if (b[i].guestSpeaker instanceof UserModel) {
      const guestSpeaker = b[i].guestSpeaker as User;
      row.push(guestSpeaker.firstName, guestSpeaker.phoneNumber, guestSpeaker.email);
    } else {
      row.push("", "", "");
    }

    if (b[i].facilitator instanceof UserModel) {
      const facilitator = b[i].facilitator as User;
      row.push(facilitator.firstName, facilitator.phoneNumber, facilitator.email);
    } else {
      row.push("", "", "");
    }

    row.push(timeBegin, timeEnd);
    wsData.push(row);
  }
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  const wscols = [
    { width: 15 },
    { width: 15 },
    { width: 5 },
    { width: 9 },
    { width: 6 },
    { width: 18 },
    { width: 10 },
    { width: 18 },
    { width: 19 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 11 },
    { width: 11 },
  ];
  ws["!cols"] = wscols;
  wb.SheetNames.push(sheetName);
  wb.Sheets[sheetName] = ws;
  const content = XLSX.write(wb, { type: "buffer", bookType: "xlsx", bookSST: false });
  return content;
}
