/**
* Function for Getting the date format
*/
export function getconversionDate(excelDate: any): Date {
  return new Date((excelDate - (25567 + 1 )) * 86400 * 1000);
}
