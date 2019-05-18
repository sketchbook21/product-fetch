import React, { Component } from 'react'
import SubNav from '../components/SubNav'

class UsedResultsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="result-detail ui-block">
        <SubNav />
        Hello from UsedResultsContainer
      </div>
    )
  }
}

export default UsedResultsContainer;