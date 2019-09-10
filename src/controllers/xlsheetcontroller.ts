import * as XLSX from 'xlsx';
import fs from 'fs';
import { City } from '../models/city.model';
import { Facilitator } from '../models/facilitator.model';

const buf = fs.readFileSync("src/ExcelSheetIO/BigIssueRostering.xlsx");
const wb = XLSX.read(buf, { type: 'buffer' });

//Getting Locations | Workshops sheet
const Locations = XLSX.utils.sheet_to_json(wb.Sheets["Locations | Workshops"]);
const locationObject = JSON.stringify(Locations, null, 4);
const mydataCity = JSON.parse(locationObject);

//console.log(locationObject);
fs.writeFile("src/ExcelSheetIO/Locations.json", locationObject, function (err) {
  if (err) {
    console.log(err);
  }
  console.log("Done");
});

//Sample code to fetch from the JSON file
const c = new City();
c.city = mydataCity[0].City;
console.log("value  :" + c.city);

//Getting Facilitators | GuestSpeakers sheet
const FandGS = XLSX.utils.sheet_to_json(wb.Sheets["Facilitators | GuestSpeakers"]);
const FandGSObject = JSON.stringify(FandGS, null, 4);
//console.log(FandGSObject);
fs.writeFile("src/ExcelSheetIO/FacilitatorsGuestSpeakers.json", FandGSObject, function (err) {
  if (err) {
    console.log(err);
  }
  console.log("Done");
});

const f = new Facilitator();
const mydata = JSON.parse(FandGSObject);
f.city = mydata[0].City;
console.log("value  :" + f.city);


//Getting contacts sheet
const contacts = XLSX.utils.sheet_to_json(wb.Sheets["Contact Information"]);
const contactsObject = JSON.stringify(contacts, null, 4);
//console.log(contactsObject);
fs.writeFile("src/ExcelSheetIO/ContactInformation.json", contactsObject, function (err) {
  if (err) {
    console.log(err);
  }
  console.log("Done");
});


//Getting Melbourne sheet
const Melbourne = XLSX.utils.sheet_to_json(wb.Sheets["Melbourne"]);
const MelbourneObject = JSON.stringify(Melbourne, null, 4);
//console.log(MelbourneObject);
fs.writeFile("src/ExcelSheetIO/Melbourne.json", MelbourneObject, function (err) {
  if (err) {
    console.log(err);
  }
  console.log("Done");
});

//Getting RosterOutput sheet
const Roster = XLSX.utils.sheet_to_json(wb.Sheets["RosterOutput"]);
const RosterObject = JSON.stringify(Roster, null, 4);
//console.log(RosterObject);
fs.writeFile("src/ExcelSheetIO/RosterOutput.json", RosterObject, function (err) {
  if (err) {
    console.log(err);
  }
  console.log("Done");
});


// writing into a json file data.json
// fs.writeFile("src/ExcelSheetIO/data.json",JSON.stringify(wb,null,4),function(err){
//   if(err){
//     console.log(err);
//   }
//   console.log("Done");
// });

// writing into a excel sheet RosterSheet.xlsx
//XLSX.writeFile(wb,"src/ExcelSheetIO/RosterSheet.xlsx");


// Code to get different sheets
