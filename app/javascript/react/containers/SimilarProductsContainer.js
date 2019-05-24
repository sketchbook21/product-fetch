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
      return(
        <div className="result-tile">
          <div className="row underline">
            <div className="small-4 columns center">
              <a href={product.DetailPageURL} target="_blank"><img src={product.LargeImage.URL} className="result-image-tile" /></a>
            </div>
            <div className="small-9 columns">
              <a className="s4 w3" href={product.DetailPageURL} target="_blank">{product["ItemAttributes"]["Title"]}</a>
            </div>
            <div className="small-3 columns right">
              <a className="s4 w7" href={product.DetailPageURL} target="_blank">{productPrice}</a>
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