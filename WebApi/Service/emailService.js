const nodemailer = require("nodemailer");

const emailHost = "yuri.duque@hotmail.com";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "yuri.tduque@gmail.com",
    pass: "32yuri32"
  }
});

class EmailService {
  sendEmail(para, assunto, corpo) {
    const mailOptions = {
      from: emailHost,
      to: para,
      subject: assunto,
      text: corpo
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email enviado: ${info.response}`);
      }
    });
  }
}

module.exports = EmailService;
