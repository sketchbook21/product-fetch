import React from 'react'

const NoResultsTile = (props) => {
  
  return (
    <div className="no-results">
      Sorry, there are no {props.productCondition} results for "{props.searchTerm}"
    </div>
  )
}

export default NoResultsTile;