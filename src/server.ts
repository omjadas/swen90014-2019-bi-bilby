import express from "express";
import fileUpload from "express-fileupload";
import api from "./routes/api";

const app = express();
const port = process.env.PORT || 8080;

app.use(fileUpload());
app.use("/api", api);
app.use(express.static("client/build"));

app.listen(port);
