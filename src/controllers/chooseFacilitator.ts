import { Facilitator } from "../models/facilitator.model";
import { Workshop } from './workshop';

/**
 * Create a list of all the facilitators avialable for a specific time.
 */
export function selectPossibleFacilitators(timeSlot: Date, workshop: Workshop, facilitator: Facilitator[]): Facilitator[] {

  const availableFacilitators = [];

  for (let i = 0; i < facilitator.length; i++) {
    for (let j = 0; j < facilitator[i].availability.length; j++) {
      if (facilitator[i].availability === timeSlot) {
        availableFacilitators.push(facilitator[i]);
        break;
      }
    }
  }

  for (let h = 0; h < availableFacilitators.length; h++) {
    if (workshop.workshopName === "Primary : Finding Belonging" && availableFacilitators[h].trained === false)
      availableFacilitators.splice(h,1);
  }

  return (availableFacilitators);
}
