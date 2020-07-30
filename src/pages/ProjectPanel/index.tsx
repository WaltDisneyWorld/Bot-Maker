import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFileAlt, 
  faCalendarAlt, 
  faPuzzlePiece, 
  faCogs
 } from '@fortawesome/free-solid-svg-icons';

import ProjectPanel from './components/ProjectPanel';

import { Projects } from '../../controllers/Projects';
import { Bot } from '../../controllers/Bot';

export default function ProjectPanelPage() {
  document.setTitle(
    Projects.working.name + ' - Discord Bot Creator'
  );

  const project = Projects.working;

  return (
    <ProjectPanel>
      <menu>
        <div>
          <img 
            src={Bot.package.avatar} 
            alt="Project Avatar" 
            onError={e => e.currentTarget.src = 'https://i.imgur.com/3RzaW3Q.png'}
          />
          <span>{project.name}</span>
        </div>
        <div>
          <div>
            <FontAwesomeIcon icon={faFileAlt} /> Commands
          </div>
          <div>
            <FontAwesomeIcon icon={faCalendarAlt} /> Events
          </div>
          <div>
            <FontAwesomeIcon icon={faPuzzlePiece} /> Functions
          </div>
          <div>
            <FontAwesomeIcon icon={faCogs} /> Config
          </div>
        </div>
      </menu>
      <div id="menu-project-sections">
        <div>
          dasd
        </div>
        <div style={{ display: 'none' }}>

        </div>
        <div style={{ display: 'none' }}>

        </div>
      </div>
    </ProjectPanel>
  );
}
