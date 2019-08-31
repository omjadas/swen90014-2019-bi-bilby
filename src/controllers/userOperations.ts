import {dayOfWeek, Facilitator, Availability} from "../models/facilitator.model";
import {GuestSpeaker} from "../models/guestSpeaker.model";
import {Workshop} from '../models/workshop.model';
import {User, UserType} from "../models/user.model";
import {Ref} from "typegoose";

/**
  * Check if day matches with availability.
  */
export function checkDayOfWeek(day: number, dayOW: dayOfWeek): boolean {
  if (day === 0 && dayOW === dayOfWeek.SUN)
    return true;

  else if (day === 1 && dayOW === dayOfWeek.MON)
    return true;

  else if (day === 2 && dayOW === dayOfWeek.TUE)
    return true;

  else if (day === 3 && dayOW === dayOfWeek.WED)
    return true;

  else if (day === 4 && dayOW === dayOfWeek.THU)
    return true;

  else if (day === 5 && dayOW === dayOfWeek.FRI)
    return true;

  else if (day === 6 && dayOW === dayOfWeek.SAT)
    return true;

  return false;
}

/**
  * Check if guest speaker is available for specified time.
  */
export function userAvailable(availabilities: Availability[], day: number, hours: number): boolean {
  for (let i = 0; i < availabilities.length; i++) {
    const dayOW = availabilities[i].dayOfWeek;

    if ((hours >= 8 && hours <= 12 && availabilities[i].morning)
      || (hours > 12 && hours <= 17 && availabilities[i].afternoon)) {
      if (checkDayOfWeek(day, dayOW)) {
        return true;
      }
    }
  }
  return false;
}

/**
  * Check if user (facilitator or guest speaker) are eligible for a particular workshop.
  */
export function eligible(user: User, workshop: Ref<Workshop>): boolean {
  if (workshop instanceof Workshop)
    if (user.userType === UserType.FACILITATOR && workshop.requireFacilitator)
      return true;
    else if (user.userType === UserType.GUEST_SPEAKER && workshop.requireGuestSpeaker)
      return true;

  return false;
}

/**
  * Check if facilitator and guest speaker can work with each other and pair them for booking.
  */
export function pairTeams(facilitator: User, guestSpeaker: User): null | [User, User] {
  let team: [User, User];

  if (facilitator._facilitator instanceof Facilitator && guestSpeaker._guestSpeaker instanceof GuestSpeaker) {
    if ((guestSpeaker._guestSpeaker.trained && facilitator._facilitator.trained)
        || (!(guestSpeaker._guestSpeaker.trained) && facilitator._facilitator.trained)) {
      team = [facilitator, guestSpeaker];
      return team;
    }
  }

  return null;
}

