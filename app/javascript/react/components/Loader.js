import React from 'react'

const Loader = (props) => {
  return (
    <div className="center primary">
      <div className="s2 w3 center" style={{margin: "50px 0", fontStyle: "italic"}}>
        fetching products...
        <br />
      </div>
      <div className="loader" />
    </div>
  )
}

export default Loader;