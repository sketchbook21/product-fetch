import React, { Component } from 'react'

class SimilarProductsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    let products = this.props.data
    let productsDisplay = products.map(product => {
      let productPrice = product.ItemAttributes["ListPrice"] ? product.ItemAttributes["ListPrice"]["FormattedPrice"] : "N/A"
      let productTitle = product.ItemAttributes.Title.length > 110 ? `${product.ItemAttributes.Title.substring(0, 110)}...` : product.ItemAttributes.Title
      let releaseDate = product.ItemAttributes.ReleaseDateHuman ? product.ItemAttributes.ReleaseDateHuman : "N/A"
      return(
        <div className="result-tile">
          <div className="row underline">
            <div className="small-4 columns center">
              <a href={product.DetailPageURL} target="_blank"><img src={product.LargeImage.URL} className="result-image-tile" /></a>
            </div>
            <div className="small-9 columns">
              <div className="result-title-height">
                <a className="s4 w3" href={product.DetailPageURL} target="_blank">{productTitle}</a><br/>
              </div>
              <div className="s5 w3">
                Release Date: {releaseDate} | <a href={product.CustomerReviews.IFrameURL} className="w5 primary" target="_blank">See Product Reviews</a>
              </div>
            </div>
            <div className="small-3 columns right">
              <div className="result-price-height">
                <a className="s4 w7" href={product.DetailPageURL} target="_blank">{productPrice}</a>
              </div> 
              <a href={product.DetailPageURL} target="_blank" className="button tiny radius secondary see-it-button">See It</a>
            </div>
          </div>
        </div>
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