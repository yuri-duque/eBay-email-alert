class ResultSearch {
  constructor(
    title,
    categoryName,
    galleryURL,
    viewItemURL,
    currentPrice,
    sellingState
  ) {
    this.title = title;
    this.categoryName = categoryName;
    this.galleryURL = galleryURL;
    this.viewItemURL = viewItemURL;
    this.currentPrice = currentPrice;
    this.sellingState = sellingState;
  }
}

module.exports = ResultSearch;
