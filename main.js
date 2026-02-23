import express from "express";
import bodyParser from "body-parser";

let app = express();
app.use(bodyParser.json());

let PORT = 1234;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
