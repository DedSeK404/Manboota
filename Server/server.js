const express = require("express");

const app = express();
var cors = require("cors");
require("dotenv").config({ path: "./config/.env" });
PORT = process.env.port || 6000;

const connectToDB = require("./config/DataBase");

app.use(cors());
app.use(express.json()); 

connectToDB();

app.use("/auth", require("./routes/userRoutes")); 


app.listen(PORT, (e) =>
  e ? console.log(e.message) : console.log(`Server is running on port ${PORT}`)
);
