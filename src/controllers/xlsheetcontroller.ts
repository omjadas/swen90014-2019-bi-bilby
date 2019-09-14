// import * as XLSX from 'xlsx';
// import fs from 'fs';
// import { CityModel, City } from '../models/city.model';
// import { Facilitator, FacilitatorModel } from '../models/facilitator.model';
// import { WorkshopModel, Workshop } from '../models/workshop.model';
// import { GuestSpeaker } from '../models/guestSpeaker.model';
// import { School, SchoolModel } from '../models/school.model';

// const buf = fs.readFileSync("src/ExcelSheetIO/BigIssueRostering.xlsx");
// const wb = XLSX.read(buf, { type: 'buffer' });

// //Getting Locations | Workshops sheet
// const s = wb.Sheets["Locations | Workshops"];
// const Locations = XLSX.utils.sheet_to_json(s);

// const locationObject = JSON.stringify(Locations, null, 4);
// const mydataCity = JSON.parse(locationObject);
// //console.log(locationObject);
// fs.writeFile("src/ExcelSheetIO/Locations.json", locationObject, function (err) {
//   if (err) {
//     console.log(err);
//   }
//   console.log("Done");
// });


// //Sample code to fetch from the JSON file
// const cities: City[] = [];
// Object.values(mydataCity[0]).forEach((city) => {
//   cities.push(new CityModel({ city: city }));
// });
// console.log(cities.toString());

// //Workshop Type
// const workshops: Workshop[] = [];

// for (let i = 1; i < Object.keys(mydataCity).length; i++) {
//   workshops.push(new WorkshopModel({ workshopType: mydataCity[i]["Workshop Type"] }));
// }


// console.log(mydataCity[1]["Workshop Type"]);
// console.log(workshops.toString());


// //Getting Facilitators | GuestSpeakers sheet
// const FandGS = XLSX.utils.sheet_to_json(wb.Sheets["Facilitators | GuestSpeakers"]);
// const FandGSObject = JSON.stringify(FandGS, null, 4);
// const FandGSO = JSON.parse(FandGSObject);
// //console.log(FandGSObject);
// fs.writeFile("src/ExcelSheetIO/FacilitatorsGuestSpeakers.json", FandGSObject, function (err) {
//   if (err) {
//     console.log(err);
//   }
//   console.log("Done");
// });

// const facilitatorusers: Facilitator[] = [];
// for (let i = 0; i < Object.keys(FandGSO).length; i++) {
//   if (FandGSO[i]["Type"] == 'Facilitator'){
//     console.log("Facilitators :" + FandGSO[i]["First Name"]);
//     facilitatorusers.push(new FacilitatorModel({ firstName: FandGSO[i]["First Name"], lastName: FandGSO[i]["Last Name"], email: FandGSO[i]["email"], userType: FandGSO[i]["Type"], city: FandGSO[i]["City"], phoneNumber: FandGSO[i]["Last Name"], trained: FandGSO[i]["trained"], reliable: FandGSO[i]["reliable"], specificUnavailabilities: FandGSO[i]["fff"] }));
//   }
// }
// console.log("Details  :" + facilitatorusers.toString());

// const GSusers: GuestSpeaker[] = [];
// for (let i = 0; i < Object.keys(FandGSO).length; i++) {
//   if (FandGSO[i]["Type"] == 'Guest Speaker'){
//     console.log( "Guest Speakers :" + FandGSO[i]["First Name"]);
//     GSusers.push(new FacilitatorModel({ firstName: FandGSO[i]["First Name"], lastName: FandGSO[i]["Last Name"], email: FandGSO[i]["email"], userType: FandGSO[i]["Type"], city: FandGSO[i]["City"], phoneNumber: FandGSO[i]["Last Name"], trained: FandGSO[i]["trained"], reliable: FandGSO[i]["reliable"], specificUnavailabilities: FandGSO[i]["fff"] }));
//   }
// }
// console.log("Details  :" + GSusers.toString());

// //Getting contacts sheet
// const c = wb.Sheets["Contact Information"];
// const contacts = XLSX.utils.sheet_to_json(c, { header: "A"});
// const contactsObject = JSON.stringify(contacts, null, 4);
// const contact = JSON.parse(contactsObject);
// //console.log(contactsObject);
// fs.writeFile("src/ExcelSheetIO/ContactInformation.json", contactsObject, function (err) {
//   if (err) {
//     console.log(err);
//   }
//   console.log("Done");
// });
// const schools: School[] = [];
// for (let i = 2; i < Object.keys(contact).length; i++) {
//   schools.push(new SchoolModel({
//     Teachername: contact[i]["A"],
//     Schoolname: contact[i]["B"],
//     email: contact[i]["C"],
//     phoneNumber: contact[i]["D"]
//   }));
// }
// console.log("Details  :" + schools.toString());

// //Getting Melbourne sheet
// const m = wb.Sheets["Melbourne"];
// const Melbourne = XLSX.utils.sheet_to_json(m, { header: 2 });
// const MelbourneObject = JSON.stringify(Melbourne, null, 4);
// //console.log(MelbourneObject);
// fs.writeFile("src/ExcelSheetIO/Melbourne.json", MelbourneObject, function (err) {
//   if (err) {
//     console.log(err);
//   }
//   console.log("Done");
// });


// // writing into a json file data.json
// // fs.writeFile("src/ExcelSheetIO/data.json",JSON.stringify(wb,null,4),function(err){
// //   if(err){
// //     console.log(err);
// //   }
// //   console.log("Done");
// // });

// // writing into a excel sheet RosterSheet.xlsx
// //XLSX.writeFile(wb,"src/ExcelSheetIO/RosterSheet.xlsx");


// // Code to get different sheets
