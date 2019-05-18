import React from 'react'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import SearchResultsContainer from '../containers/SearchResultsContainer'

export const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path='search' component={SearchResultsContainer} />
    </Router>
  )
}

export default App;