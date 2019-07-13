import React, { Component } from "react";
import { animateScroll as scroll } from "react-scroll";
import NewResultDetailTile from "../tiles/NewResultDetailTile";
import UsedResultDetailTile from "../tiles/UsedResultDetailTile";
import NewProductsContainer from "./NewProductsContainer";
import UsedResultsContainer from "./UsedResultsContainer";

class SearchResultsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showActive: true
    };
  }

  passShowClick = () => {
    if (this.state.showActive) {
      this.setState({ showActive: false });
    } else {
      this.setState({ showActive: true });
    }
  };

  scrollTop = () => {
    scroll.scrollToTop();
  };

  render() {
    const {
      amazonFailed,
      ebayFailed,
      searchTerm,
      amazonDetailData,
      amazonSimilarData,
      ebayDetailData,
      ebayActive,
      ebayCompleted,
      ebayAvg,
      ebayAvgDiscount,
      showActive
    } = this.props;

    let ebayList = showActive ? ebayActive : ebayCompleted;

    return (
      <div>
        <div className="row">
          <div className="small-8 columns">
            <NewProductsContainer
              amazonFailed={amazonFailed}
              searchTerm={searchTerm}
              dataDetail={amazonDetailData}
              dataList={amazonSimilarData}
            />
          </div>
          <div className="small-8 columns">
            <UsedResultsContainer
              ebayFailed={ebayFailed}
              dataDetail={ebayDetailData}
              priceAvg={ebayAvg}
              avgDiscount={ebayAvgDiscount}
              dataList={ebayList}
              searchTerm={this.props.searchTerm}
              showActive={showActive}
              passShowClick={this.passShowClick}
            />
          </div>
          <div style={{ padding: "0 10px" }}>
            <div
              className="small-16 columns"
              id="scroll-top"
              onClick={this.scrollTop}
            >
              Back To Top
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchResultsContainer;
