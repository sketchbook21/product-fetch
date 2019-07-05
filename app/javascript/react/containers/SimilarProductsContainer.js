import React, { Component } from 'react'
import NewResultDetailTile from '../tiles/NewResultDetailTile'
import NewResultTile from '../tiles/NewResultTile'
import NoResultsTile from '../tiles/NoResultsTile'

class SimilarProductsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    let searchTerm = this.props.searchTerm
    let products = this.props.dataList.length > 0 ? this.props.dataList : null
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
            <div className="small-16 columns detail-item-tile">
              <NewResultDetailTile data={this.props.dataDetail} />
            </div>
            <h5>Similar Products</h5>
            {productsDisplay}
          </div>
        </div>
      )
    } else {
      return (
        <NoResultsTile productCondition={'new'} searchTerm={searchTerm}/> 
      )
    }
  }
}

export default SimilarProductsContainer;