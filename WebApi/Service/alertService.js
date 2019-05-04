const Repository = require("../Repository/alertRepository");
const EmailService = require("./emailService");
const EbayService = require("./ebayService");

class AlertService {
  constructor() {
    this.repository = new Repository();
    this.emailService = new EmailService();
    this.ebayService = new EbayService();

    this.startupCronEmail(); // não é nescessario ter await pois não se necessita do resultado
  }

  async create(request, response) {
    const result = await this.repository.create(request.body);

    this.startupCronEmail();

    response.send(result);
  }

  async update(request, response) {
    const result = await this.repository.update(request.body);

    response.send(result);
  }

  async list(request, response) {
    const queryString = request.query;
    const result = await this.repository.list(queryString.searchTerm);

    response.send(result);
  }

  async delete(request, response) {
    const result = await this.repository.delete(request.body);

    // deletar envio de email

    response.send(result);
  }

  async startupCronEmail() {
    // 2 minutos(120 segundos)
    setInterval(async () => {
      await this.sendEmailByAlertInterval("120");
    }, 120 * 1000);

    // 10 minutos(600 segundos)
    setInterval(async () => {
      await this.sendEmailByAlertInterval("600");
    }, 600 * 1000);

    // 30 minutos(1800 segundos)
    setInterval(async () => {
      await this.sendEmailByAlertInterval("1800");
    }, 1800 * 1000);
  }

  async sendEmailByAlertInterval(timeIterval) {
    // Pegar o resultado do repository
    const result = await this.repository.list();

    if (result.length > 0) {
      // Pegar tosoa os alertas que tenham o intervalo desejado intervalo
      const alerts = result.filter(x => x.timeInterval === timeIterval);

      // Enviar E-mail para todos os alertas
      alerts.forEach(async alert => {
        // acessa a API do ebay e procura os produtos pelo 'searchTerm'
        const resultSearch = await this.ebayService.search(alert.searchTerm);

        const products = await this.ebayService.createObjectResultSearch(
          resultSearch
        );

        // Concatena o produto com o preço dele
        const productsStrings = products.map(
          product =>
            `Nome: ${product.title}     Preço: ${product.currentPrice}\n`
        );

        await this.emailService.sendEmail(
          alert.email,
          `Alerta sobre os produtos relacionado a pesquisa (${
            alert.searchTerm
          })`,
          "Seus produtos são: \n".concat(productsStrings)
        );

        // console.log(`e-mail enviado ${timeIterval} - ${productsStrings}`);
      });
    }
  }
}

module.exports = AlertService;
