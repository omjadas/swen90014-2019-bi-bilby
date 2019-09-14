import * as XLSX from 'xlsx';
import fs from 'fs';
import { CityModel, City } from '../models/city.model';
import { WorkshopModel, Workshop } from '../models/workshop.model';


const buf = fs.readFileSync("src/ExcelSheetIO/BigIssueRostering.xlsx");
const wb = XLSX.read(buf, { type: 'buffer' });

//Getting Locations | Workshops sheet
const s = wb.Sheets["Locations | Workshops"];
const Locations = XLSX.utils.sheet_to_json(s);
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
const cities: City[] = [];
Object.values(mydataCity[0]).forEach((city) => {
  cities.push(new CityModel({ city: city }));
});
console.log(cities.toString());

//Workshop Type
const workshops: Workshop[] = [];

for (let i = 1; i < Object.keys(mydataCity).length; i++) {
  workshops.push(new WorkshopModel({ workshopType: mydataCity[i]["Workshop Type"] }));
}

console.log(workshops.toString());
