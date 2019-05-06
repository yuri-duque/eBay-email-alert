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

  // Salvando Alerta
  async create(request, response) {
    const result = await this.repository.create(request.body);

    if (result && !result.sucess && result.alertExist) {
      response.status(406);
    }

    response.send(result);
  }

  // Alterando Alerta
  async update(request, response) {
    const result = await this.repository.update(request.body);

    response.send(result);
  }

  // Listando Alertas
  async list(request, response) {
    const queryString = request.query; // Pegando o searchTerm enviado via parametro GET
    const result = await this.repository.list(queryString.searchTerm);

    response.send(result);
  }

  // Deletando Alerta
  async delete(request, response) {
    const result = await this.repository.delete(request.body);

    // deletar envio de email

    response.send(result);
  }

  // Inicia a Contagem do intervalo dos alertas
  async startupCronEmail() {
    // 2 minutos(120 segundos)
    setInterval(async () => {
      await this.sendEmailByAlertInterval("2");
    }, 120 * 1000);

    // 10 minutos(600 segundos)
    setInterval(async () => {
      await this.sendEmailByAlertInterval("10");
    }, 600 * 1000);

    // 30 minutos(1800 segundos)
    setInterval(async () => {
      await this.sendEmailByAlertInterval("30");
    }, 1800 * 1000);
  }

  // Envia o email de alerta
  async sendEmailByAlertInterval(timeIterval) {
    // Pega o resultado do repository
    const result = await this.repository.list();

    if (result.length > 0) {
      // Pega todos os alertas que tenham o intervalo desejado
      const alerts = result.filter(x => x.timeInterval === timeIterval);

      alerts.forEach(async alert => {
        // acessa a API do ebay e procura os produtos pelo 'searchTerm'
        const resultSearch = await this.ebayService.search(alert.searchTerm);

        // refina o resultado da pesquisa no ebay selecionando as caracteristicas que serão uteis
        const products = await this.ebayService.createObjectResultSearch(
          resultSearch
        );

        // Concatena o produto
        const productsStrings = products.map(
          product =>
            ` Nome: ${product.title} \n Preço: ${
              product.currentPrice
            } \n Link: ${product.viewItemURL} \n\n\n`
        );

        // Envia o email de alerta
        await this.emailService.sendEmail(
          alert.email,
          `Alerta sobre os produtos relacionado a pesquisa (${
            alert.searchTerm
          })`,
          "Seus produtos são: \n".concat(productsStrings)
        );
      });
    }
  }
}

module.exports = AlertService;
