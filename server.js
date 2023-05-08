const express = require("express");
const {connection} = require('./config/db')
require("dotenv").config();

const cors = require("cors");
const { noticeRouter } = require("./routes/notice.route");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.get("/", (req, res) => {
  res.status(200).send({ msg: "this is our base route" });
});

app.use("/notice",noticeRouter)


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
