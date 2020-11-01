import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Index from './pages/Index'
import CreatingProject from './pages/CreatingProject'
import ProjectPanel from './pages/ProjectPanel'

export default function Routes () {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/creating-project" component={CreatingProject} />
        <Route path="/project-panel/:section" exact component={ProjectPanel} />
      </Switch>
    </Router>
  )
}
