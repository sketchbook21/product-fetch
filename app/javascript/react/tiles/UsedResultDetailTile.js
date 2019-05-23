import React, { Component } from 'react'

class UsedResultDetailTile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    if (!this.props.data.title) {
      return (
        <div>
          No Data Yet
        </div>
      )
    } else {
      // let releaseDate = this.props.data.ItemAttributes.ReleaseDateHuman ? this.props.data.ItemAttributes.ReleaseDateHuman : "N/A"
      // let productTitle = this.props.data.ItemAttributes.Title.length > 65 ? `${this.props.data.ItemAttributes.Title.substring(0, 65)}...` : this.props.data.ItemAttributes.Title
      // let price = this.props.data.ItemAttributes.ListPrice ? this.props.data.ItemAttributes.ListPrice.FormattedPrice : this.props.data.OfferSummary.LowestNewPrice.FormattedPrice

      let productTitle = this.props.data.title
      let productURL = this.props.data.viewItemURL
      let productPrice = this.props.data.buyItNowHuman
      let priceAvg = this.props.priceAvg ? this.props.priceAvg : "N/A"
      let priceAvgDiscount = this.props.avgDiscount ? this.props.avgDiscount : "N/A"
      let imageURL = 'http://www.culturalwellnesscenter.org/wp-content/uploads/2015/11/no-image-available.png'
      if (this.props.data.pictureURLSuperSize) {
        imageURL = this.props.data.pictureURLSuperSize
      } else if (this.props.data.pictureURLLarge) {
        imageURL = this.props.data.pictureURLLarge
      } else if (this.props.data.galleryPlusPictureURL) {
        imageURL = this.props.data.galleryPlusPictureURL
      } else if (this.props.data.galleryURL) {
        imageURL = this.props.data.galleryURL
      }
      let auctionPrice = this.props.data.auctionHuman
  
      return (
        <div className="row">
          <div className="small-8 columns center">
            <a href={productURL} target="_blank">
              <img src={imageURL} className="detail-image-tile" />
            </a>
          </div>
          <div className="small-8 columns detail-price">
            <div className="w7">Used</div>
            <a className="w3 detail-title" href={productURL} target="_blank">{productTitle}</a>
            <a href={productURL} target="_blank">
              <div className="row detail-price-button center">
                <div className="small-8 columns center padding-top">
                  <h5 className="w7">
                    {auctionPrice}
                  </h5>
                </div>
                <div className="small-8 columns center see-on-button padding-top">
                  See On<br/>eBay
                </div>
              </div>
            </a>
            <div className="s6 center gray margin-bottom">
              productfetch may get a commission from this link
            </div>
            <div className="s4 w5">
              Product Details
            </div>
            <div className="s5 w3">
              Buy It Now Price: {productPrice} <br />
              Avg Used Sale Price: {priceAvg} <br />
              Avg Used Sale Discount Off New: {priceAvgDiscount} <br />
            </div>
          </div>
        </div>
      )
    }
  }
}

export default UsedResultDetailTile;