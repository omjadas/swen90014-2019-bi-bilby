import {readData} from "./readData";
import {Data} from "../models/data.model";
import {UserType} from "../models/user.model";
import {facilitatorAvailable, guestSpeakerAvailable, isFacilitator, isGuestSpeaker} from "./userOperations";

/**
  * Base function for rostering preferences to facilitators
  * and guest speakers
  */
function rosterByPreferences(): void {
  const data = readData();

  const teacherPreferences: Data["teacherPreferences"] = data.teacherPreference;
  const users: Data ["users"] = data.facilitators;

  for (let i = 0; i < teacherPreferences.length; i++) {
    const availableFacilitators = [];
    const availableGuestSpeakers = [];
    // For all the possible preferences, we want to select one
    for (let j = 0; j < teacherPreferences[i].sessionTimes.length; j++) {
      const year = teacherPreferences[i].sessionTimes[j].timeBegin.getFullYear();
      const month = teacherPreferences[i].sessionTimes[j].timeBegin.getUTCMonth();
      const day = teacherPreferences[i].sessionTimes[j].timeBegin.getDay();
      const hours = teacherPreferences[i].sessionTimes[j].timeBegin.getHours();
      const minutes = teacherPreferences[i].sessionTimes[j].timeBegin.getMinutes();

      for (let b = 0; b < users.length; b++) {
        if (isFacilitator(users[b]) && facilitatorAvailable(users[b], day, hours)) {
          availableFacilitators.push(users[b]);
        } else if (isGuestSpeaker(users[b]) && guestSpeakerAvailable(users[b], day, hours)) {
          availableGuestSpeakers.push(users[b]);
        }
      }
    }

    // Create new booking instances acording to teacher preferences.
    // This can only be done once we have allocated facilitators
    // and times

    // const booking = newBooking(teacherPreference[i][])
  }

  // From remaining times, manually select preference and add to unconfirmed bookings

}
