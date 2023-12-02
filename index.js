require("dotenv").config();
const express = require("express");
const app = express();

const formidable = require("express-formidable");
app.use(formidable());

const cors = require("cors");
app.use(cors());

const mailgun = require("mailgun-js");

const mg = mailgun({
  apiKey: process.env.APIKEY,
  domain: process.env.DOMAIN,
});

const portfolioMail = require("./router/portfolioMail");
app.use(portfolioMail);

app.get("*", (req, res) => {
  res.status(400).json({ message: "Page not found" });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server listening port: ${port}`);
});
