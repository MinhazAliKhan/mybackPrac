require("dotenv").config();
const express = require("express");
const connectDb = require("./config/db");
const router = require("./router/userRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', router);
const PORT = process.env.PORT || 5000;
connectDb();
app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
