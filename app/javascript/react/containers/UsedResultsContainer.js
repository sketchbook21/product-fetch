import React, { Component } from "react";
import UsedResultDetailTile from "../tiles/UsedResultDetailTile";
import UsedResultTile from "../tiles/UsedResultTile";
import NoResultsTile from "../tiles/NoResultsTile";

class UsedResultsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleActiveClick = event => {
    event.preventDefault();
    if (!this.props.showActive) {
      this.props.passShowClick();
    }
  };

  handleCompletedClick = event => {
    event.preventDefault();
    if (this.props.showActive) {
      this.props.passShowClick();
    }
  };

  render() {
    const {
      ebayFailed,
      dataDetail,
      priceAvg,
      avgDiscount,
      dataList,
      searchTerm,
      showActive
    } = this.props;

    let products = dataList ? dataList : null;

    if (ebayFailed || !products) {
      return (
        <NoResultsTile productCondition={"used"} searchTerm={searchTerm} />
      );
    } else {
      let key = 1;
      let activeSelected = "";
      let completedSelected = "";
      if (showActive) {
        activeSelected = "display-selected";
        completedSelected = "";
      } else {
        activeSelected = "";
        completedSelected = "display-selected";
      }

      let productsDisplay = products.map(product => {
        let productPrice = product.priceHuman ? product.priceHuman : "N/A";
        let binPrice = product.buyItNowHuman ? product.buyItNowHuman : "N/A";
        let productTitle =
          product.title.length > 110
            ? `${product.title.substring(0, 110)}...`
            : product.title;
        let endDate = product.endDateHuman;
        let productURL = product.viewItemURL;
        let productReviews = "none";
        let productImage =
          "http://www.culturalwellnesscenter.org/wp-content/uploads/2015/11/no-image-available.png";
        if (product.pictureURLSuperSize) {
          productImage = product.pictureURLSuperSize;
        } else if (product.pictureURLLarge) {
          productImage = product.pictureURLLarge;
        } else if (product.galleryPlusPictureURL) {
          productImage = product.galleryPlusPictureURL;
        } else if (product.galleryURL) {
          productImage = product.galleryURL;
        }
        let bidCount = product.sellingStatus["bidCount"];
        let buyItNow = product.listingInfo["buyItNowAvailable"];
        key += 1;
        return (
          <UsedResultTile
            key={key}
            title={productTitle}
            currentPrice={productPrice}
            binPrice={binPrice}
            image={productImage}
            url={productURL}
            endDate={endDate}
            reviews={productReviews}
            bidCount={bidCount}
            buyItNow={buyItNow}
            showActive={showActive}
          />
        );
      });
      return (
        <div className="result-container">
          <div className="row">
            <div className="small-16 columns detail-item-tile">
              <UsedResultDetailTile data={dataDetail} />
            </div>
            <div className="small-5 columns">
              <h5>Used Listings</h5>
            </div>
            <div className="small-11 columns right s4 w3 listing-tab-cont">
              <a
                className={`listing-tab ${activeSelected}`}
                onClick={this.handleActiveClick}
              >
                Active
              </a>
              |
              <a
                className={`listing-tab ${completedSelected}`}
                onClick={this.handleCompletedClick}
              >
                Completed
              </a>
            </div>
          </div>
          {productsDisplay}
        </div>
      );
    }
  }
}

export default UsedResultsContainer;
