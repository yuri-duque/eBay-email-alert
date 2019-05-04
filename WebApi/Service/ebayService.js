/* eslint-disable prefer-destructuring */

const rp = require("request-promise");
const ResultSearch = require("../Model/ResultSearch");

const uri = "http://svcs.ebay.com/services/search/FindingService/v1"; // URI da Finding API ebay
const operationName = "findItemsByKeywords";
const serviceVersion = "1.0.0";
const securityAppName = "yuriduqu-EmailAle-PRD-8eaa02434-9c5475ae"; // App ID
const responseDataFormat = "JSON"; // Formato de response
const numItens = "3"; // Número de itens de uma pagina
const numPages = "1"; // Número de paginas
const sortOrder = "PricePlusShippingLowest"; // Ordenação os resultados pela valor mais baixo da soma do Preço do produto com o Frete

class EbayService {
  // Retorna a listagem dos produtos encontrados pelo ebay
  async get(request, response) {
    const result = await this.search(request.query.searchTerm);

    const products = await this.createObjectResultSearch(result);

    response.send(products);
  }

  // Retorna um JSON com os resultados da pesquisa feita no ebay
  async search(searchTerm) {
    const options = {
      uri: `${uri}?OPERATION-NAME=${operationName}&SERVICE-VERSION=${serviceVersion}&SECURITY-APPNAME=${securityAppName}&RESPONSE-DATA-FORMAT=${responseDataFormat}&keywords=${searchTerm}&paginationInput.entriesPerPage=${numItens}&paginationInput.pageNumber=${numPages}&sortOrder=${sortOrder}`,
      json: true
    };

    return rp(options) // Executa o requeste com base no plugin "request-promise"
      .then(resp => {
        const result = resp.findItemsByKeywordsResponse[0]; // refina um pouco o response
        return result;
      })
      .catch(err => {
        return err;
      });
  }

  // Refina os response da pesquisa no ebay, pegando apenas as informações necessarias
  async createObjectResultSearch(result) {
    const itens = result.searchResult[0].item; // pegando os itens

    const products = [];

    itens.forEach(async item => {
      const product = new ResultSearch();

      product.title = item.title[0]; // pegando o titulo
      product.categoryName = item.primaryCategory[0].categoryName[0]; // pegando a categoria do produto
      product.galleryURL = item.galleryURL[0]; // pegando a URL da foto do produto
      product.viewItemURL = item.viewItemURL[0]; // Pegando a URL do produto no site do ebay
      // eslint-disable-next-line no-underscore-dangle
      product.currentPrice = item.sellingStatus[0].currentPrice[0].__value__; // Pegando o valor do produto
      product.sellingState = item.sellingStatus[0].sellingState[0]; // pegando o estado da venda do produto

      products.push(product);
    });

    return products;
  }
}

module.exports = EbayService;
