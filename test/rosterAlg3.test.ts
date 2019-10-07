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
    trained: ["Discussions of Homelessness and Disadvantage"],
    reliable: true,
    availabilities: [{
      availableFrom: new Date(2018, 8, 6, 9, 0),
      availableUntil: new Date(2018, 8, 6, 13, 0)
    }],
    specificUnavailabilities: [],
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
    trained: ["Discussions of Homelessness and Disadvantage"],
    reliable: true,
    availabilities: [{
      availableFrom: new Date(2018, 8, 6, 9, 0),
      availableUntil: new Date(2018, 8, 6, 12, 0)
    }],
    specificUnavailabilities: [],
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
    trained: ["Discussions of Homelessness and Disadvantage"],
    reliable: true,
    availabilities: [{
      availableFrom: new Date(2018, 8, 6, 10, 0),
      availableUntil: new Date(2018, 8, 6, 12, 0)
    }],
    specificUnavailabilities: [],
    assignedTimes: []
  })
})
];

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
  sessionTime: { timeBegin: new Date(2018, 8, 6, 10, 0), timeEnd: new Date(2018, 8, 6, 11, 0) },
  city: cities[0],
  location: locations[0],
  workshop: workshops[0],
  level: "9",
  teacher: teachers[0],
  firstTime: true,
  numberOfStudents: 25
}),
new BookingModel({
  state: BookingState.PENDING,
  sessionTime: { timeBegin: new Date(2018, 8, 6, 11, 0), timeEnd: new Date(2018, 8, 6, 12, 0) },
  city: cities[0],
  location: locations[0],
  workshop: workshops[0],
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
    trained: ["Discussions of Homelessness and Disadvantage"],
    reliable: true,
    availabilities: [{
      availableFrom: new Date(2018, 8, 6, 12, 0),
      availableUntil: new Date(2018, 8, 6, 13, 0)
    }],
    specificUnavailabilities: [],
    assignedTimes: [{
      availableFrom: new Date(2018, 8, 6, 9, 0),
      availableUntil: new Date(2018, 8, 6, 10, 0)
    },
    {
      availableFrom: new Date(2018, 8, 6, 10, 0),
      availableUntil: new Date(2018, 8, 6, 11, 0)
    },
    {
      availableFrom: new Date(2018, 8, 6, 11, 0),
      availableUntil: new Date(2018, 8, 6, 12, 0)
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
    trained: ["Discussions of Homelessness and Disadvantage"],
    reliable: true,
    availabilities: [{
      availableFrom: new Date(2018, 8, 6, 11, 0),
      availableUntil: new Date(2018, 8, 6, 12, 0)
    }],
    specificUnavailabilities: [],
    assignedTimes: [{
      availableFrom: new Date(2018, 8, 6, 9, 0),
      availableUntil: new Date(2018, 8, 6, 10, 0)
    },
    {
      availableFrom: new Date(2018, 8, 6, 10, 0),
      availableUntil: new Date(2018, 8, 6, 11, 0)
    }]
  }
},
{
  firstName: "Jack",
  lastName: "F",
  email: "",
  address: "",
  userType: UserType.GUEST_SPEAKER,
  phoneNumber: "",
  _guestSpeaker: {
    city: cities[0],
    trained: ["Discussions of Homelessness and Disadvantage"],
    reliable: true,
    availabilities: [{
      availableFrom: new Date(2018, 8, 6, 10, 0),
      availableUntil: new Date(2018, 8, 6, 11, 0)
    }],
    specificUnavailabilities: [],
    assignedTimes: [{
      availableFrom: new Date(2018, 8, 6, 11, 0),
      availableUntil: new Date(2018, 8, 6, 12, 0)
    }]
  }
}];

const afterRosterBookings = [{
  state: BookingState.UNCONFIRMED,
  facilitator: facilitators[0],
  guestSpeaker: guestSpeakers[0],
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
  facilitator: facilitators[0],
  guestSpeaker: guestSpeakers[0],
  sessionTime: { timeBegin: new Date(2018, 8, 6, 10, 0), timeEnd: new Date(2018, 8, 6, 11, 0) },
  city: cities[0],
  location: locations[0],
  workshop: workshops[0],
  level: "9",
  teacher: teachers[0],
  firstTime: true,
  numberOfStudents: 25
},
{
  state: BookingState.UNCONFIRMED,
  facilitator: facilitators[0],
  guestSpeaker: guestSpeakers[1],
  sessionTime: { timeBegin: new Date(2018, 8, 6, 11, 0), timeEnd: new Date(2018, 8, 6, 12, 0) },
  city: cities[0],
  location: locations[0],
  workshop: workshops[0],
  level: "9",
  teacher: teachers[0],
  firstTime: true,
  numberOfStudents: 25
}
];

test("3 back to back for facilitator and 2 back to back guest speaker plus another guest speaker", () => {
  expect(rosterByPreferences(bookings, guestSpeakers, facilitators)).toMatchObject(afterRosterBookings);
});
