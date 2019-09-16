import * as XLSX from 'xlsx';
import fs from 'fs';
import { WorkshopModel, Workshop } from '../models/workshop.model';

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
console.log("Workshops :\n" + JSON.stringify(getWorkshopTypes(buf), null, 4));
