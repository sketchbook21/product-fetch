import React from 'react'

const NewResultTile = (props) => {

  return(
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
            Release Date: {props.releaseDate} | <a href={props.reviews} className="w5 primary" target="_blank">See Product Reviews</a>
          </div>
        </div>
        <div className="small-3 columns right">
          <div className="result-price-height">
            <a className="s4 w7" href={props.url} target="_blank">{props.price}</a>
          </div>
          <a href={props.url} target="_blank" className="button tiny radius secondary see-it-button">See It</a>
        </div>
      </div>
    </div>
  )
}

export default NewResultTile;