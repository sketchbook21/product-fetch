import React from 'react'

const UsedResultTile = (props) => {
  let priceDisplay
  if (props.buyItNow === "false") {
    priceDisplay =
      <div className="small-16 columns">
        <a className="s3 w7" href={props.url} target="_blank"><span className="s5 w3">Sold Price</span><br />{props.listPrice}</a>
      </div>
  } else {
    priceDisplay =
    <div>
      <div className="small-5 columns">
        <a className="s3 w7" href={props.url} target="_blank"><span className="s5 w3">Sold Price</span><br /><span style={{ textDecoration: 'line-through' }}>{props.listPrice}</span></a>
      </div>
      <div className="small-11 columns">
        <a className="s3 w7" href={props.url} target="_blank"><span className="s5 w3">Current Price</span><br />{props.currentPrice}</a>
      </div>
    </div>
  }
  return (
    <div className="result-tile">
      <div className="row underline">
        <div className="small-5 columns center">
          <a href={props.url} target="_blank"><img src={props.image} className="result-image-tile" /></a>
        </div>
        <div className="small-11 columns">
          <div className="row">
            <div className="small-16 columns result-title-height">
              <a className="s4 w3" href={props.url} target="_blank">{props.title}</a><br />
            </div>
            <div className="small-5 columns">
              <a className="s3 w7" href={props.url} target="_blank"><span className="s5 w3">Auction Price</span><br />{props.currentPrice}</a>
            </div>
            <div className="small-11 columns">
              <a className="s3 w7" href={props.url} target="_blank"><span className="s5 w3">Buy It Now Price</span><br />{props.binPrice}</a>
            </div>
            <div className="small-16 columns w3 s5" style={{ marginTop: '5px' }}>
              Listing Ends: {props.endDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsedResultTile;