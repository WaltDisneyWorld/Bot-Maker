import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Index from './pages/Index'
import CreatingProject from './pages/CreatingProject'
import ProjectPanel from './pages/ProjectPanel'

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/creating-project" component={CreatingProject} />
        <Route
          path="/project-panel"
          render={({ match: { url } }) => (
            <>
              <Route path={url + '/'} exact>
                <ProjectPanel />
              </Route>
              <Route path={url + '/commands'}>
                <ProjectPanel section="commands" />
              </Route>
              <Route path={url + '/events'}>
                <ProjectPanel section="events" />
              </Route>
              <Route path={url + '/config'}>
                <ProjectPanel section="config" />
              </Route>
            </>
          )}
        />
      </Switch>
    </Router>
  )
}
