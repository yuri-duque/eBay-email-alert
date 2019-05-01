class EmailService {
  async send(email, body) {
    console.log("Enviando email");
    console.log(body);
  }
}

module.exports = EmailService;
