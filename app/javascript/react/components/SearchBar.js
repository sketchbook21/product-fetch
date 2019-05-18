import React, { Component } from 'react'

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div className="main-search">
        <form>
          <div className="row">
            <div className="large-16 columns">
              <div className="row collapse postfix-radius">
                <div className="small-14 columns">
                  <input type="text" placeholder="Hex Value" />
                </div>
                <div className="small-2 columns">
                  <a href="#" className="button postfix">fetch</a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default SearchBar;