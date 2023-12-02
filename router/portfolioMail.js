const express = require("express");

const router = express.Router();

const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: process.env.APIKEY,
});

router.post("/portfolio/contact/form", async (req, res) => {
  try {
    const { name, email, message } = req.fields;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Veuillez remplir tous les champs" });
    }
    
    const data = {
      from: `${name} <${email}>`,
      to: process.env.MY_MAIL,
      subject: "Portfolio message",
      text: message,
    };

    mg.messages
      .create(process.env.DOMAIN, data)
      .then((msg) => res.json({message: "Message bien envoyé",  data: msg })); // logs response data
    //   .catch((err) => res.status(400).json({ error: err.message })); // logs any error`;
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
