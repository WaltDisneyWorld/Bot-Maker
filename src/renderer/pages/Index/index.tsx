import React from 'react';
import { useHistory } from 'react-router-dom';

import IndexContainer from './components/IndexContainer';
import Button from '../../components/Button';

import { Projects } from '../../controllers';

import logo from '../../assets/img/logo.png';

export default function IndexPage() {
  document.setTitle('Discord Bot Creator');

  const history = useHistory();

  const projects = new Projects();
  if (projects.working) {
    history.push('/project-panel');
  }

  return (
    <IndexContainer>
      <img 
        src={logo} 
        alt="DBC Logo"
      />
      <div>
        <h1>
          Discord Bot Creator
        </h1>
        <div>
          <Button
            purple
            onClick={() => history.push('/creating-project')}
          >
            Create Project
          </Button>
          <Button outlined>
            Open Project
          </Button>
        </div>
      </div>
    </IndexContainer>
  );
}
