const express = require("express");

const router = express.Router();

const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: process.env.P_KEY,
});

router.post("/portfolio/contact/form", async (req, res) => {
  try {
    const { name, email, message } = req.fields;

    mg.messages
      .create(process.env.P_DOMAIN, {
        from: `${name} <${email}>`,
        to: [process.env.P_MAIL],
        subject: "Portfolio message",
        text: message,
      })
      .then((msg) => res.json("Message bien envoyé")); // logs response data
    //   .catch((err) => res.status(400).json({ error: err.message })); // logs any error`;
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
