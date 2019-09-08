import {
  eligible,
  userAvailable,
  pairTeams
} from "./userOperations";
import { Booking, BookingState } from "../models/booking.model";
import { GuestSpeaker } from "../models/guestSpeaker.model";
import { Facilitator } from "../models/facilitator.model";
import { User } from "../models/user.model";

/**
  * Base function for rostering preferences to facilitators
  * and guest speakers
  */
export default function rosterByPreferences(bookings: Booking[], guestSpeakers: User[], facilitators: User[]): Booking[] {
  for (let i = 0; i < bookings.length; i++) {
    let availableFacilitators: User[] = [];
    let availableGuestSpeakers: User[] = [];
    const teams = [];

    // For all the possible preferences, we want to select one
    if (bookings[i] !== undefined) {
      const day = bookings[i].sessionTime.timeBegin.getDay();
      const hours = bookings[i].sessionTime.timeBegin.getHours();

      // From the user pool we select facilitators and guest speakers and check their availability for a specific booking
      for (let j = 0; j < facilitators.length; j++) {
        if (userAvailable(facilitators[j], day, hours)) {
          availableFacilitators.push(facilitators[j]);
        }
      }
      console.log(availableFacilitators);
      availableGuestSpeakers = guestSpeakers.filter(user => userAvailable(user, day, hours));

      // Crosscheck the workshop's constraints with user's attributes
      availableFacilitators = availableFacilitators.filter(user => eligible(user, bookings[i].workshop));
      availableGuestSpeakers = availableGuestSpeakers.filter(user => eligible(user, bookings[i].workshop));

      // Pair facilitators and guest speakers to follow the constraints
      for (let e = 0; e < availableGuestSpeakers.length; e++) {
        for (let f = 0; f < availableFacilitators.length; f++) {
          const pair = pairTeams(availableFacilitators[e], availableGuestSpeakers[f]);

          if (pair !== null) {
            teams.push(pair);
          }
        }
      }
    }

    bookings[i].facilitator = teams[Math.floor(Math.random() * teams.length)][0];
    bookings[i].guestSpeaker = teams[Math.floor(Math.random() * teams.length)][1];
    bookings[i].state = BookingState.UNCONFIRMED;
  }

  return bookings;
}
