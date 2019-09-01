import rosterByPreferences from "../src/controllers/rosterAlg";
import {CityModel} from "../src/models/city.model";
import {SchoolModel} from "../src/models/school.model";
import {UserModel, UserType} from "../src/models/user.model";
import {GuestSpeakerModel} from "../src/models/guestSpeaker.model";
import {dayOfWeek} from "../src/models/facilitator.model";
import {LocationModel} from "../src/models/location.model";
import {WorkshopModel} from "../src/models/workshop.model";
import {BookingModel, BookingState} from "../src/models/booking.model";
import {TeacherModel} from "../src/models/teacher.model";

// We want to pass in all the PENDING bookings
// rosterByPreferences(teacherPreferences, guestSpeakers:, facilitators, locations)
const cities = [new CityModel({ city: "Melbourne" }), new CityModel({ city: "Sydney" }), new CityModel({ city: "Canberra" })];

const schools = [new SchoolModel({
  city: cities[0],
  name: "City Cite - Braybrook SC"
}), new SchoolModel({
  city: cities[0],
  name: "Doxa - Lumen Christi School"
}), new SchoolModel({
  city: cities[0],
  name: "Peninsula Grammar"
})];

const teachers = [new UserModel({
  firstName: "Andrew",
  lastName: "Barker",
  email: "abarker@citycite.vic.edu.au",
  passwordHash: "",
  address: "31 Test Drive Avenue",
  userType: UserType.TEACHER,
  phoneNumber: "86606702",
  _teacher: new TeacherModel({
    school: schools[0]
  })
}), new UserModel({
  firstName: "Tenille",
  lastName: "McInerney",
  email: "tmcinerney@doxa.org.au",
  passwordHash: "",
  address: "",
  userType: UserType.TEACHER,
  phoneNumber: "90468200",
  _teacher: new TeacherModel({
    school: schools[1]
  })
})];

const facilitators = [new UserModel({
  firstName: "Phil",
  lastName: "",
  email: "",
  passwordHash: "",
  address: "",
  userType: UserType.GUEST_SPEAKER,
  phoneNumber: "",
  _guestSpeaker: new GuestSpeakerModel({
    city: cities[0],
    trained: true,
    reliable: true,
    availabilities: [{
      morning: true,
      afternoon: true,
      dayOfWeek: dayOfWeek.MON,
    }, {
      morning: true,
      afternoon: true,
      dayOfWeek: dayOfWeek.THU,
    }, {
      morning: true,
      afternoon: true,
      dayOfWeek: dayOfWeek.FRI,
    }]
  })
})];

const guestSpeakers = [new UserModel({
  firstName: "Pete",
  lastName: "B",
  email: "",
  passwordHash: "",
  address: "",
  userType: UserType.GUEST_SPEAKER,
  phoneNumber: "",
  _guestSpeaker: new GuestSpeakerModel({
    city: cities[0],
    trained: true,
    reliable: true,
    availabilities: [{
      morning: true,
      afternoon: true,
      dayOfWeek: dayOfWeek.MON,
    }, {
      morning: true,
      afternoon: true,
      dayOfWeek: dayOfWeek.THU,
    }]
  })
})];

const locations = [new LocationModel({
  name: "DWH",
  address: " ",
  capacity: 30,
  disabilityAccess: true,
  facilities: "projector",
})];

const workshops = [new WorkshopModel({
  workshopName: "Discussions of Homelessness and Disadvantage",
  requireFacilitator: true,
  requireGuestSpeaker: true,
}), new WorkshopModel({
  workshopName: "Finding belonging",
  requireFacilitator: true,
  requireGuestSpeaker: true,
}), new WorkshopModel({
  workshopName: "Big Idea Lecture",
  requireFacilitator: true,
  requireGuestSpeaker: true,
})];

const bookings = [new BookingModel({
  state: BookingState.PENDING,
  possibleTimes: [{ timeBegin: new Date(2018, 8, 6, 11, 0), timeEnd: new Date(2018, 8, 6, 12, 0) }],
  city: cities[0],
  location: locations[0],
  workshop: workshops[0],
  level: "9",
  teacher: teachers[0],
  firstTime: true,
  numberOfStudents: 25
}), new BookingModel({
  state: BookingState.PENDING,
  possibleTimes: [{ timeBegin: new Date(2018, 8, 6, 15, 0), timeEnd: new Date(2018, 8, 6, 16, 0) }],
  city: cities[0],
  location: locations[0],
  workshop: workshops[1],
  level: "5/6",
  teacher: teachers[1],
  firstTime: true,
  numberOfStudents: 27
})];

// Expected result for input bookings. Facilitator and guest speaker should be assigned and state should be UNCONFIRMED.
const afterRosterBookings = [new BookingModel({
  state: BookingState.UNCONFIRMED,
  facilitator: facilitators[0],
  guestSpeaker: guestSpeakers[0],
  possibleTimes: [{ timeBegin: new Date(2018, 8, 6, 11, 0), timeEnd: new Date(2018, 8, 6, 12, 0) }],
  city: cities[0],
  location: locations[0],
  workshop: workshops[0],
  level: "9",
  teacher: teachers[0],
  firstTime: true,
  numberOfStudents: 25
}), new BookingModel({
  state: BookingState.UNCONFIRMED,
  facilitator: facilitators[0],
  guestSpeaker: guestSpeakers[0],
  possibleTimes: [{ timeBegin: new Date(2018, 8, 6, 15, 0), timeEnd: new Date(2018, 8, 6, 16, 0) }],
  city: cities[0],
  location: locations[0],
  workshop: workshops[1],
  level: "5/6",
  teacher: teachers[1],
  firstTime: true,
  numberOfStudents: 27
})];

test('assign facilitator and guest speaker to both bookings', () => {
  expect(rosterByPreferences(bookings, guestSpeakers, facilitators)).toEqual(afterRosterBookings);
});
