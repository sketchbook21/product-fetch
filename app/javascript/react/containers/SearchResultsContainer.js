import React, { Component } from 'react'
import SearchBar from '../components/SearchBar'
import NewResultDetailContainer from './NewResultDetailContainer'
import UsedResultDetailContainer from './UsedResultDetailContainer'
import SimilarProductsContainer from './SimilarProductsContainer'
import UsedResultsContainer from './UsedResultsContainer'
import RelatedProductsContainer from './RelatedProductsContainer';

class SearchResultsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newDetailData: {},
      similarProductsData: [],
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
<<<<<<< HEAD
        newDetailData: body.amazon_response_first,
        similarProductsData: body.amazon_response_similar
=======
        search: body.search
>>>>>>> 5d98a56f3aa69f9f3d9cbe278127e8a83b5596f3
      })
      console.log(body)
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
          <div className="small-8 columns">
            <NewResultDetailContainer />
          </div>
          <div className="small-8 columns">
            <UsedResultDetailContainer />
          </div>
        </div>
        <div className="row">
          <div className="small-8 columns">
            <SimilarProductsContainer />
            <RelatedProductsContainer />
          </div>
          <div className="small-8 columns">
            <UsedResultsContainer />  
          </div>
        </div>
      </div>
    )
  }
}

export default SearchResultsContainer