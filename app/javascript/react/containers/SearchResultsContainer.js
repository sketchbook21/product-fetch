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
    console.log(document.body.scrollTop)
    let showActive = this.state.showActive
    let ebayData = showActive ? this.props.ebayActive : this.props.ebayCompleted
    return (
      <div>
        <div className="row">
          <div className="small-16 columns">
            <h4>Top Results</h4>
          </div>
          <div className="small-8 columns left-column">
            <NewResultDetailTile data={this.props.amazonDetailData}/>
          </div>
          <div className="small-8 columns right-column">
            <UsedResultDetailTile 
              data={this.props.ebayDetailData} 
              priceAvg={this.props.ebayAvg} 
              avgDiscount={this.props.ebayAvgDiscount}
            />
          </div>
        </div>
        <div className="row">
          <div className="small-8 columns left-column">
            <SimilarProductsContainer data={this.props.amazonSimilarData}/>
          </div>
          <div className="small-8 columns right-column">
            <UsedResultsContainer 
              data={ebayData} 
              showActive={showActive} 
              passShowClick={this.passShowClick}
            />
          </div>
          <div className="small-16 columns" id="scroll-top" onClick={this.scrollTop}>
            Back To Top
          </div>
        </div>
      </div>
    )
  }
}

export default SearchResultsContainer