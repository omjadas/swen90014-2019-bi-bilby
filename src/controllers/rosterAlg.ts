import {
  eligible,
  userAvailable,
  pairTeams,
  adjustAvailabilities,
  checkBackToBackFacilitator,
  checkBackToBackGuestSpeaker } from "./userOperations";
import { Booking, BookingState } from "../models/booking.model";
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
    let backToBackFacilitator = false;
    let backToBackGuestSpeaker = false;

    if (i > 0) {
      backToBackFacilitator = checkBackToBackFacilitator(bookings[i - 1], bookings[i]);
      backToBackGuestSpeaker = checkBackToBackGuestSpeaker(bookings[i - 1], bookings[i]);
    }

    // Neither facilitator nor guest speaker can do back to back.
    if (!backToBackFacilitator && !backToBackGuestSpeaker) {
      // From the user pool we select facilitators and guest speakers and check their availability for a specific booking
      availableFacilitators = facilitators.filter(user => userAvailable(user, bookings[i].sessionTime.timeBegin, bookings[i].sessionTime.timeEnd));
      availableGuestSpeakers = guestSpeakers.filter(user => userAvailable(user, bookings[i].sessionTime.timeBegin, bookings[i].sessionTime.timeEnd));

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

    // Facilitator from previous booking can't do back to back but guest speaker can.
    else if (!backToBackFacilitator && backToBackGuestSpeaker) {
      availableFacilitators = facilitators.filter(user => userAvailable(user, bookings[i].sessionTime.timeBegin, bookings[i].sessionTime.timeEnd));
      availableFacilitators = availableFacilitators.filter(user => eligible(user, bookings[i].workshop));

      const guestSpeaker = guestSpeakers.filter(user => user === bookings[i - 1].guestSpeaker)[0];

      for (let j = 0; j < availableFacilitators.length; j++) {
        const pair = pairTeams(availableFacilitators[j], guestSpeaker);

        if (pair !== null) {
          teams.push(pair);
        }
      }
    }

    // Facilitator from previous booking can do back to back but guest speaker can't.
    else if (backToBackFacilitator && !backToBackGuestSpeaker) {
      availableGuestSpeakers = guestSpeakers.filter(user => userAvailable(user, bookings[i].sessionTime.timeBegin, bookings[i].sessionTime.timeEnd));
      availableGuestSpeakers = availableGuestSpeakers.filter(user => eligible(user, bookings[i].workshop));

      const facilitator = facilitators.filter(user => user === bookings[i - 1].facilitator)[0];

      for (let k = 0; k < availableGuestSpeakers.length; k++) {
        const pair = pairTeams(facilitator, availableGuestSpeakers[k]);

        if (pair !== null) {
          teams.push(pair);
        }
      }
    }

    // Both facilitator and guest speaker from previous booking can do back to back.
    else if (backToBackFacilitator && backToBackGuestSpeaker){
      bookings[i].facilitator = bookings[i - 1].facilitator;
      bookings[i].guestSpeaker = bookings[i - 1].guestSpeaker;
      bookings[i].state = BookingState.UNCONFIRMED;
    }

    if (!(backToBackFacilitator && backToBackGuestSpeaker)) {
      const index = Math.floor(Math.random() * teams.length);
      bookings[i].facilitator = teams[index][0];
      bookings[i].guestSpeaker = teams[index][1];
      bookings[i].state = BookingState.UNCONFIRMED;
    }

    adjustAvailabilities((facilitators.filter(user => user === bookings[i].facilitator)[0]), bookings[i].sessionTime.timeBegin, bookings[i].sessionTime.timeEnd);
    adjustAvailabilities((guestSpeakers.filter(user => user === bookings[i].guestSpeaker)[0]), bookings[i].sessionTime.timeBegin, bookings[i].sessionTime.timeEnd);
  }

  return bookings;
}
