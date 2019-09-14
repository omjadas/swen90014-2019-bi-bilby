import * as XLSX from 'xlsx';
import fs from 'fs';
import { TeacherModel, Teacher } from '../models/teacher.model';
import { School, SchoolModel } from '../models/school.model';

const buf = fs.readFileSync("src/ExcelSheetIO/BigIssueRostering.xlsx");
const wb = XLSX.read(buf, { type: 'buffer' });

//Getting contacts sheet
const c = wb.Sheets["Contact Information"];
const contacts = XLSX.utils.sheet_to_json(c, { header: "A" });
const contactsObject = JSON.stringify(contacts, null, 4);
const contact = JSON.parse(contactsObject);

//console.log(contactsObject);
fs.writeFile("src/ExcelSheetIO/ContactInformation.json", contactsObject, function (err) {
  if (err) {
    console.log(err);
  }
  console.log("Done");
});

const schools: School[] = [];

//const sch = SchoolModel.create({ city: "d", Schoolname: "e" });

function getSchools(): School[] {
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

console.log(getSchools().toString());

