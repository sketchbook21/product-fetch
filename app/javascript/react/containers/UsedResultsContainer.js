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
    let productsDisplay = products.map(product => {
      let productPrice = product.priceHuman ? product.priceHuman : "N/A"
      let productTitle = product.title.length > 110 ? `${product.title.substring(0, 110)}...` : product.title
      let releaseDate = "N/A"
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
      let productId = product.itemId
      let bidCount = product.sellingStatus["bidCount"]
      
      return (
        <UsedResultTile
          key={productId}
          title={productTitle}
          price={productPrice}
          image={productImage}
          url={productURL}
          releaseDate={releaseDate}
          reviews={productReviews}
          bidCount={bidCount}
        />
      )
    })
    return (
      <div className="result-container">
        <h5>Other Used Listings</h5>
        {productsDisplay}
      </div>
    )
  }
}

export default UsedResultsContainer;