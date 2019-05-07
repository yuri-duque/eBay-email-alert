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
  async sendEmail(para, assunto, corpo) {
    const mailOptions = {
      // Configuração necessária para o servidor de emails
      from: emailHost,
      to: para,
      subject: assunto,
      text: corpo
    };

    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return null;
      }
      return info.response;
    });
  }
}

module.exports = EmailService;
