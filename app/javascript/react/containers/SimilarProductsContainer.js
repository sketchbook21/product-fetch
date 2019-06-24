import React, { Component } from 'react'
import NewResultTile from '../tiles/NewResultTile'

class SimilarProductsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {

    let products = this.props.data ? this.props.data : null
    if (products) {
      let key = 0
      let productsDisplay = products.map(product => {
        key += 1
        let listPrice = product.ItemAttributes["ListPrice"] ? product.ItemAttributes["ListPrice"]["FormattedPrice"] : "N/A"
        let currentPrice = product.OfferSummary["LowestNewPrice"] ? product.OfferSummary["LowestNewPrice"]["FormattedPrice"] : "N/A"
        let productTitle = product.ItemAttributes.Title.length > 110 ? `${product.ItemAttributes.Title.substring(0, 110)}...` : product.ItemAttributes.Title
        let releaseDate = product.ItemAttributes.ReleaseDateHuman ? product.ItemAttributes.ReleaseDateHuman : "N/A"
        let productURL = product.DetailPageURL
        let productReviews = product.CustomerReviews.IFrameURL
        let productImage = product.LargeImage ? product.LargeImage.URL : 'http://www.culturalwellnesscenter.org/wp-content/uploads/2015/11/no-image-available.png'
        return (
          <NewResultTile
            key={key}
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
          <div className="row">
            <h5>Similar Products</h5>
            {productsDisplay}
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

export default SimilarProductsContainer;