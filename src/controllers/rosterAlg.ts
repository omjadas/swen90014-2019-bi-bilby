// import { generateTimesForDay } from "./generateTimes";
// import { readData } from "./readData";
// import { generateTimesAlreadyBooked } from "./getTimesBooked";
// import { getTimefacilitator } from "./getTimefacilitator";

// /**
//  * Base function for generating the availabilitites for the facilitator
//  * to choose on their specified day
//  */
// async function findAvailableTimes(): Promise<void> {
//   const data = readData();

//   // Need to update to define with data model
//   const currentBookings = data.currentBookings;
//   const teacherPreferences = data.teacherPreference;

//   // Get date for the preference
//   const preferredDate = teacherPreferences[0].date;
//   const year = Number(preferredDate.substring(0,4));
//   const month = Number(preferredDate.substring(5,7));
//   const day = Number(preferredDate.substring(8,10));

//   const possibleTimes = await generateTimesForDay(year, month - 1, day);

//   const blockedTimes = await generateTimesAlreadyBooked(currentBookings);

//   // Remove all blocked out times from candidate list
//   for (let i = 0; i < blockedTimes.length; i++) {
//     for (let j = 0; j < possibleTimes.length; j++) {
//       if (blockedTimes[i].getTime() === possibleTimes[j].getTime()) {
//         // Remove the next 1.5 hours after clash
//         possibleTimes.splice(j, 3);
//       }
//     }
//   }

//   //fetching the facilitator availability
//   const facilitats = data.facilitator;
//   const facTimes = await getTimefacilitator(facilitats);
//   for (let i=0; i<facilitats.length;i++){
//     for(let j=0;j<possibleTimes.length;j++){
//       if(facTimes[i].getTime()===possibleTimes[j].getTime()){
//         console.log(facTimes[i]);
//         console.log(facilitats[i].contactName);
//       }
//     }
//   }

//   for (let i = 0; i < possibleTimes.length; i++) {
//     //console.log("Possible \n"+possibleTimes[i]);
//   }
// }

// findAvailableTimes();
