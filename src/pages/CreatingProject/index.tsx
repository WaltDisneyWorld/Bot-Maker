import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCube, 
  faSearch, 
  faPlus 
} from '@fortawesome/free-solid-svg-icons';

import CreatingProject from './components/CreatingProject';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

import { Projects } from '../../controllers/Projects';
import { Bot } from '../../controllers/Bot';

import LoadingScreen from '../../utils/LoadingScreen';

const { dialog } = window.require('electron').remote;

export default function CreatingProjectPage() {
  document.setTitle('Creating Project | Discord Bot Creator');

  const [projectAvatar, setProjectAvatar] = useState(
    'https://i.imgur.com/3RzaW3Q.png'
  );
  const [projectName, setProjectName] = useState('My DBC Project');
  const [projectDescription, setProjectDescription] = useState(
    'A cool Discord Bot created with DBC :)'
  );
  const [projectPath, setProjectPath] = useState('');

  const history = useHistory();

  async function handleSearchPath() {
    const pathResult = await dialog.showOpenDialog({
      properties: ['openDirectory']
    });
    if (pathResult.canceled) return;

    setProjectPath(pathResult.filePaths[0]);
  }

  async function handleCreateProject(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.persist();

    if (!projectPath) {
      return await dialog.showMessageBox(
        window.mainWindow,
        {
          type: 'warning',
          title: 'Hey!',
          message: 'You need to put a valid path to create your project.'
        }
      );
    }
    
    const createProjectBtn = e.currentTarget;
    createProjectBtn.setAttribute('disabled', '');

    const loadingScreen = new LoadingScreen('Creating Project...');

    try {
      await Projects.create(
        projectName || 'My DBC Project',
        projectPath
      );
      await Bot.editPackage({
        avatar: projectAvatar || 'https://i.imgur.com/3RzaW3Q.png',
        description: projectDescription || 'A cool Discord Bot created with DBC :)'
      });
      history.push('/project-panel');
      loadingScreen.close();
    } catch (err) {
      setTimeout(() => {
        switch (err) {
          case 'INVALID_PATH':
            dialog.showMessageBox(
              window.mainWindow,
              {
                type: 'warning',
                title: 'Hey!',
                message: 'You need to put a valid path to create your project.'
              }
            );
            break;
          case 'PATH_ALREADY_IN_USE':
            dialog.showMessageBox(
              window.mainWindow,
              {
                type: 'warning',
                title: 'Hey!',
                message: 'The selected path is already in use.'
              }
            );
            break;
          case 'PROJECT_ALREADY_EXISTS':
            dialog.showMessageBox(
              window.mainWindow,
              {
                type: 'warning',
                title: 'Hey!',
                message: 'The selected name or path already exists as a DBC project.'
              }
            );
            break;
          case 'FAILED_TO_INSTALL_PROJECT_DEPENDENCIES':
            dialog.showMessageBox(
              window.mainWindow,
              {
                type: 'warning',
                title: 'Hey!',
                message: 'Not was possible install project dependencies! Check if your connnection is ok'
              }
            );
            break;
          default:
            break;
        }

        createProjectBtn.removeAttribute('disabled');
        loadingScreen.close();
      }, 500);
    }
  }

  return (
    <CreatingProject>
      <h1>
        <FontAwesomeIcon icon={faCube} /> Creating Project
      </h1>
      <div id="text-input">
        <TextInput>
          <label htmlFor="project-avatar">
            Avatar URL
          </label>
          <input 
            id="project-avatar" 
            type="text"
            defaultValue={projectAvatar}
            placeholder="Avatar of your project... Default: https://i.imgur.com/3RzaW3Q.png"
            onChange={e => setProjectAvatar(e.target.value)}
          />
        </TextInput>
        <img 
          src={projectAvatar} 
          alt="Project Avatar"
          onError={e => e.currentTarget.src = 'https://i.imgur.com/3RzaW3Q.png'}
        />
      </div>
      <TextInput id="text-input">
        <label htmlFor="project-projectName">Name</label>
        <input 
          id="project-projectName" 
          type="text"
          defaultValue={projectName}
          placeholder="Name of your project... Default: My DBC Project"
          onChange={e => setProjectName(e.target.value)}
        />
      </TextInput>
      <TextInput id="text-input">
        <label htmlFor="project-description">
          Description
        </label>
        <input 
          id="project-description" 
          type="text"
          defaultValue={projectDescription}
          placeholder="Description of your project... Default: A cool Discord Bot created with DBC :)"
          onChange={e => setProjectDescription(e.target.value)}
        />
      </TextInput>
      <div id="text-input">
        <TextInput>
          <label htmlFor="project-projectPath">
            Path <span style={{ color: 'var(--red)' }}>*</span>
          </label>
          <input 
            id="project-projectPath" 
            type="text"
            value={projectPath}
            placeholder="Path to create your project..."
            required
            onChange={e => setProjectPath(e.target.value)}
          />
        </TextInput>
        <Button 
          outlined 
          white 
          onClick={handleSearchPath}
        >
          <FontAwesomeIcon icon={faSearch} /> Search
        </Button>
      </div> 
      <Button
        green 
        onClick={handleCreateProject}
      >
        <FontAwesomeIcon icon={faPlus} /> Create Project
      </Button>
    </CreatingProject>
  );
}
