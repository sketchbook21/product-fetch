import React, { Component } from 'react'

class UsedResultDetailTile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    let data = this.props.data ? this.props.data : null
    if (data) {
      let productTitle = this.props.data.title
      let productURL = this.props.data.viewItemURL
      let auctionPrice = this.props.data.priceHuman
      let binPrice = this.props.data.buyItNowHuman
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
  
  
      return (
        <div className="row">
          <div className="small-8 columns">
            <a href={productURL} target="_blank">
              <img src={imageURL} className="detail-image-tile" />
            </a>
          </div>
          <div className="small-8 columns detail-price">
            <div className="w7">Used</div>
            <div className="detail-title">
              <a className="w3  " href={productURL} target="_blank">{productTitle}</a>
            </div>
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
              Price Data
            </div>
            <div className="s5 w3">
              Buy It Now Price: {binPrice} <br />
              Avg Used Sale Price: {priceAvg} <br />
              Avg Used Discount From New: {priceAvgDiscount} <br />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          No Data Yet
        </div>
      )
    }
  }
}

export default UsedResultDetailTile;