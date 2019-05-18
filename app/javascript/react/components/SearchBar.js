import React, { Component } from 'react'

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const searchTerm = {
      searchTerm: {
        search: this.state.search
      }
    }
    this.props.fetchResults(searchTerm)
  }

  render() {
    return(
      <div className="main-search">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="large-16 columns">
              <div className="row collapse postfix-radius">
                <div className="small-14 columns">
                  <input 
                    name="search"
                    required="true"
                    type="text" 
                    value={this.state.search}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="small-2 columns">
                  <input className="button postfix" type='submit' value='fetch'/>
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