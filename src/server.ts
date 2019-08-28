import express from "express";
import api from "./routes/api";
import "./db";

const app = express();
const port = process.env.PORT || 5000;

app.use("/api", api);
app.use(express.static("client/build"));

app.listen(port);
