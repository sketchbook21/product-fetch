import React, { Component } from 'react'
import SearchBar from '../components/SearchBar'
import NewResultDetailContainer from './NewResultDetailContainer'
import UsedResultDetailContainer from './UsedResultDetailContainer'

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
          <div className="small-8 columns ui-block">
            <NewResultDetailContainer />
          </div>
          <div className="small-8 columns ui-block">
            <UsedResultDetailContainer />
          </div>
        </div>
        <div className="row">
          <div className="small-8 columns ui-block">
            Similar Products
          </div>
          <div className="small-8 columns ui-block">
            <dl className="sub-nav">
              <dt>Used:</dt>
              <dd className="active"><a href="#">Completed Listings</a></dd>
              <dd><a href="#">Auctions Ending Soon</a></dd>
              <dd><a href="#">New BIN Listings</a></dd>
            </dl>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchResultsContainer