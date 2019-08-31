import mongoose from "mongoose";

const DB_HOST = process.env.DB_HOST || "localhost:27017";
const DB_USER = process.env.DB_USER || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "db1";

/**
 * Connect to DB
 */
function connect(): void {
  mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/admin`, { useNewUrlParser: true }, err => {
    if (!err) {
      console.log("Connected to mongo ");
    } else {
      console.log("Failed to connect to mongo");
      setTimeout(connect, 1000);
    }
  });
}

connect();
