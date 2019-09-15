import * as XLSX from 'xlsx';
import fs from 'fs';
import { School, SchoolModel } from '../models/school.model';

/**
  * Function for Getting all the School details
  */
function getSchools(file: Buffer): School[]
{
  const wb = XLSX.read(file, { type: 'buffer' });
  const c = wb.Sheets["Contact Information"];
  const contact: any[]  = XLSX.utils.sheet_to_json(c, { header: "A" });
  const schools: School[] = [];

  for (let i = 2; i < Object.keys(contact).length; i++) {
    schools.push(new SchoolModel({
      Teachername: contact[i]["A"],
      Schoolname: contact[i]["B"],
      email: contact[i]["C"],
      phoneNumber: contact[i]["D"]
    }));
  }
  return schools;
}

const buf = fs.readFileSync("src/ExcelSheetIO/BigIssueRostering.xlsx");
console.log("Details of school :" + getSchools(buf).toString());

