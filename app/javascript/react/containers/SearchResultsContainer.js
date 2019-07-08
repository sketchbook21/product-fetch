import React, { Component } from 'react'
import {animateScroll as scroll} from 'react-scroll'
import NewResultDetailTile from '../tiles/NewResultDetailTile'
import UsedResultDetailTile from '../tiles/UsedResultDetailTile'
import SimilarProductsContainer from './SimilarProductsContainer'
import UsedResultsContainer from './UsedResultsContainer'


class SearchResultsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showActive: true,
    }
  }

  passShowClick = () => {
    if (this.state.showActive) {
      this.setState({ showActive: false })
    } else {
      this.setState({ showActive: true })
    }
  }

  scrollTop = () => {
    scroll.scrollToTop()
  }

  render() {
    let showActive = this.state.showActive
    let ebayList = showActive ? this.props.ebayActive : this.props.ebayCompleted
    return (
      <div>
        <div className="row">
          <div className="small-8 columns">
            <SimilarProductsContainer dataDetail={this.props.amazonDetailData} dataList={this.props.amazonSimilarData} searchTerm={this.props.searchTerm}/>
          </div>
          <div className="small-8 columns">
            <UsedResultsContainer 
              dataDetail={this.props.ebayDetailData} 
              priceAvg={this.props.ebayAvg} 
              avgDiscount={this.props.ebayAvgDiscount}
              dataList={ebayList} 
              searchTerm={this.props.searchTerm}
              showActive={showActive} 
              passShowClick={this.passShowClick}
            />
          </div>
          <div style={{ padding: '0 10px' }}>
            <div className="small-16 columns" id="scroll-top" onClick={this.scrollTop}>
              Back To Top
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchResultsContainer