import { Facilitator, FacilitatorModel } from "../models/facilitator.model";
import { GuestSpeaker, GuestSpeakerModel } from "../models/guestSpeaker.model";
import { Workshop, WorkshopModel } from '../models/workshop.model';
import { User, UserModel, UserType } from "../models/user.model";
import { Ref } from "@hasezoey/typegoose";
import { Availability, dayOfWeek } from "../models/availability";
import { Booking } from "../models/booking.model";
import { Location, LocationModel } from "../models/location.model";

/**
  * Check if day matches with availability.
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
 * Check if user (facilitator or guest speaker) are eligible for a particular workshop.
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
  */
export function userAvailable(user: User, timeBegin: Date, timeEnd: Date): boolean {
  if (user._facilitator instanceof FacilitatorModel) {
    const facilitator = user._facilitator as Facilitator;
    for (let i = 0; i < facilitator.availabilities.length; i++) {
      if (checkDayOfWeek(timeBegin.getDay(), facilitator.availabilities[i].dayOfWeek)) {
        if ((facilitator.availabilities[i].availableFrom <= timeBegin && facilitator.availabilities[i].availableUntil >= timeEnd)) {
          return true;
        }
      }
    }
  } else if (user._guestSpeaker instanceof GuestSpeakerModel) {
    const guestSpeaker = user._guestSpeaker as GuestSpeaker;
    for (let k = 0; k < guestSpeaker.availabilities.length; k++) {
      if (checkDayOfWeek(timeBegin.getDay(), guestSpeaker.availabilities[k].dayOfWeek)) {
        if ((guestSpeaker.availabilities[k].availableFrom <= timeBegin && guestSpeaker.availabilities[k].availableUntil >= timeEnd)) {
          return true;
        }
      }
    }
  }

  return false;
}

/**
  * Check if facilitator and guest speaker can work with each other and pair them for booking.
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

