const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  auth: {
    user: process.env.nodemai_email,
    pass: process.env.nodemai_pass,
  },
  host: "smtp.gmail.com",
});

const mailer = async ({ subject, html, to, text }) => {
  await transport.sendMail({
    subject: subject || "Verify Account",
    html: html || "",
    to: to || "rayyana18.rizki@gmail.com",
    text: text || "This email for verify account from node mailer",
  });
};

module.exports = mailer;
