import React from 'react'

const NewResultTile = (props) => {
  let priceDisplay
  if (props.listPrice === props.currentPrice || props.listPrice === "N/A") {
    priceDisplay = 
    <div className="small-16 columns">
      <a className="s3 w7" href={props.url} target="_blank"><span className="s5 w3">Current Price</span><br/>{props.currentPrice}</a>
    </div>
  } else if (props.currentPrice === "Too low to display") {
    priceDisplay =
    <div className="small-16 columns">
      <a className="s3 w7" href={props.url} target="_blank"><span className="s5 w3">Current Price</span><br />{props.listPrice}</a>
    </div>
  } else {
    priceDisplay =
    <div>
      <div className="small-5 columns">
        <a className="s3 w7" href={props.url} target="_blank"><span className="s5 w3">List Price</span><br /><span style={{ textDecoration: 'line-through' }}>{props.listPrice}</span></a>
      </div>
      <div className="small-11 columns">
        <a className="s3 w7" href={props.url} target="_blank"><span className="s5 w3">Current Price</span><br/>{props.currentPrice}</a>
      </div>
    </div>
  }

  return(
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
            {priceDisplay}
            <div className="small-16 columns w3 s5" style={{marginTop: '5px'}}>
              Released: {props.releaseDate} | <a href={props.reviews} className="w5 primary" target="_blank">Product Reviews</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewResultTile;