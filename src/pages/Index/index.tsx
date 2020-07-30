import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFolder } from '@fortawesome/free-solid-svg-icons';

import Index from './components/Index';
import Button from '../../components/Button';

import logo from '../../assets/img/logo.png';

export default function IndexPage() {
  document.setTitle('Discord Bot Creator');

  const history = useHistory();

  return (
    <Index>
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
            <FontAwesomeIcon icon={faPlus} /> Create Project
          </Button>
          <Button outlined>
            <FontAwesomeIcon icon={faFolder} /> Open Project
          </Button>
        </div>
      </div>
    </Index>
  );
}
