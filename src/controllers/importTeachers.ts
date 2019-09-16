import * as XLSX from 'xlsx';
import fs from 'fs';
import { User, UserModel } from '../models/user.model';
import { TeacherModel } from '../models/teacher.model';
import { SchoolModel } from '../models/school.model';

/**
  * Function for Getting all the Teachers
  */
function getTeachers(file: Buffer): User[]
{
  const wb = XLSX.read(file, { type: 'buffer' });
  const u = wb.Sheets["Facilitators | GuestSpeakers"];
  const FandGSO: any[] = XLSX.utils.sheet_to_json(u);
  const Teachers: User[] = [];

  for (let i = 0; i < Object.keys(FandGSO).length; i++) {
    if (FandGSO[i]["Type"] == 'teacher'){
      Teachers.push(new UserModel({
        firstName: FandGSO[i]["First Name"],
        lastName: FandGSO[i]["Last Name"],
        address: FandGSO[i]["Address"],
        email: FandGSO[i]["email"],
        userType: FandGSO[i]["Type"],
        phoneNumber: FandGSO[i]["Phone Number"],
        _teacher: new TeacherModel({
        })
      }));
    }
  }
  return Teachers;
}

const buf = fs.readFileSync("src/ExcelSheetIO/BigIssueRostering.xlsx");
console.log("Teacher Details  :\n" + getTeachers(buf));
