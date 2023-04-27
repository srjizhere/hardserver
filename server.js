const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { authenticate } = require("./middelware/authenticate");
const { userDetailRouter } = require("./routes/userdetails.route");


const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());


app.get("/", (req, res) => {
  res.status(200).send({ msg: "this is our base route" });
});

app.use("/user", userRouter);
app.use(authenticate)
app.use("/getProfile", userDetailRouter);




app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to Database");
    console.log(`Listening on ${PORT}`);
  } catch (error) {
    console.log("Failed while connecting to Database");
    console.log(error);
  }
});
