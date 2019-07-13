import React, { Component } from "react";
import SearchResultsContainer from "./SearchResultsContainer";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amazonFailed: false,
      ebayFailed: false,
      searchTerm: "",
      amazonDetailData: {},
      amazonSimilarData: [],
      ebayDetailData: {},
      ebayActive: [],
      ebayCompleted: [],
      ebayAvg: "",
      ebayAvgDiscount: "",
      loading: false
    };
  }

  isLoading = () => {
    this.setState({ loading: true });
  };

  fetchResults = payload => {
    this.isLoading();
    fetch(`/api/v1/search/`, {
      method: "POST",
      body: JSON.stringify(payload),
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({
          amazonFailed: body.amazon_failed,
          ebayFailed: body.ebay_failed,
          searchTerm: body.search_term,
          amazonDetailData: body.amazon_detail,
          amazonSimilarData: body.amazon_similar,
          ebayDetailData: body.ebay_detail,
          ebayActive: body.ebay_active,
          ebayCompleted: body.ebay_completed,
          ebayAvg: body.ebay_avg,
          ebayAvgDiscount: body.ebay_avg_discount,
          loading: false
        });
      });
  };

  render() {
    console.log(this.state);
    let loaderOrSearchResults;
    if (this.state.loading) {
      loaderOrSearchResults = <Loader />;
    } else {
      loaderOrSearchResults = (
        <SearchResultsContainer
          amazonFailed={this.state.amazonFailed}
          ebayFailed={this.state.ebayFailed}
          searchTerm={this.state.searchTerm}
          amazonDetailData={this.state.amazonDetailData}
          amazonSimilarData={this.state.amazonSimilarData}
          ebayDetailData={this.state.ebayDetailData}
          ebayActive={this.state.ebayActive}
          ebayCompleted={this.state.ebayCompleted}
          ebayAvg={this.state.ebayAvg}
          ebayAvgDiscount={this.state.ebayAvgDiscount}
          showActive={this.state.showActive}
        />
      );
    }
    return (
      <div>
        <SearchBar
          fetchResults={this.fetchResults}
          handleChange={this.handleChange}
          value={this.state.search}
        />
        {loaderOrSearchResults}
        <Footer />
      </div>
    );
  }
}

export default HomeContainer;
