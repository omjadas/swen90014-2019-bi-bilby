import { Facilitator, FacilitatorModel } from "../models/facilitator.model";
import { GuestSpeaker, GuestSpeakerModel } from "../models/guestSpeaker.model";
import { Workshop, WorkshopModel } from "../models/workshop.model";
import { User, UserModel, UserType } from "../models/user.model";
import { Ref } from "@hasezoey/typegoose";
import { Availability } from "../models/availability";
import { Booking } from "../models/booking.model";
import { Location, LocationModel } from "../models/location.model";
import { City, CityModel } from "../models/city.model";

export const EMPTY_FACILITATOR = new UserModel({
  firstName: "No Solution",
  lastName: "",
  email: "",
  address: "",
  userType: UserType.FACILITATOR,
  phoneNumber: "",
  _facilitator: new FacilitatorModel({
    city: new CityModel({ city: "" }),
    trained: [],
    reliable: false,
    availabilities: [],
    specificUnavailabilities: [],
    assignedTimes: []
  })
});

export const EMPTY_GUEST_SPEAKER = new UserModel({
  firstName: "No Solution",
  lastName: "",
  email: "",
  address: "",
  userType: UserType.GUEST_SPEAKER,
  phoneNumber: "",
  _guestSpeaker: new GuestSpeakerModel({
    city: new CityModel({ city: "" }),
    trained: [],
    reliable: false,
    availabilities: [],
    specificUnavailabilities: [],
    assignedTimes: []
  })
});

export const NA_FACILITATOR = new UserModel({
  firstName: "N/A",
  lastName: "N/A",
  email: "N/A",
  address: "N/A",
  userType: UserType.FACILITATOR,
  phoneNumber: "N/A",
  _facilitator: new GuestSpeakerModel({
    city: new CityModel({ city: "N/A" }),
    trained: [],
    reliable: false,
    availabilities: [],
    specificUnavailabilities: [],
    assignedTimes: []
  })
});

export const NA_GUESTSPEAKER = new UserModel({
  firstName: "N/A",
  lastName: "N/A",
  email: "N/A",
  address: "N/A",
  userType: UserType.GUEST_SPEAKER,
  phoneNumber: "N/A",
  _guestSpeaker: new GuestSpeakerModel({
    city: new CityModel({ city: "N/A" }),
    trained: [],
    reliable: false,
    availabilities: [],
    specificUnavailabilities: [],
    assignedTimes: []
  })
});

/**
 * Check if day matches with availability.
 *
 * @export
 * @param {User} user - user to be assessed
 * @param {string} workshopName - name of workshop
 * @returns {boolean} - whether the user is trained for this particular workshop
 */
export function trainedUser(user: User, workshopName: string): boolean {
  if (user._facilitator instanceof FacilitatorModel) {
    const facilitator = user._facilitator as Facilitator;
    const trainedWorkshops = facilitator.trained;
    for (let i = 0; i < trainedWorkshops.length; i++) {
      if (trainedWorkshops[i] === workshopName) {
        return true;
      }
    }
  } else if (user._guestSpeaker instanceof GuestSpeakerModel) {
    const guestSpeaker = user._guestSpeaker as GuestSpeaker;
    const trainedWorkshops = guestSpeaker.trained;
    for (let j = 0; j < trainedWorkshops.length; j++) {
      if (trainedWorkshops[j] === workshopName) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Check if user (facilitator or guest speaker) are eligible for a particular
 * workshop.
 *
 * @export
 * @param {User} user - user to check eligibility for
 * @param {Ref<Workshop>} workshop - workshop to check user against
 * @returns {boolean} - is the user available for the workshop
 */
export function eligible(user: User, workshop: Ref<Workshop>): boolean {
  if (workshop instanceof WorkshopModel) {
    const workshop1 = workshop as Workshop;
    if (trainedUser(user, workshop1.workshopName)) {
      return true;
    }
  }

  return false;
}

/**
 * Check how many back to back workshops has the user done.
 *
 * @export
 * @param {Availability[]} assignedTimes - array of times to which the user has been assigned
 * @param {Date} timeBegin - time for the booking we are currently trying to assign
 * @returns {number} - count of back to back workshops this user has done before current booking time
 */
export function checkBackToBackTime(assignedTimes: Availability[], timeBegin: Date): number {
  let counter = 1;

  if (assignedTimes.length > 1) {
    for (let i = 0; i < (assignedTimes.length - 1); i++) {
      if (assignedTimes[i].availableUntil === assignedTimes[i + 1].availableFrom && assignedTimes[i + 1].availableUntil <= timeBegin) {
        counter++;
      }
    }
  } else if (assignedTimes.length === 0) {
    counter = 0;
  }

  return counter;
}

/**
 * Check if a facilitator can be rostered to a back to back booking.
 *
 * @export
 * @param {Booking} previousBooking - information from previously assigned booking
 * @param {Booking} currentBooking - current booking in need of assignment
 * @returns {boolean} - returns whether the facilitator from last booking can do this new booking or not
 */
export function checkBackToBackFacilitator(previousBooking: Booking, currentBooking: Booking): boolean {
  let sameCity = false;
  let sameLocation = false;
  let eligibleForWorkshop = false;
  let maxAmount = false;

  if (previousBooking.city instanceof CityModel && currentBooking.city instanceof CityModel) {
    const previousCity = previousBooking.city as City;
    const currentCity = currentBooking.city as City;
    if (previousCity.city === currentCity.city) {
      sameCity = true;
    }
  }

  if (previousBooking.location instanceof LocationModel && currentBooking.location instanceof LocationModel) {
    const previousLocation = previousBooking.location as Location;
    const currentLocation = currentBooking.location as Location;
    if (previousLocation.name === currentLocation.name) {
      sameLocation = true;
    }
  }

  if (previousBooking.facilitator instanceof UserModel) {
    const facilitator = previousBooking.facilitator as User;
    if (eligible(facilitator, currentBooking.workshop)) {
      eligibleForWorkshop = true;
    }

    if (facilitator._facilitator instanceof FacilitatorModel) {
      const _facilitator = facilitator._facilitator as Facilitator;
      const counter = checkBackToBackTime(_facilitator.assignedTimes, currentBooking.sessionTime.timeBegin);
      if (counter >= 3) {
        maxAmount = true;
      }
    }
  }

  if (sameCity && sameLocation && eligibleForWorkshop && !maxAmount) {
    return true;
  }
  return false;
}

/**
 * Check if a guest speaker can be rostered to a back to back booking.
 *
 * @export
 * @param {Booking} previousBooking - information from previously assigned booking
 * @param {Booking} currentBooking - current booking in need of assignment
 * @returns {boolean} - returns whether the guest speaker from last booking can do this new booking or not
 */
export function checkBackToBackGuestSpeaker(previousBooking: Booking, currentBooking: Booking): boolean {
  let sameCity = false;
  let sameLocation = false;
  let eligibleForWorkshop = false;
  let maxAmount = false;

  if (previousBooking.city instanceof CityModel && currentBooking.city instanceof CityModel) {
    const previousCity = previousBooking.city as City;
    const currentCity = currentBooking.city as City;
    if (previousCity.city === currentCity.city) {
      sameCity = true;
    }
  }

  if (previousBooking.location instanceof LocationModel && currentBooking.location instanceof LocationModel) {
    const previousLocation = previousBooking.location as Location;
    const currentLocation = currentBooking.location as Location;
    if (previousLocation.name === currentLocation.name) {
      sameLocation = true;
    }
  }

  if (previousBooking.guestSpeaker instanceof UserModel) {
    const guestSpeaker = previousBooking.guestSpeaker as User;
    if (eligible(guestSpeaker, currentBooking.workshop)) {
      eligibleForWorkshop = true;
    }

    if (guestSpeaker._guestSpeaker instanceof GuestSpeakerModel) {
      const _guestSpeaker = guestSpeaker._guestSpeaker as GuestSpeaker;
      const counter = checkBackToBackTime(_guestSpeaker.assignedTimes, currentBooking.sessionTime.timeBegin);
      if (counter >= 2) {
        maxAmount = true;
      }
    }
  }

  if (sameCity && sameLocation && eligibleForWorkshop && !maxAmount) {
    return true;
  }
  return false;
}

/**
 * Adjust availabilities when user is rostered for a booking.
 *
 * @param {User} user - user to whom we want to change availabilities
 * @param {Date} timeBegin - time from which we want to make user unavailable
 * @param {Date} timeEnd - time until which we want to make user unavailable
 * @returns {void} void
 */
export function adjustAvailabilities(user: User, timeBegin: Date, timeEnd: Date): void {
  let availabilities: Availability[] = [];
  const buffer: any = [];

  const formatedTimeBegin = new Date(timeBegin);
  const formatedTimeEnd = new Date(timeEnd);

  if (user._facilitator instanceof FacilitatorModel) {
    const facilitator = user._facilitator as Facilitator;
    availabilities = facilitator.availabilities;
    facilitator.assignedTimes.push({ availableFrom: formatedTimeBegin, availableUntil: formatedTimeEnd });
  } else if (user._guestSpeaker instanceof GuestSpeakerModel) {
    const guestSpeaker = user._guestSpeaker as GuestSpeaker;
    availabilities = guestSpeaker.availabilities;
    guestSpeaker.assignedTimes.push({ availableFrom: formatedTimeBegin, availableUntil: formatedTimeEnd });
  }

  for (let i = 0; i < availabilities.length; i++) {
    const availableFrom = availabilities[i].availableFrom;
    const availableUntil = availabilities[i].availableUntil;

    if (availableFrom === timeBegin && availableUntil === timeEnd) { //If the availability is just a 1 hour block
      availabilities.splice(i, 1);
    } else if (availableFrom === timeBegin && timeEnd < availableUntil) { // If the booking starts at the same time as the beginning of the user's availability
      availabilities[i].availableFrom = formatedTimeEnd;
    } else if (availableFrom < timeBegin && timeEnd === availableUntil) { // If the booking end at the same time as the end of the user's availability
      availabilities[i].availableUntil = formatedTimeBegin;
    } else if (availableFrom < timeBegin && timeEnd < availableUntil) { // If the booking starts and ends in the middle of the user's availability
      availabilities[i].availableFrom = formatedTimeEnd;
      const tuple = [i, { availableFrom: availableFrom, availableUntil: formatedTimeBegin }];
      buffer.push(tuple);
    }
  }

  for (let j = 0; j < buffer.length; j++) {
    availabilities.splice(buffer[j][0], 0, buffer[j][1]);
  }
}

/**
 * Check if user is available for specified time.
 *
 * @export
 * @param {User} user - user to check
 * @param {Date} timeBegin - start of time block
 * @param {Date} timeEnd - end of time block
 * @returns {boolean} - whether the user is available
 */
export function userAvailable(user: User, timeBegin: Date, timeEnd: Date): boolean {
  let availabilities: Availability[] = [];

  if (user._facilitator instanceof FacilitatorModel) {
    const facilitator = user._facilitator as Facilitator;
    availabilities = facilitator.availabilities;
  } else if (user._guestSpeaker instanceof GuestSpeakerModel) {
    const guestSpeaker = user._guestSpeaker as GuestSpeaker;
    availabilities = guestSpeaker.availabilities;
  }

  for (let i = 0; i < availabilities.length; i++) {
    if (availabilities[i].availableFrom <= timeBegin && availabilities[i].availableUntil >= timeEnd
      && availabilities[i].availableFrom.getUTCDate() === timeBegin.getUTCDate() && availabilities[i].availableUntil.getUTCDate() === timeEnd.getUTCDate()) {
      return true;
    }
  }

  return false;
}

/**
 * Check if facilitator and guest speaker can work with each other and pair them
 * for booking.
 *
 * @export
 * @param {User} possibleFacilitator - facilitator to check
 * @param {User} possibleGuestSpeaker - guestSpeaker to check
 * @param {Ref<Workshop>} workshop - workshop of current booking
 * @returns {(null | [User, User])} - null if the users can't be paired, array
 *                                    containing users if the can be
 */
export function pairTeams(possibleFacilitator: User, possibleGuestSpeaker: User, workshop: Ref<Workshop>): null | [User, User] {
  let team: [User, User];

  if (possibleFacilitator._facilitator instanceof FacilitatorModel && possibleGuestSpeaker._guestSpeaker instanceof GuestSpeakerModel && workshop instanceof WorkshopModel) {
    const workshop1 = workshop as Workshop;
    const workshopName = workshop1.workshopName;

    if (workshop1.requireFacilitator && workshop1.requireGuestSpeaker) {
      if (possibleFacilitator !== EMPTY_FACILITATOR && possibleGuestSpeaker !== EMPTY_GUEST_SPEAKER) {
        if (trainedUser(possibleFacilitator, workshopName) && trainedUser(possibleGuestSpeaker, workshopName)) {
          team = [possibleFacilitator, possibleGuestSpeaker];
          return team;
        } else if (trainedUser(possibleFacilitator, workshopName) && !trainedUser(possibleGuestSpeaker, workshopName)) {
          team = [possibleFacilitator, EMPTY_GUEST_SPEAKER];
          return team;
        } else if (!trainedUser(possibleFacilitator, workshopName) && trainedUser(possibleGuestSpeaker, workshopName)) {
          team = [EMPTY_FACILITATOR, possibleGuestSpeaker];
          return team;
        } else if (!trainedUser(possibleFacilitator, workshopName) && !trainedUser(possibleGuestSpeaker, workshopName)) {
          team = [EMPTY_FACILITATOR, EMPTY_GUEST_SPEAKER];
          return team;
        }
      } else if (possibleFacilitator !== EMPTY_FACILITATOR && possibleGuestSpeaker === EMPTY_GUEST_SPEAKER) {
        if (trainedUser(possibleFacilitator, workshopName)) {
          team = [possibleFacilitator, possibleGuestSpeaker];
          return team;
        } else if (!trainedUser(possibleFacilitator, workshopName)) {
          team = [EMPTY_FACILITATOR, possibleGuestSpeaker];
          return team;
        }
      } else if (possibleFacilitator === EMPTY_FACILITATOR && possibleGuestSpeaker !== EMPTY_GUEST_SPEAKER) {
        if (trainedUser(possibleGuestSpeaker, workshopName)) {
          team = [possibleFacilitator, possibleGuestSpeaker];
          return team;
        } else if (!trainedUser(possibleGuestSpeaker, workshopName)) {
          team = [possibleFacilitator, EMPTY_GUEST_SPEAKER];
          return team;
        }
      } else if (possibleFacilitator === EMPTY_FACILITATOR && possibleGuestSpeaker === EMPTY_GUEST_SPEAKER) {
        team = [possibleFacilitator, possibleGuestSpeaker];
        return team;
      }
    } else if (workshop1.requireFacilitator && !workshop1.requireGuestSpeaker) {
      if (!(possibleFacilitator === EMPTY_FACILITATOR) && trainedUser(possibleFacilitator, workshopName)) {
        team = [possibleFacilitator, NA_GUESTSPEAKER];
        return team;
      } else {
        team = [EMPTY_FACILITATOR, NA_GUESTSPEAKER];
        return team;
      }
    } else if (!workshop1.requireFacilitator && workshop1.requireGuestSpeaker) {
      if (possibleGuestSpeaker !== EMPTY_GUEST_SPEAKER && trainedUser(possibleGuestSpeaker, workshopName)) {
        team = [NA_FACILITATOR, possibleGuestSpeaker];
        return team;
      } else {
        team = [NA_FACILITATOR, EMPTY_GUEST_SPEAKER];
        return team;
      }
    }
  }

  return null;
}

/**
 * Check if facilitator and guest speaker can work with each other and pair them
 * for booking.
 *
 * @export
 * @param {[User, User][]} teams - array of possible teams
 * @returns {[User, User][]} - array of most suitable teams
 */
export function filterTeams(teams: [User, User][]): [User, User][] {
  const noEmptyUsers = teams.filter(team => team[0] !== EMPTY_FACILITATOR && team[1] !== EMPTY_GUEST_SPEAKER);
  let noEmptyFacilitators: [User, User][];
  let noEmptyGuestSpeakers: [User, User][];

  if (noEmptyUsers.length > 0) {
    return noEmptyUsers;
  } else if (noEmptyUsers.length === 0) {
    noEmptyFacilitators = teams.filter(team => team[0] !== EMPTY_FACILITATOR);
    noEmptyGuestSpeakers = teams.filter(team => team[1] !== EMPTY_GUEST_SPEAKER);

    if (noEmptyFacilitators.length > 0) {
      return noEmptyFacilitators;
    } else if (noEmptyGuestSpeakers.length > 0) {
      return noEmptyGuestSpeakers;
    }
  }

  return teams;
}
