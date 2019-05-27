import React, { Component } from 'react'
import SubNav from '../components/SubNav'
import UsedResultTile from '../tiles/UsedResultTile'


class UsedResultsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let products = this.props.data
    let showActive = this.props.showActive
    let key = 1
    let productsDisplay = products.map(product => {
      let productPrice = product.priceHuman ? product.priceHuman : "N/A"
      let binPrice = product.buyItNowHuman ? product.buyItNowHuman : "N/A"
      let productTitle = product.title.length > 110 ? `${product.title.substring(0, 110)}...` : product.title
      let endDate = product.endDateHuman
      let productURL = product.viewItemURL
      let productReviews = "none"
      let productImage = 'http://www.culturalwellnesscenter.org/wp-content/uploads/2015/11/no-image-available.png'
      if (product.pictureURLSuperSize) {
        productImage = product.pictureURLSuperSize
      } else if (product.pictureURLLarge) {
        productImage = product.pictureURLLarge
      } else if (product.galleryPlusPictureURL) {
        productImage = product.galleryPlusPictureURL
      } else if (product.galleryURL) {
        productImage = product.galleryURL
      }
      let bidCount = product.sellingStatus["bidCount"]
      let buyItNow = product.listingInfo["buyItNowAvailable"]
      key += 1
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
      )
    })
    return (
      <div className="result-container">
        <div className="row">
          <div className="small-5 columns">
            <h5>Used Listings</h5>
          </div>
          <div className="small-11 columns right s5 w3 listing-tab-cont">
            <a className="listing-tab">Active</a>|<a className="listing-tab">Completed</a>
          </div>
        </div>
        {productsDisplay}
      </div>
    )
  }
}

export default UsedResultsContainer;