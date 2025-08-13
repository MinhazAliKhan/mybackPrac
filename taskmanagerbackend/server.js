require("dotenv").config();
const express = require("express");
const connectDb = require("./config/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;
connectDb();
app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
