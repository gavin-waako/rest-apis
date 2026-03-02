import express from "express";
import bodyParser from "body-parser";
import { router } from "./Furniture.js";

let app = express();
app.use(bodyParser.json());

app.use("/api", router);

// Specify folder with html files to serve as static assets
app.use(express.static("client"));

let PORT = 1234;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
