"use strict";
const nodemailer = require("nodemailer");

const { config } = require('./config/config');

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: config.emailHost,
    port: config.emailPortSecure,
    secure: true,
    auth: {
      user: config.emailUser,
      pass: config.emailPassword
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: config.emailUser, // sender address
    to: config.emailUser, // list of receivers
    subject: "Esto es un nuevo correo", // Subject line
    text: "Hola Darwin", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

//main();
main().catch(console.error);
