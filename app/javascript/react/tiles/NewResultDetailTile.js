import React, { Component } from 'react'

class NewResultDetailTile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    if (!this.props.data.ItemAttributes) {
      return (
        <div>
          No Data Yet
        </div>
      )
    } else {
      let releaseDate = this.props.data.ItemAttributes.ReleaseDateHuman ? this.props.data.ItemAttributes.ReleaseDateHuman : "N/A"
      return (
        <div className="row">
          <div className="small-8 columns center">
            <img src={this.props.data.LargeImage.URL} className="detail-image-tile" />
          </div>
          <div className="small-8 columns detail-price">
            <div className="w7">New</div>
            <a className="w3" href={this.props.data.DetailPageURL} target="_blank">{this.props.data.ItemAttributes.Title}</a>
            <div className="row detail-price-button center">
              <div className="small-8 columns center padding-top">
                <h5 className="w7">
                  {this.props.data.ItemAttributes.ListPrice.FormattedPrice}
                </h5>
              </div>
              <div className="small-8 columns center see-on-button padding-top">
                See On Amazon
              </div>
            </div>
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
    }
  }
}

export default NewResultDetailTile;