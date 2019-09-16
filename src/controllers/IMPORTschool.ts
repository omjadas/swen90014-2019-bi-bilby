import * as XLSX from 'xlsx';
import fs from 'fs';
import { School, SchoolModel } from '../models/school.model';
import { Teacher, TeacherModel } from '../models/teacher.model';
import { User, UserModel } from '../models/user.model';

/**
  * Function for Getting all the School details
  */
function getSchools(file: Buffer): User[]
{
  const wb = XLSX.read(file, { type: 'buffer' });
  const c = wb.Sheets["Contact Information"];
  const contact: any[]  = XLSX.utils.sheet_to_json(c, { header: "A" });
  const schools: User[] = [];
  console.log(contact);

  for (let i = 2; i < Object.keys(contact).length; i++) {
    schools.push(new UserModel({
      _school: new SchoolModel({
        city: contact[i]["B"],
        name: contact[i]["C"]
      }),
      _techer: new TeacherModel({
        firstName: contact[i]["A"],
        email: contact[i]["D"],
        phoneNumber: contact[i]["E"]
      })
    }));
  }
  return schools;
}

const buf = fs.readFileSync("src/ExcelSheetIO/BigIssueRostering.xlsx");
console.log("Details of school :" + getSchools(buf).toString());

