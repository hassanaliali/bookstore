const nodemailer = require("nodemailer");
// //const sgMail = require("@sendgrid/mail");

// const transport = nodemailer.createTransport({
//   host: process.env.MAIL_SERVICE, // e.g., 'smtp.gmail.com'
//   port: process.env.MAIL_PORT, // e.g., 587 for Gmail
//   secure: false, // true for 465, false for other ports
//   //   service: process.env.MAIL_SERVICE,
//   auth: {
//     user: process.env.MAIL_ADDRESS,
//     pass: process.env.MAIL_PASS,
//   },
// });

// module.exports = transport;
// //sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendEmail = async (to, subject, html) => {
//   const msg = {
//     to,
//     from: process.env.MAIL_ADDRESS,
//     subject,
//     html,
//   };
//   await sgMail.send(msg);
// };

// module.exports = sendEmail;

// const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASS,
  },
});

module.exports = transport;
