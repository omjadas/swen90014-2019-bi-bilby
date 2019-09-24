import { Facilitator, FacilitatorModel } from "../models/facilitator.model";
import { GuestSpeaker, GuestSpeakerModel } from "../models/guestSpeaker.model";
import { Workshop, WorkshopModel } from "../models/workshop.model";
import { User, UserModel, UserType } from "../models/user.model";
import { Ref } from "@hasezoey/typegoose";
import { Availability, dayOfWeek } from "../models/availability";
import { Booking } from "../models/booking.model";
import { Location, LocationModel } from "../models/location.model";

/**
 * Check if day matches with availability.
 *
 * @export
 * @param {number} day day to check against dayOW
 * @param {dayOfWeek} dayOW dayOfWeek to check agains day
 * @returns {boolean} are day and dayOW the same day
 */
export function checkDayOfWeek(day: number, dayOW: dayOfWeek): boolean {
  if (day === 0 && dayOW === dayOfWeek.SUN) {
    return true;
  } else if (day === 1 && dayOW === dayOfWeek.MON) {
    return true;
  } else if (day === 2 && dayOW === dayOfWeek.TUE) {
    return true;
  } else if (day === 3 && dayOW === dayOfWeek.WED) {
    return true;
  } else if (day === 4 && dayOW === dayOfWeek.THU) {
    return true;
  } else if (day === 5 && dayOW === dayOfWeek.FRI) {
    return true;
  } else if (day === 6 && dayOW === dayOfWeek.SAT) {
    return true;
  } else {
    return false;
  }
}

/**
 * Check if user (facilitator or guest speaker) are eligible for a particular
 * workshop.
 *
 * @export
 * @param {User} user user to check eligibility for
 * @param {Ref<Workshop>} workshop workshop to check user against
 * @returns {boolean} is the user available for the workshop
 */
export function eligible(user: User, workshop: Ref<Workshop>): boolean {
  if (workshop instanceof WorkshopModel) {
    const workshop1 = workshop as Workshop;
    if (user.userType === UserType.FACILITATOR && workshop1.requireFacilitator) {
      return true;
    } else if (user.userType === UserType.GUEST_SPEAKER && workshop1.requireGuestSpeaker) {
      return true;
    }
  }
  return false;
}

/**
 * Check how many back to back workshops has the user done.
 *
 * @export
 * @param {Availability[]} assignedTimes 
 * @param {Date} timeBegin
 * @returns {number}
 */
export function checkBackToBackTime(assignedTimes: Availability[], timeBegin: Date): number {
  let counter = 0;

  for (let i = 0; i < assignedTimes.length - 1; i++) {
    while (assignedTimes[i].availableUntil == assignedTimes[i + 1].availableFrom && assignedTimes[i + 1].availableUntil <= timeBegin) {
      counter++;
      continue;
    }
    counter = 0;
  }

  return counter;
}

/**
 * Check if a facilitator can be rostered to a back to back booking.
 *
 * @export
 * @param {Booking} previousBooking
 * @param {Booking} currentBooking
 * @returns {boolean}
 */
export function checkBackToBackFacilitator(previousBooking: Booking, currentBooking: Booking): boolean {
  let sameCity = false;
  let sameLocation = false;
  let eligibleForWorkshop = false;
  let maxAmount = false;

  if (previousBooking.city === currentBooking.city) {
    sameCity = true;
  }

  if (previousBooking.location instanceof LocationModel && currentBooking.location instanceof LocationModel) {
    const previousLocation = previousBooking.location as Location;
    const currentLocation = currentBooking.location as Location;
    if (previousLocation.address === currentLocation.address) {
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
      if (checkBackToBackTime(_facilitator.availabilities, currentBooking.sessionTime.timeBegin) >= 3) {
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
 * @param {Booking} previousBooking
 * @param {Booking} currentBooking
 * @returns {boolean}
 */
export function checkBackToBackGuestSpeaker(previousBooking: Booking, currentBooking: Booking): boolean {
  let sameCity = false;
  let sameLocation = false;
  let eligibleForWorkshop = false;
  let maxAmount = false;

  if (previousBooking.city === currentBooking.city) {
    sameCity = true;
  }

  if (previousBooking.location instanceof LocationModel && currentBooking.location instanceof LocationModel) {
    const previousLocation = previousBooking.location as Location;
    const currentLocation = currentBooking.location as Location;
    if (previousLocation.address === currentLocation.address) {
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
      if (checkBackToBackTime(_guestSpeaker.availabilities, currentBooking.sessionTime.timeBegin) >= 3) {
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
 * @param user 
 * @param timeBegin 
 * @param timeEnd 
 */
export function adjustAvailabilities(user: User, timeBegin: Date, timeEnd: Date): void {
  if (user._facilitator instanceof FacilitatorModel) {
    const facilitator = user._facilitator as Facilitator;
    for (let i = 0; i < facilitator.availabilities.length; i++) {
      if (checkDayOfWeek(timeBegin.getDay(), facilitator.availabilities[i].dayOfWeek)) {
        const availableFrom = facilitator.availabilities[i].availableFrom;
        const availableUntil = facilitator.availabilities[i].availableUntil;

        if (availableFrom.toTimeString() === timeBegin.toTimeString() && timeEnd < availableUntil) { // If the booking starts at the same time as the beginning of the user's availability
          facilitator.availabilities[i].availableFrom = timeEnd;
        } else if (availableFrom < timeBegin && timeEnd.toTimeString() === availableUntil.toTimeString()) { // If the booking end at the same time as the end of the user's availability
          facilitator.availabilities[i].availableUntil = timeBegin;
        } else if (availableFrom < timeBegin && timeEnd < availableUntil) { // If the booking starts and ends in the middle of the user's availability
          facilitator.availabilities[i].availableUntil = timeBegin;
          facilitator.availabilities.splice(i + 1, 0, facilitator.availabilities[i]);
          facilitator.availabilities[i + 1].availableFrom = timeEnd;
        }

        facilitator.assignedTimes.push({ availableFrom: timeBegin, availableUntil: timeEnd, dayOfWeek: facilitator.availabilities[i].dayOfWeek });
      }
    }
  } else if (user._guestSpeaker instanceof GuestSpeakerModel) {
    const guestSpeaker = user._guestSpeaker as GuestSpeaker;
    for (let j = 0; j < guestSpeaker.availabilities.length; j++) {
      if (checkDayOfWeek(timeBegin.getDay(), guestSpeaker.availabilities[j].dayOfWeek)) {
        const availableFrom = guestSpeaker.availabilities[j].availableFrom;
        const availableUntil = guestSpeaker.availabilities[j].availableUntil;

        if (availableFrom.toTimeString() === timeBegin.toTimeString() && timeEnd < availableUntil) { // If the booking starts at the same time as the beginning of the user's availability
          guestSpeaker.availabilities[j].availableFrom = timeEnd;
        } else if (availableFrom < timeBegin && timeEnd.toTimeString() === availableUntil.toTimeString()) { // If the booking end at the same time as the end of the user's availability
          guestSpeaker.availabilities[j].availableUntil = timeBegin;
        } else if (availableFrom < timeBegin && timeEnd < availableUntil) { // If the booking starts and ends in the middle of the user's availability
          guestSpeaker.availabilities[j].availableUntil = timeBegin;
          guestSpeaker.availabilities.splice(j + 1, 0, guestSpeaker.availabilities[j]);
          guestSpeaker.availabilities[j + 1].availableFrom = timeEnd;
        }

        guestSpeaker.assignedTimes.push({ availableFrom: timeBegin, availableUntil: timeEnd, dayOfWeek: guestSpeaker.availabilities[j].dayOfWeek });
      }
    }
  }
}

/**
 * Check if user is available for specified time.
 *
 * @export
 * @param {User} user user to check
 * @param {Date} timeBegin start of time block
 * @param {Date} timeEnd end of time block
 * @returns {boolean} whether the user is available
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
    if (checkDayOfWeek(timeBegin.getDay(), availabilities[i].dayOfWeek)
      && timeBefore(availabilities[i].availableFrom, timeBegin)
      && timeAfter(availabilities[i].availableUntil, timeEnd)) {
      return true;
    }
  }

  return false;
}

/**
 * Determine if the time of the first date is before or equal to the time of the
 * second date.
 *
 * @param {Date} d1 first date
 * @param {Date} d2 second date
 * @returns {boolean} is the time of the first date before or equal to the time
 *                    of the second date
 */
function timeBefore(d1: Date, d2: Date): boolean {
  if (d1.getHours() < d2.getHours()) {
    return true;
  } else if (d1.getHours() === d2.getHours() && d1.getMinutes() <= d2.getMinutes()) {
    return true;
  }
  return false
}

/**
 * Determine if the time of the first date is after or equal to the time of the
 * second date.
 *
 * @param {Date} d1 first date
 * @param {Date} d2 second date
 * @returns {boolean} is the time of the first date after or equal to the time
 *                    of the second date
 */
function timeAfter(d1: Date, d2: Date): boolean {
  if (d1.getHours() > d2.getHours()) {
    return true;
  } else if (d1.getHours() === d2.getHours() && d1.getMinutes() >= d2.getMinutes()) {
    return true;
  }
  return false
}

/**
 * Check if facilitator and guest speaker can work with each other and pair them
 * for booking.
 *
 * @export
 * @param {User} possibleFacilitator facilitator to check
 * @param {User} possibleGuestSpeaker
 * @returns {(null | [User, User])} null if the users can't be paired, array
 *                                  containing users if the can be
 */
export function pairTeams(possibleFacilitator: User, possibleGuestSpeaker: User): null | [User, User] {
  let team: [User, User];

  if (possibleFacilitator._facilitator instanceof FacilitatorModel && possibleGuestSpeaker._guestSpeaker instanceof GuestSpeakerModel) {
    const facilitator = possibleFacilitator._facilitator as Facilitator;
    const guestSpeaker = possibleGuestSpeaker._guestSpeaker as GuestSpeaker;
    if ((guestSpeaker.trained && facilitator.trained)
      || (!(guestSpeaker.trained) && facilitator.trained)) {
      team = [possibleFacilitator, possibleGuestSpeaker];
      return team;
    }
  }

  return null;
}

