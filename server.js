const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 8888;
const DB = process.env.MONGO_URI;

//Server///////////////////////////////////////
mongoose
  .connect(DB)
  .then((con) => {
    console.log(`MongoDB Connected: ${con.connection.host}`);
  })
  .catch((err) => {
    console.log(`Error: ${err.message}`);
  });

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
