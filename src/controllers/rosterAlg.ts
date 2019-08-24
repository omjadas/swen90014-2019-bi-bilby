import { readData } from "./readData";
import { Data } from "../models/data.model";
import { newBooking } from "../controllers/bookingOperations";

/**
  * Base function for generating the availabilitites for the facilitator
  * to choose on their specified day
  */
function rosterByPreferences(): void {
  const data = readData();

  const teacherPreferences: Data["teacherPreferences"] = data.teacherPreference;
  //const facilitators = data.facilitators;
  //const guestSpeakers = data.guestSpeakers;

  for(let i = 0; i < teacherPreferences.length; i++) {
    // Find one outcome for each preference
    for(let j = 0; j < teacherPreferences[i].length; j++) {
      const year = teacherPreferences[i][j].timeBegin.getFullYear();
      const month = teacherPreferences[i][j].timeBegin.getUTCMonth();
      const day = teacherPreferences[i][j].timeBegin.getDay();
    }

    // Create new booking instances acording to teacher preferences.
    // This can only be done once we have allocated facilitators
    // and times
    // const booking = newBooking(teacherPreference[i][])
  }

  // From remaining times, manually select preference and add to unconfirmed bookings

}

