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
    fetch(`/api/v1/search/`, {
      method: 'POST',
      body: JSON.stringify(searchTerm),
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
        search: body.search
      })
      console.log(body.amazon_response)
    })
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