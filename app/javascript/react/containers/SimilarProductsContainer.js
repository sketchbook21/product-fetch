import React, { Component } from 'react'
import NewResultTile from '../tiles/NewResultTile'

class SimilarProductsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    let products = this.props.data
    let productsDisplay = products.map(product => {
      let listPrice = product.ItemAttributes["ListPrice"] ? product.ItemAttributes["ListPrice"]["FormattedPrice"] : "N/A"
      let currentPrice = product.OfferSummary["LowestNewPrice"] ? product.OfferSummary["LowestNewPrice"]["FormattedPrice"] : "N/A"
      let productTitle = product.ItemAttributes.Title.length > 110 ? `${product.ItemAttributes.Title.substring(0, 110)}...` : product.ItemAttributes.Title
      let releaseDate = product.ItemAttributes.ReleaseDateHuman ? product.ItemAttributes.ReleaseDateHuman : "N/A"
      let productURL = product.DetailPageURL
      let productReviews = product.CustomerReviews.IFrameURL
      let productImage = product.LargeImage.URL
      return(
          <NewResultTile
            key={product.ASIN}
            title={productTitle}
            listPrice={listPrice}
            currentPrice={currentPrice}
            image={productImage}
            url={productURL}
            releaseDate={releaseDate}
            reviews={productReviews}
          />
      )
    })
    return (
      <div className="result-container">
        <h5>Similar Products</h5>
        {productsDisplay}
      </div>
    )
  }
}

export default SimilarProductsContainer;