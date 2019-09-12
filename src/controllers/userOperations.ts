import { Facilitator, FacilitatorModel } from "../models/facilitator.model";
import { GuestSpeaker, GuestSpeakerModel } from "../models/guestSpeaker.model";
import { Workshop, WorkshopModel } from '../models/workshop.model';
import { User, UserType } from "../models/user.model";
import { Ref } from "@hasezoey/typegoose";
import { dayOfWeek } from "../models/availability";

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
  else
    return false;
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
  }

  else if (user._guestSpeaker instanceof GuestSpeakerModel) {
    const guestSpeaker = user._guestSpeaker as GuestSpeaker;
    for (let j = 0; j < guestSpeaker.availabilities.length; j++) {
      if (checkDayOfWeek(timeBegin.getDay(), guestSpeaker.availabilities[j].dayOfWeek)) {
        if ((guestSpeaker.availabilities[j].availableFrom <= timeBegin && guestSpeaker.availabilities[j].availableUntil >= timeEnd)) {
          return true;
        }
      }
    }
  }

  return false;
}

/**
  * Check if user (facilitator or guest speaker) are eligible for a particular workshop.
  */
export function eligible(user: User, workshop: Ref<Workshop>): boolean {
  if (workshop instanceof WorkshopModel) {
    const workshop1 = workshop as Workshop;
    if (user.userType === UserType.FACILITATOR && workshop1.requireFacilitator)
      return true;
    else if (user.userType === UserType.GUEST_SPEAKER && workshop1.requireGuestSpeaker)
      return true;
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

