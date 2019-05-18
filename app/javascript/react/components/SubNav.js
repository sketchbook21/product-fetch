import React, { Component } from 'react'

class SubNav extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="underline">
        <dl className="sub-nav">
          <dt>Used:</dt>
          <dd className="active"><a href="#">Completed Listings</a></dd>
          <dd><a href="#">Auctions Ending Soon</a></dd>
          <dd><a href="#">New BIN Listings</a></dd>
        </dl>
      </div>
    )
  }
}

export default SubNav;