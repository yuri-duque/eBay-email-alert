class EbayService {
  async get(searchTerm) {
    console.log(`Searching ebay for ${searchTerm}"`);

    return [
      {
        name: "my item 1",
        price: "$10"
      },
      {
        name: "my item 1",
        price: "$10"
      },
      {
        name: "my item 1",
        price: "$10"
      }
    ];
  }
}

module.exports = EbayService;
