import rosterByPreferences from "../src/controllers/rosterAlg";
import { CityModel } from "../src/models/city.model";
import { SchoolModel } from "../src/models/school.model";
import { UserModel, UserType } from "../src/models/user.model";
import { GuestSpeakerModel } from "../src/models/guestSpeaker.model";
import { FacilitatorModel } from "../src/models/facilitator.model";
import { LocationModel } from "../src/models/location.model";
import { WorkshopModel } from "../src/models/workshop.model";
import { BookingModel, BookingState } from "../src/models/booking.model";
import { TeacherModel } from "../src/models/teacher.model";
import { dayOfWeek } from "../src/models/availability";

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
  address: "",
  userType: UserType.FACILITATOR,
  phoneNumber: "",
  _facilitator: new FacilitatorModel({
    city: cities[0],
    trained: true,
    reliable: true,
    availabilities: [{
      availableFrom: new Date(2018, 8, 6, 9, 0),
      availableUntil: new Date(2018, 8, 6, 13, 0),
      dayOfWeek: dayOfWeek.THU,
    }],
    specificUnavailabilities: [{
      date: new Date(2018, 8, 7, 11, 0),
    }],
    assignedTimes: []
  })
}),
new UserModel({
  firstName: "April",
  lastName: "",
  email: "",
  address: "",
  userType: UserType.FACILITATOR,
  phoneNumber: "",
  _facilitator: new FacilitatorModel({
    city: cities[0],
    trained: true,
    reliable: true,
    availabilities: [{
      availableFrom: new Date(2018, 8, 6, 9, 0),
      availableUntil: new Date(2018, 8, 6, 13, 0),
      dayOfWeek: dayOfWeek.THU,
    }],
    specificUnavailabilities: [{
      date: new Date(2018, 8, 7, 11, 0),
    }],
    assignedTimes: []
  })
})];

const guestSpeakers = [new UserModel({
  firstName: "Pete",
  lastName: "B",
  email: "",
  address: "",
  userType: UserType.GUEST_SPEAKER,
  phoneNumber: "",
  _guestSpeaker: new GuestSpeakerModel({
    city: cities[0],
    trained: true,
    reliable: true,
    availabilities: [{
      availableFrom: new Date(2018, 8, 6, 9, 0),
      availableUntil: new Date(2018, 8, 6, 12, 0),
      dayOfWeek: dayOfWeek.THU,
    }],
    specificUnavailabilities: [{
      date: new Date(2018, 8, 7, 11, 0),
    }],
    assignedTimes: []
  })
}),
new UserModel({
  firstName: "Jack",
  lastName: "F",
  email: "",
  address: "",
  userType: UserType.GUEST_SPEAKER,
  phoneNumber: "",
  _guestSpeaker: new GuestSpeakerModel({
    city: cities[0],
    trained: true,
    reliable: true,
    availabilities: [{
      availableFrom: new Date(2018, 8, 6, 9, 0),
      availableUntil: new Date(2018, 8, 6, 12, 0),
      dayOfWeek: dayOfWeek.THU,
    }],
    specificUnavailabilities: [{
      date: new Date(2018, 8, 7, 11, 0),
    }],
    assignedTimes: []
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

const bookings2 = [new BookingModel({
  state: BookingState.PENDING,
  sessionTime: { timeBegin: new Date(2018, 8, 6, 9, 0), timeEnd: new Date(2018, 8, 6, 10, 0) },
  city: cities[0],
  location: locations[0],
  workshop: workshops[0],
  level: "9",
  teacher: teachers[0],
  firstTime: true,
  numberOfStudents: 30
}),
new BookingModel({
  state: BookingState.PENDING,
  sessionTime: { timeBegin: new Date(2018, 8, 6, 9, 0), timeEnd: new Date(2018, 8, 6, 10, 0) },
  city: cities[0],
  location: locations[0],
  workshop: workshops[1],
  level: "9",
  teacher: teachers[0],
  firstTime: true,
  numberOfStudents: 25
})];

const facilitators2 = [{
  firstName: "Phil",
  lastName: "",
  email: "",
  address: "",
  userType: UserType.FACILITATOR,
  phoneNumber: "",
  _facilitator: {
    city: cities[0],
    trained: true,
    reliable: true,
    availabilities: [{
      availableFrom: new Date(2018, 8, 6, 10, 0),
      availableUntil: new Date(2018, 8, 6, 13, 0),
      dayOfWeek: dayOfWeek.THU,
    }],
    specificUnavailabilities: [{
      date: new Date(2018, 8, 7, 11, 0),
    }],
    assignedTimes: [{
      availableFrom: new Date(2018, 8, 6, 9, 0),
      availableUntil: new Date(2018, 8, 6, 10, 0),
      dayOfWeek: dayOfWeek.THU,
    }]
  }
},
{
  firstName: "April",
  lastName: "",
  email: "",
  address: "",
  userType: UserType.FACILITATOR,
  phoneNumber: "",
  _facilitator: {
    city: cities[0],
    trained: true,
    reliable: true,
    availabilities: [{
      availableFrom: new Date(2018, 8, 6, 10, 0),
      availableUntil: new Date(2018, 8, 6, 13, 0),
      dayOfWeek: dayOfWeek.THU,
    }],
    specificUnavailabilities: [{
      date: new Date(2018, 8, 7, 11, 0),
    }],
    assignedTimes: [{
      availableFrom: new Date(2018, 8, 6, 9, 0),
      availableUntil: new Date(2018, 8, 6, 10, 0),
      dayOfWeek: dayOfWeek.THU,
    }]
  }
}];

const guestSpeakers2 = [{
  firstName: "Pete",
  lastName: "B",
  email: "",
  address: "",
  userType: UserType.GUEST_SPEAKER,
  phoneNumber: "",
  _guestSpeaker: {
    city: cities[0],
    trained: true,
    reliable: true,
    availabilities: [{
      availableFrom: new Date(2018, 8, 6, 10, 0),
      availableUntil: new Date(2018, 8, 6, 12, 0),
      dayOfWeek: dayOfWeek.THU,
    }],
    specificUnavailabilities: [{
      date: new Date(2018, 8, 7, 11, 0),
    }],
    assignedTimes: [{
      availableFrom: new Date(2018, 8, 6, 9, 0),
      availableUntil: new Date(2018, 8, 6, 10, 0),
      dayOfWeek: dayOfWeek.THU,
    }],
  }
},
{
  firstName: "Jack",
  lastName: "F",
  email: "",
  address: "",
  userType: UserType.GUEST_SPEAKER,
  phoneNumber: "",
  _guestSpeaker: { city: cities[0],
    trained: true,
    reliable: true,
    availabilities: [{
      availableFrom: new Date(2018, 8, 6, 10, 0),
      availableUntil: new Date(2018, 8, 6, 12, 0),
      dayOfWeek: dayOfWeek.THU,
    }],
    specificUnavailabilities: [{
      date: new Date(2018, 8, 7, 11, 0),
    }],
    assignedTimes: [{
      availableFrom: new Date(2018, 8, 6, 9, 0),
      availableUntil: new Date(2018, 8, 6, 10, 0),
      dayOfWeek: dayOfWeek.THU,
    }],
  }
}];

const afterRosterBookings2 = [{
  state: BookingState.UNCONFIRMED,
  facilitator: facilitators2[0],
  guestSpeaker: guestSpeakers2[0],
  sessionTime: { timeBegin: new Date(2018, 8, 6, 9, 0), timeEnd: new Date(2018, 8, 6, 10, 0) },
  city: cities[0],
  location: locations[0],
  workshop: workshops[0],
  level: "9",
  teacher: teachers[0],
  firstTime: true,
  numberOfStudents: 30
},
{
  state: BookingState.UNCONFIRMED,
  facilitator: facilitators2[1],
  guestSpeaker: guestSpeakers2[1],
  sessionTime: { timeBegin: new Date(2018, 8, 6, 9, 0), timeEnd: new Date(2018, 8, 6, 10, 0) },
  city: cities[0],
  location: locations[0],
  workshop: workshops[1],
  level: "9",
  teacher: teachers[0],
  firstTime: true,
  numberOfStudents: 25
}];

test("several back to back bookings for the same facilitator", () => {
  expect(rosterByPreferences(bookings2, guestSpeakers, facilitators)).toMatchObject(afterRosterBookings2);
});
