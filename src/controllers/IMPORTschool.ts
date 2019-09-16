import * as XLSX from 'xlsx';
import fs from 'fs';
import { User, UserModel, UserType } from '../models/user.model';

/**
  * Function for Getting all the School details
  */
function getSchools(file: Buffer): User[]
{
  const wb = XLSX.read(file, { type: 'buffer' });
  const c = wb.Sheets["Contact Information"];
  const contact: any[]  = XLSX.utils.sheet_to_json(c, { header: "A" });
  const schools: User[] = [];

  for (let i = 2; i < Object.keys(contact).length; i++) {
    schools.push(new UserModel({
      firstName: contact[i]["A"],
      email: contact[i]["D"],
      phoneNumber: contact[i]["E"],
      userType: UserType.TEACHER,
      _teacher: new TeacherModel({
        school: new SchoolModel({
          city: new CityModel({
            city: contact[i]["B"],
          }),
          name: contact[i]["C"],
        }),
      }),
    }));
  }
  return schools;
}

const buf = fs.readFileSync("src/ExcelSheetIO/BigIssueRostering.xlsx");
console.log("Details of school :\n" + JSON.stringify(getSchools(buf), null, 4));
