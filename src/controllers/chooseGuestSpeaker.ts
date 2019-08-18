import { GuestSpeaker } from "../models/guestSpeaker.model";
import { Workshop } from './workshop';

/**
 * Create a list of all the guest speakers avialable for a specific time.
 */
export function selectPossibleGuestSpeakers(timeSlot: Date, workshop: Workshop, guestSpeaker: GuestSpeaker[]): GuestSpeaker[] {

  const availableGuestSpeakers = [];

  for (let i = 0; i < guestSpeaker.length; i++) {
    for (let j = 0; j < guestSpeaker[i].availability.length; j++) {
      if (guestSpeaker[i].availability === timeSlot) {
        availableGuestSpeakers.push(guestSpeaker[i]);
        break;
      }
    }
  }

  for (let h = 0; h < availableGuestSpeakers.length; h++) {
    if (workshop.workshopName === "Primary : Finding Belonging" && availableGuestSpeakers[h].trained === false)
      availableGuestSpeakers.splice(h,1);
  }

  return (availableGuestSpeakers);
}
