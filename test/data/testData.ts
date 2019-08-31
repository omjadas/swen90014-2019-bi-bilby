import { CityModel } from "../../src/models/city.model";
import { WorkshopModel } from "../../src/models/workshop.model";
import { UserModel, UserType } from "../../src/models/user.model";
import { FacilitatorModel, dayOfWeek } from "../../src/models/facilitator.model";
import { TeacherModel } from "../../src/models/teacher.model";
import { SchoolModel } from "../../src/models/school.model";
import { BookingModel } from "../../src/models/booking.model";
import { LocationModel } from "../../src/models/location.model";

const cities = [new CityModel(), new CityModel()];
const bookings = [new BookingModel()];
const users = [new UserModel()];
const locations = [new LocationModel()];
const schools = [new SchoolModel()];
const workshops = [new WorkshopModel()];

export default {
  cities: cities,
  bookings: bookings,
  users: users,
  locations: locations,
  schools: schools,
  workshops: workshops
};


// export default {
//   "teacherPreference": teacherPreferences,
//   "cities": cities,
//   "users": users,
//   "teacherPreference": [{
//     "timeBegin": new Date(2019, 1, 20, 9, 30),
//     "timeEnd": new Date(2019, 1, 20, 10, 30),
//     "city": new CityModel({ city: "Melbourne" }),
//     "workshop": new WorkshopModel({
//       workshopName: "Homeless",
//       requireFacilitator: true, requireGuestSpeaker: true
//     }),
//     "level": "11",
//     "school": new SchoolModel({
//       name: "King's College",
//       city: new CityModel({ city: "Melbourne" })
//     }),
//     "contact": new UserModel({
//       firstName: "Steve",
//       lastName: "Wetherell",
//       email: "s.wether@gmail.com",
//       passwordHash: "021232",
//       address: "21 stevens ave, 1051",
//       userType: UserType.TEACHER,
//       phoneNumber: "0467399342",
//       _teacher: new TeacherModel({

//       })
//     }),
//     "return": false,
//     "numberOfStudents": 20,
//     "disabilityAccess": false
//   }],
//   "bookings": [{
//     "confirmed": true,
//     "faci": "Joe Blogs",
//     "guest speaker": "Richard Newton",
//     "due": 350,
//     "location": "Collins St",
//     "day": "Thursday",
//     "date": "2019/08/14",
//     "timeBeginHour": 9,
//     "timeBeginMinute": 0,
//     "timeEnd": "0100",
//     "area": "Melbourne",
//     "workshop": "Discussions about homelesness and disadvantage",
//     "level": 11,
//     "school": "King's College",
//     "contactName": "Steve Wetherell",
//     "return": false,
//     "numberOfStudents": 20,
//     "phoneNumber": "0467399328",
//     "disabilityAccess": false,
//     "contactEmail": "s.wetherell@gmail.com"
//   }],
//   "users": [{
//     "area": "Melbourne",
//     "contactName": "Jonny Bravo",
//     "phoneNumber": "045693952",
//     "contactEmail": "t.gould@gmail.com",
//     "availability": "2019-08-14T20:30:00.000",
//     "trained": true
//   }, {
//     "area": "Melbourne",
//     "contactName": "Jack Lee",
//     "phoneNumber": "045693953",
//     "contactEmail": "j.lee@gmail.com",
//     "availability": "2019-08-14T13:30:00.000",
//     "trained": false
//   }, {
//     "area": "Melbourne",
//     "contactName": "Mark Jackson",
//     "phoneNumber": "045693954",
//     "contactEmail": "m.jackson@gmail.com",
//     "availability": "2015-08-14T14:30:00.000",
//     "trained": true

//   }],
//   "guest speakers": [{
//     "area": "Melbourne",
//     "contactName": "Richard Newton",
//     "phoneNumber": "045633952",
//     "contactEmail": "r.newt@gmail.com",
//     "must work with": ["Tim Gould"],
//     "max per week": 4,
//     "availability": [],
//     "trained": false,
//     "reliable": false
//   }, {
//     "area": "Melbourne",
//     "contactName": "Steve Stevens",
//     "phoneNumber": "045633953",
//     "contactEmail": "s.stevens@gmail.com",
//     "must work with": [],
//     "max per week": 3,
//     "availability": [],
//     "trained": true,
//     "reliable": true
//   }, {
//     "area": "Melbourne",
//     "contactName": "Miles Ford",
//     "phoneNumber": "045633954",
//     "contactEmail": "m.ford@gmail.com",
//     "new": true,
//     "must work with": [],
//     "max per week": 2,
//     "availability": [],
//     "trained": true,
//     "reliable": false
//   }],
//   "locations": [{
//     "location name": "Lyle Theatre",
//     "address": "230 Collins St",
//     "capacity": 50,
//     "disability access": true,
//     "facilities": ["PC", "Scanner"]
//   }],
//   "workshops": [new WorkshopModel({
//     workshopName: "Homeless",
//     requireFacilitator: true, requireGuestSpeaker: true
//   })]
// };

// // city: new CityModel({ city: "Melbourne" }),
// // trained: true,
// // availabilities:
// //   [{
// //     morning: true,
// //     afternoon: true,
// //     dayOfWeek: dayOfWeek.MON
// //   }]
