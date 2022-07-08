const express = require("express");

const router = express.Router();

router.post("/form", async (req, res) => {
  try {
    const { firstname, lastname, email, message, subject } = req.fields;

    const data = {
      from: `${firstname} ${lastname} <${email}>`,
      to: process.env.MY_MAIL,
      subject: subject,
      text: message,
    };

    mg.messages().send(data, (error, body) => {
      res.json({ message: "Formule bien envoyé" });
      console.log(body);
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
