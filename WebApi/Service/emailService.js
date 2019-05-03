const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    // user: "",
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
