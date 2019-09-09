import * as XLSX from 'xlsx';
import fs from 'fs';
//import { json } from 'body-parser';

const buf = fs.readFileSync("src/ExcelSheetIO/BigIssueRostering.xlsx");
const wb = XLSX.read(buf, {type:'buffer'});

// writing into a json file data.json
fs.writeFile("src/ExcelSheetIO/data.json",JSON.stringify(wb,null,4),function(err){
  if(err){
    console.log(err);
  }
  console.log("Done");
});

// writing into a excel sheet RosterSheet.xlsx
XLSX.writeFile(wb,"src/ExcelSheetIO/RosterSheet.xlsx");


// Code to get different sheets

// wb.SheetNames.forEach(function(sheetName) {
//   const sheets = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
//   const jsonobject = JSON.stringify(sheets,null,4);
//   console.log(jsonobject);
// });
