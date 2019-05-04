const nodemailer = require("nodemailer");

const emailHost = "yuri.duque@hotmail.com";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Servidor de email "smtp" do Gmail
  port: 587, // Porta padrão
  secure: false, // true for 465, false for other ports
  auth: {
    user: "yuri.tduque@gmail.com", // Conta que será usada para fazer o envio dos emails
    pass: "32yuri32"
  }
});

class EmailService {
  sendEmail(para, assunto, corpo) {
    const mailOptions = {
      // Configuração necessária para o servidor de emails
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
