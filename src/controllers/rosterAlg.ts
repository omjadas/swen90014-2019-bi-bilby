import {readData} from "./readData";
import {Data} from "../models/data.model";
import {newBooking} from "./bookingOperations";
import {
  eligible,
  facilitatorAvailable,
  guestSpeakerAvailable,
  isFacilitator,
  isGuestSpeaker,
  pairTeams
} from "./userOperations";

/**
  * Base function for rostering preferences to facilitators
  * and guest speakers
  */
function rosterByPreferences(): void {
  const data = readData();

  const teacherPreferences: Data["teacherPreferences"] = data.teacherPreference;
  const users: Data ["users"] = data.facilitators;
  const bookings = [];

  for (let i = 0; i < teacherPreferences.length; i++) {
    const availableFacilitators = [];
    const availableGuestSpeakers = [];
    const teams = [];
    const timeBegin = [];
    const timeEnd = [];
    // For all the possible preferences, we want to select one
    for (let j = 0; j < teacherPreferences[i].sessionTimes.length; j++) {
      const year = teacherPreferences[i].sessionTimes[j].timeBegin.getFullYear();
      const month = teacherPreferences[i].sessionTimes[j].timeBegin.getUTCMonth();
      const day = teacherPreferences[i].sessionTimes[j].timeBegin.getDay();
      const hours = teacherPreferences[i].sessionTimes[j].timeBegin.getHours();
      const minutes = teacherPreferences[i].sessionTimes[j].timeBegin.getMinutes();

      // From the user pool we select facilitators and guest speakers and check their availability for a specific booking
      for (let b = 0; b < users.length; b++) {
        if (isFacilitator(users[b]) && facilitatorAvailable(users[b], day, hours)) {
          availableFacilitators.push(users[b]);
        } else if (isGuestSpeaker(users[b]) && guestSpeakerAvailable(users[b], day, hours)) {
          availableGuestSpeakers.push(users[b]);
        }
      }
      // Crosscheck the workshop's constraints with user's attributes
      for (let c = 0; c < availableFacilitators.length; c++) {
        if (!eligible(availableFacilitators[c], teacherPreferences[i].workshop))
          availableFacilitators.splice(c, 1);
      }

      for (let d = 0; d < availableGuestSpeakers.length; d++) {
        if (!eligible(availableGuestSpeakers[d], teacherPreferences[i].workshop))
          availableGuestSpeakers.splice(d, 1);
      }

      // Pair facilitators and guest speakers to follow the constraints
      for (let e = 0; e < availableGuestSpeakers.length; e++) {
        for (let f = 0; f < availableFacilitators.length; f++) {
          const pair = pairTeams(availableFacilitators[e], availableGuestSpeakers[f]);

          if (!(pair[0] === 0 && pair[1] === 0))
            teams.push(pair);
          else
            continue;
        }
      }

      // If at least one possibility emerged, exit the loop, create booking and move on to the next booking request
      if (teams.length > 0) {
        timeBegin[0] = teacherPreferences[i].sessionTimes[j].timeBegin;
        timeEnd[0] = teacherPreferences[i].sessionTimes[j].timeEnd;
        break;
      }
    }

    const facilitator = teams[Math.floor(Math.random() * teams.length)][0];
    const guestSpeaker = teams[Math.floor(Math.random() * teams.length)][1];
    const city = teacherPreferences[i].city;
    //const location = teacherPreferences[i].location;
    const workshop = teacherPreferences[i].workshop;
    const level = teacherPreferences[i].level;
    const teacher = teacherPreferences[i].contact;
    const firstTime = teacherPreferences[i].return;
    const numberOfStudents = teacherPreferences[i].numberOfStudents;
    //bookings.push(newBooking(true, facilitator, guestSpeaker, timeBegin[0], timeEnd[0], city, location, workshop, level, teacher, firstTime, numberOfStudents));

    // Create new booking instances according to teacher preferences.
    // This can only be done once we have allocated facilitators
    // and times

    // const booking = newBooking(teacherPreference[i][])
  }

  // From remaining times, manually select preference and add to unconfirmed bookings

}
