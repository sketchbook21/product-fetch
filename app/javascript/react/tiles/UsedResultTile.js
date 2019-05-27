import React from 'react'

const UsedResultTile = (props) => {

  return (
    <div className="result-tile">
      <div className="row underline">
        <div className="small-4 columns center">
          <a href={props.url} target="_blank"><img src={props.image} className="result-image-tile" /></a>
        </div>
        <div className="small-9 columns">
          <div className="result-title-height">
            <a className="s4 w3" href={props.url} target="_blank">{props.title}</a><br />
          </div>
          <div className="s5 w3">
            Sold Date: {props.releaseDate}<br/>
            Bid Count: 123
          </div>
        </div>
        <div className="small-3 columns right">
          <div className="result-price-height">
            <span className="s5">Sold Price:</span><br/>
            <a className="s4 w7" href={props.url} target="_blank">{props.price}</a>
          </div>
          <a href={props.url} target="_blank" className="button tiny radius secondary see-it-button">See It</a>
        </div>
      </div>
    </div>
  )
}

export default UsedResultTile;