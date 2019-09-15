import * as XLSX from 'xlsx';
import fs from 'fs';
import { CityModel, City } from '../models/city.model';
import { WorkshopModel, Workshop } from '../models/workshop.model';

/**
  * Function to get the Cities
  */
function getCities(file: Buffer): City[] {
  const wb = XLSX.read(file, { type: 'buffer' });
  const s = wb.Sheets["Locations | Workshops"];
  const mydataCity: any[] = XLSX.utils.sheet_to_json(s);
  const cities: City[] = [];

  Object.values(mydataCity[0]).forEach((city) => {
    cities.push(new CityModel({ city: city }));
  });
  return cities;
}

/**
  * Function to get Workshop types
  */
function getWorkshopTypes(file: Buffer): Workshop[] {
  const wb = XLSX.read(file, { type: 'buffer' });
  const s = wb.Sheets["Locations | Workshops"];
  const mydataCity: any[] = XLSX.utils.sheet_to_json(s);
  const workshops: Workshop[] = [];

  for (let i = 1; i < Object.keys(mydataCity).length; i++) {
    workshops.push(new WorkshopModel({ workshopName: mydataCity[i]["Workshop Type"] }));
  }
  return workshops;
}

const buf = fs.readFileSync("src/ExcelSheetIO/BigIssueRostering.xlsx");
console.log(getCities(buf).toString());
console.log(getWorkshopTypes(buf).toString());
