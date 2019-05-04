/* eslint-disable prefer-destructuring */

const rp = require("request-promise");
const ResultSearch = require("../Model/ResultSearch");

const url = "http://svcs.ebay.com/services/search/FindingService/v1";
const operationName = "findItemsByKeywords";
const serviceVersion = "1.0.0";
const securityAppName = "yuriduqu-EmailAle-PRD-8eaa02434-9c5475ae";
const responseDataFormat = "JSON";
const numItens = "3";
const numPages = "1";
const sortOrder = "PricePlusShippingLowest";

class EbayService {
  async get(request, response) {
    const result = await this.search(request.query.searchTerm);

    const products = await this.createObjectResultSearch(result);

    response.send(products);
  }

  async search(searchTerm) {
    const options = {
      uri: `${url}?OPERATION-NAME=${operationName}&SERVICE-VERSION=${serviceVersion}&SECURITY-APPNAME=${securityAppName}&RESPONSE-DATA-FORMAT=${responseDataFormat}&keywords=${searchTerm}&paginationInput.entriesPerPage=${numItens}&paginationInput.pageNumber=${numPages}&sortOrder=${sortOrder}`,
      json: true
    };

    return rp(options)
      .then(resp => {
        const result = resp.findItemsByKeywordsResponse[0];
        return result;
      })
      .catch(err => {
        return err;
      });
  }

  async createObjectResultSearch(result) {
    const itens = result.searchResult[0].item;

    const products = [];

    itens.forEach(async item => {
      const product = new ResultSearch();

      product.title = item.title[0];
      product.categoryName = item.primaryCategory[0].categoryName[0];
      product.galleryURL = item.galleryURL[0];
      product.viewItemURL = item.viewItemURL[0];
      // eslint-disable-next-line no-underscore-dangle
      product.currentPrice = item.sellingStatus[0].currentPrice[0].__value__;
      product.sellingState = item.sellingStatus[0].sellingState[0];

      products.push(product);
    });

    return products;
  }
}

module.exports = EbayService;
