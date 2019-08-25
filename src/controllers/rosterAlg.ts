import { readData } from "./readData";
import { Data } from "../models/data.model";
import { newBooking } from "../controllers/bookingOperations";

/**
  * Base function for rostering preferences to facilitators
  * and lectuters
  */
function rosterByPreferences(): void {
  const data = readData();

  const teacherPreferences: Data["teacherPreferences"] = data.teacherPreference;
  //const facilitators = data.facilitators;
  //const guestSpeakers = data.guestSpeakers;

  for(let i = 0; i < teacherPreferences.length; i++) {
    // For all the possible preferences, we want to select one
    for(let j = 0; j < teacherPreferences[i].sessionTimes.length; j++) {
      const year = teacherPreferences[i].sessionTimes[j].timeBegin.getFullYear();
      const month = teacherPreferences[i].sessionTimes[j].timeBegin.getUTCMonth();
      const day = teacherPreferences[i].sessionTimes[j].timeBegin.getDay();
      const hours = teacherPreferences[i].sessionTimes[j].timeBegin.getHours();
      const minutes = teacherPreferences[i].sessionTimes[j].timeBegin.getMinutes();
    }

    // Create new booking instances acording to teacher preferences.
    // This can only be done once we have allocated facilitators
    // and times

    // const booking = newBooking(teacherPreference[i][])
  }

  // From remaining times, manually select preference and add to unconfirmed bookings

}

