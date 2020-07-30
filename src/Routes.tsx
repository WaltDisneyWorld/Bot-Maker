import React from 'react';
import { 
  BrowserRouter as Router,
  Route, 
  Switch
} from 'react-router-dom';

import IndexPage from './pages/Index';
import CreatingProjectPage from './pages/CreatingProject';
import ProjectPanelPage from './pages/ProjectPanel';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route 
          path="/" 
          exact
          component={IndexPage}
        />
        <Route 
          path="/creating-project"
          component={CreatingProjectPage}
        />
        <Route
          path="/project-panel"
          component={ProjectPanelPage}
        />
      </Switch>
    </Router>
  );
}
