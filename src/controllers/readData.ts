import fs = require("fs");

/**
 * Read input data and all current constraints
 */
export function readData(): JSON {
  console.log("\n *STARTING* \n");
  
  // Get content from file
  const contents = fs.readFileSync("./test/data/testData.json");
  
  // Define to JSON type
  const jsonContent = JSON.parse(contents.toString());
  
  return (jsonContent);
}
