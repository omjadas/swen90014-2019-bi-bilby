import * as XLSX from 'xlsx';
import fs from 'fs';

const buf = fs.readFileSync("src/ExcelSheetIO/BigIssueRostering.xlsx");
const wb = XLSX.read(buf, {type:'buffer'});
wb.SheetNames.forEach(function(sheetName) {
  const sheets = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
  const jsonobject = JSON.stringify(sheets);
  console.log(jsonobject);
});

XLSX.writeFile(wb,"src/ExcelSheetIO/ROsterSheet.xlsx");
