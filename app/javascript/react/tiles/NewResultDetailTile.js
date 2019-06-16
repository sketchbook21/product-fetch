import React, { Component } from 'react'

class NewResultDetailTile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    let itemAttributes = this.props.data ? this.props.data.ItemAttributes : null
    if (itemAttributes) {
      let releaseDate = this.props.data.ItemAttributes.ReleaseDateHuman ? this.props.data.ItemAttributes.ReleaseDateHuman : "N/A"
      let productTitle = this.props.data.ItemAttributes.Title.length > 65 ? `${this.props.data.ItemAttributes.Title.substring(0, 65)}...` : this.props.data.ItemAttributes.Title
      let price = this.props.data.ItemAttributes.ListPrice ? this.props.data.ItemAttributes.ListPrice.FormattedPrice : this.props.data.OfferSummary.LowestNewPrice.FormattedPrice
      return (
        <div className="row">
          <div className="small-8 columns center">
            <a href={this.props.data.DetailPageURL} target="_blank">
              <img src={this.props.data.LargeImage.URL} className="detail-image-tile" />
            </a>
          </div>
          <div className="small-8 columns detail-price">
            <div className="w7">New</div>
            <div className="detail-title">
              <a className="w3" href={this.props.data.DetailPageURL} target="_blank">{productTitle}</a>
            </div>
            <a href={this.props.data.DetailPageURL} target="_blank">
              <div className="row detail-price-button center">
                <div className="small-8 columns center padding-top">
                  <h5 className="w7">
                    {price}
                  </h5>
                </div>
                <div className="small-8 columns center see-on-button padding-top">
                  See On<br/>Amazon
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
              Manufacturer: {this.props.data.ItemAttributes.Brand}<br/>
              Release Date: {releaseDate}<br/>
              <a href={this.props.data.CustomerReviews.IFrameURL} className="w5 primary" target="_blank">See Product Reviews</a>
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

export default NewResultDetailTile;