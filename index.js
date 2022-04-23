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

app.post("/form", async (req, res) => {
  try {
    const { firstname, lastname, email, message, subject } = req.fields;

    const data = {
      from: `${firstname} ${lastname} <${email}>`,
      to: process.env.MY_MAIL,
      subject: subject,
      text: message,
    };
    // You can see a record of this email in your logs: https://app.mailgun.com/app/logs.
    // You can send up to 300 emails/day from this sandbox server.
    // Next, you should add your own domain so you can send 10000 emails/month for free.

    mg.messages().send(data, (error, body) => {
      res.json({ message: "Formule bien envoyé" });
      console.log(body);
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.get("*", (req, res) => {
  res.status(400).json({ message: "Page not found" });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server listening port: ${port}`);
});
