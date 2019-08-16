import fs = require("fs");
import { Data } from "../models/data.models";

/**
 * Read input data and all current constraints
 */
export function readData(): Data {
  console.log("\n *STARTING* \n");

  // Get content from file
  const contents = fs.readFileSync("./test/data/testData.json");

  // Define to JSON type
  const jsonContent = JSON.parse(contents.toString());

  return (jsonContent);
}
