import React, { Component } from 'react'
import SearchBar from '../components/SearchBar'
import NewResultDetailContainer from './NewResultDetailContainer'
import UsedResultDetailContainer from './UsedResultDetailContainer'
import SimilarProductsContainer from './SimilarProductsContainer'
import SubNav from '../components/SubNav'
import UsedResultsContainer from './UsedResultsContainer'
import RelatedProductsContainer from './RelatedProductsContainer';

class SearchResultsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <SearchBar />
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