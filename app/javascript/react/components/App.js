import React from 'react'
import { browserHistory, Router, Route, Redirect } from 'react-router'
import SearchResultsContainer from '../containers/SearchResultsContainer'

export const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={SearchResultsContainer}/>
      <Redirect from="*" to="/" />
    </Router>
  )
}

export default App;