import * as XLSX from 'xlsx';
import fs from 'fs';
import { CityModel, City } from '../models/city.model';

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

const buf = fs.readFileSync("src/ExcelSheetIO/BigIssueRostering.xlsx");
console.log("Cities :\n" + JSON.stringify(getCities(buf), null, 4));
