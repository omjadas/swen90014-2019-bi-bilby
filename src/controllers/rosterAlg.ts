import {
  eligible,
  userAvailable,
  pairTeams,
  adjustAvailabilities,
  checkBackToBackFacilitator,
  checkBackToBackGuestSpeaker,
  NA_FACILITATOR,
  NA_GUESTSPEAKER
} from "./userOperations";
import { Booking, BookingState } from "../models/booking.model";
import { User } from "../models/user.model";

/**
  * Base function for rostering preferences to facilitators
  * and guest speakers
  * @param {Booking[]} bookings - Array of bookings to roster.
  * @param {User[]} guestSpeakers - Array of working guest speakers.
  * @param {User[]} facilitators - Array of working facilitators.
  * @return {Booking[]} bookings - Array of rostered bookings.
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

    if (!backToBackFacilitator && !backToBackGuestSpeaker) { // Neither facilitator nor guest speaker can do back to back.
      // From the user pool we select facilitators and guest speakers and check their availability for a specific booking
      availableFacilitators = facilitators.filter(user => userAvailable(user, bookings[i].sessionTime.timeBegin, bookings[i].sessionTime.timeEnd));
      availableGuestSpeakers = guestSpeakers.filter(user => userAvailable(user, bookings[i].sessionTime.timeBegin, bookings[i].sessionTime.timeEnd));
      /*
      if (i > 0) {
        availableFacilitators = availableFacilitators.filter(user => (user !== bookings[i - 1].facilitator));
        availableGuestSpeakers = availableGuestSpeakers.filter(user => (user !== bookings[i - 1].guestSpeaker));
      }*/

      // Crosscheck the workshop's constraints with user's attributes
      availableFacilitators = availableFacilitators.filter(user => eligible(user, bookings[i].workshop));
      availableGuestSpeakers = availableGuestSpeakers.filter(user => eligible(user, bookings[i].workshop));

      if (availableFacilitators.length === 0) {
        availableFacilitators.push(NA_FACILITATOR);
      } else if (availableGuestSpeakers.length === 0) {
        availableGuestSpeakers.push(NA_GUESTSPEAKER);
      }

      // Pair facilitators and guest speakers to follow the constraints
      for (let f = 0; f < availableFacilitators.length; f++) {
        for (let g = 0; g < availableGuestSpeakers.length; g++) {
          const pair = pairTeams(availableFacilitators[f], availableGuestSpeakers[g], bookings[i].workshop);

          if (pair !== null) {
            teams.push(pair);
          }
        }
      }
    } else if (!backToBackFacilitator && backToBackGuestSpeaker) { // Facilitator from previous booking can't do back to back but guest speaker can.
      availableFacilitators = facilitators.filter(user => userAvailable(user, bookings[i].sessionTime.timeBegin, bookings[i].sessionTime.timeEnd));
      availableFacilitators = availableFacilitators.filter(user => (user !== bookings[i - 1].facilitator));
      availableFacilitators = availableFacilitators.filter(user => eligible(user, bookings[i].workshop));

      const guestSpeaker = guestSpeakers.filter(user => user === bookings[i - 1].guestSpeaker)[0];

      if (availableFacilitators.length === 0) {
        availableFacilitators.push(NA_FACILITATOR);
      }

      for (let f = 0; f < availableFacilitators.length; f++) {
        const pair = pairTeams(availableFacilitators[f], guestSpeaker, bookings[i].workshop);

        if (pair !== null) {
          teams.push(pair);
        }
      }
    } else if (backToBackFacilitator && !backToBackGuestSpeaker) { // Facilitator from previous booking can do back to back but guest speaker can't.
      availableGuestSpeakers = guestSpeakers.filter(user => userAvailable(user, bookings[i].sessionTime.timeBegin, bookings[i].sessionTime.timeEnd));
      availableGuestSpeakers = availableGuestSpeakers.filter(user => (user !== bookings[i - 1].guestSpeaker));
      availableGuestSpeakers = availableGuestSpeakers.filter(user => eligible(user, bookings[i].workshop));

      const facilitator = facilitators.filter(user => user === bookings[i - 1].facilitator)[0];

      if (availableGuestSpeakers.length === 0) {
        availableGuestSpeakers.push(NA_GUESTSPEAKER);
      }

      for (let g = 0; g < availableGuestSpeakers.length; g++) {
        const pair = pairTeams(facilitator, availableGuestSpeakers[g], bookings[i].workshop);

        if (pair !== null) {
          teams.push(pair);
        }
      }
    } else if (backToBackFacilitator && backToBackGuestSpeaker) { // Both facilitator and guest speaker from previous booking can do back to back.
      bookings[i].facilitator = bookings[i - 1].facilitator;
      bookings[i].guestSpeaker = bookings[i - 1].guestSpeaker;
      bookings[i].state = BookingState.UNCONFIRMED;

      adjustAvailabilities((facilitators.filter(user => user === bookings[i].facilitator)[0]), bookings[i].sessionTime.timeBegin, bookings[i].sessionTime.timeEnd);
      adjustAvailabilities((guestSpeakers.filter(user => user === bookings[i].guestSpeaker)[0]), bookings[i].sessionTime.timeBegin, bookings[i].sessionTime.timeEnd);
    }

    if (!(backToBackFacilitator && backToBackGuestSpeaker) && teams.length > 0) {
      const index = Math.floor(Math.random() * teams.length);
      bookings[i].facilitator = teams[index][0];
      bookings[i].guestSpeaker = teams[index][1];
      bookings[i].state = BookingState.UNCONFIRMED;

      adjustAvailabilities(teams[index][0], bookings[i].sessionTime.timeBegin, bookings[i].sessionTime.timeEnd);
      adjustAvailabilities(teams[index][1], bookings[i].sessionTime.timeBegin, bookings[i].sessionTime.timeEnd);
    }
  }

  return bookings;
}
