import * as XLSX from 'xlsx';
import fs from 'fs';
import { Facilitator, FacilitatorModel } from '../models/facilitator.model';
import { GuestSpeaker } from '../models/guestSpeaker.model';

const buf = fs.readFileSync("src/ExcelSheetIO/BigIssueRostering.xlsx");
const wb = XLSX.read(buf, { type: 'buffer' });

//Getting Facilitators | GuestSpeakers sheet
const FandGS = XLSX.utils.sheet_to_json(wb.Sheets["Facilitators | GuestSpeakers"]);
const FandGSObject = JSON.stringify(FandGS, null, 4);
const FandGSO = JSON.parse(FandGSObject);
//console.log(FandGSObject);
fs.writeFile("src/ExcelSheetIO/FacilitatorsGuestSpeakers.json", FandGSObject, function (err) {
  if (err) {
    console.log(err);
  }
  console.log("Done");
});

const facilitatorusers: Facilitator[] = [];
for (let i = 0; i < Object.keys(FandGSO).length; i++) {
  if (FandGSO[i]["Type"] == 'Facilitator'){
    console.log("Facilitators :" + FandGSO[i]["First Name"]);
    facilitatorusers.push(new FacilitatorModel({
      firstName: FandGSO[i]["First Name"],
      lastName: FandGSO[i]["Last Name"],
      email: FandGSO[i]["email"],
      userType: FandGSO[i]["Type"],
      city: FandGSO[i]["City"],
      phoneNumber: FandGSO[i]["Phone Number"],
      trained: FandGSO[i]["trained"],
      reliable: FandGSO[i]["reliable"],
      specificUnavailabilities: FandGSO[i]["fff"]
    }));
  }
}
console.log("Details  :" + facilitatorusers.toString());

const GSusers: GuestSpeaker[] = [];
for (let i = 0; i < Object.keys(FandGSO).length; i++) {
  if (FandGSO[i]["Type"] == 'Guest Speaker'){
    console.log( "Guest Speakers :" + FandGSO[i]["First Name"]);
    GSusers.push(new FacilitatorModel({
      firstName: FandGSO[i]["First Name"],
      lastName: FandGSO[i]["Last Name"],
      email: FandGSO[i]["email"],
      userType: FandGSO[i]["Type"],
      city: FandGSO[i]["City"],
      phoneNumber: FandGSO[i]["Phone Number"],
      trained: FandGSO[i]["trained"],
      reliable: FandGSO[i]["reliable"],
      specificUnavailabilities: FandGSO[i]["fff"]
    }));
  }
}
console.log("Details  :" + GSusers.toString());
