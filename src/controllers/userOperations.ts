import {dayOfWeek, Facilitator} from "../models/facilitator.model";
import {GuestSpeaker} from "../models/guestSpeaker.model";
import {Workshop} from '../models/workshop.model';
import {User, UserType} from "../models/user.model";

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
  * Check if facilitator is available for specified time.
  */
export function facilitatorAvailable(user: User, day: number, hours: number): boolean {
  if (user._facilitator instanceof Facilitator) {
    const dayOW = user._facilitator.availabilities[0].dayOfWeek;

    if ((hours >= 8 && hours <= 12 && user._facilitator.availabilities[0].morning)
        || (hours > 12 && hours <= 17 && user._facilitator.availabilities[0].afternoon))

      if (checkDayOfWeek(day, dayOW))
        return true;
  }

  return false;
}

/**
  * Check if guest speaker is available for specified time.
  */
export function guestSpeakerAvailable(user: User, day: number, hours: number): boolean {
  if (user._guestSpeaker instanceof GuestSpeaker) {
    const dayOW = user._guestSpeaker.availabilities[0].dayOfWeek;

    if ((hours >= 8 && hours <= 12 && user._guestSpeaker.availabilities[0].morning)
        || (hours > 12 && hours <= 17 && user._guestSpeaker.availabilities[0].afternoon))

      if (checkDayOfWeek(day, dayOW))
        return true;
  }

  return false;
}

/**
  * Check if the user is a facilitator.
  */
export function isFacilitator(user: User): boolean {
  if (user.userType === UserType.FACILITATOR)
    return true;

  return false;
}

/**
  * Check if the user is a facilitator.
  */
export function isGuestSpeaker(user: User): boolean {
  if (user.userType === UserType.GUEST_SPEAKER)
    return true;

  return false;
}
