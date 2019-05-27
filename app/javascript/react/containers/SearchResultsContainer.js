import React, { Component } from 'react'
import SearchBar from '../components/SearchBar'
import NewResultDetailTile from '../tiles/NewResultDetailTile'
import UsedResultDetailTile from '../tiles/UsedResultDetailTile'
import SimilarProductsContainer from './SimilarProductsContainer'
import UsedResultsContainer from './UsedResultsContainer'
import RelatedProductsContainer from './RelatedProductsContainer';

class SearchResultsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amazonDetailData: {},
      amazonSimilarData: [],
      ebayDetailData: {},
      ebayCompleted: [],
      ebayAvg: "",
      ebayAvgDiscount: "",
      ebayEndSoon: [],
    }
  }

  fetchResults = (payload) => {
    fetch(`/api/v1/search/`, {
      method: 'POST',
      body: JSON.stringify(payload),
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`, error = new Error(errorMessage)
        throw (error)
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        amazonDetailData: body.amazon_detail,
        amazonSimilarData: body.amazon_similar,
        ebayDetailData: body.ebay_detail,
        ebayCompleted: body.ebay_completed,
        ebayAvg: body.ebay_avg,
        ebayAvgDiscount: body.ebay_avg_discount,
      })
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <SearchBar 
          fetchResults={this.fetchResults}
          handleChange={this.handleChange}
          value={this.state.search}
        />
        <div className="row">
          <div className="small-16 columns">
            <h4>Top Results</h4>
          </div>
          <div className="small-8 columns left-column">
            <NewResultDetailTile data={this.state.amazonDetailData}/>
          </div>
          <div className="small-8 columns right-column">
            <UsedResultDetailTile data={this.state.ebayDetailData} priceAvg={this.state.ebayAvg} avgDiscount={this.state.ebayAvgDiscount}/>
          </div>
        </div>
        <div className="row">
          <div className="small-8 columns left-column">
            <SimilarProductsContainer data={this.state.amazonSimilarData}/>
            <RelatedProductsContainer />
          </div>
          <div className="small-8 columns right-column">
            <UsedResultsContainer data={this.state.ebayCompleted}/>  
          </div>
        </div>
      </div>
    )
  }
}

export default SearchResultsContainer