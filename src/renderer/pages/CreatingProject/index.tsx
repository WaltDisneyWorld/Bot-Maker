import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { remote } from 'electron'
import { ReactComponent as CubeSVG } from '@discord-bot-creator/icons/cube.svg'
import { ReactComponent as SearchSVG } from '@discord-bot-creator/icons/search.svg'
import { ReactComponent as PlusSVG } from '@discord-bot-creator/icons/plus.svg'

import CreatingProjectContainer from './components/CreatingProjectContainer'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'

import { Projects, Bot } from '../../controllers'

import { LoadingScreen, Dialog } from '../../utils'

const { dialog } = remote

export default function CreatingProjectPage() {
  document.setTitle('Creating Project | Discord Bot Creator')

  const [projectAvatar, setProjectAvatar] = useState(
    'https://i.imgur.com/3RzaW3Q.png'
  )
  const [projectName, setProjectName] = useState('My DBC Project')
  const [projectDescription, setProjectDescription] = useState(
    'A cool Discord Bot created with DBC :)'
  )
  const [projectPath, setProjectPath] = useState('')

  const history = useHistory()

  async function handleSearchPath() {
    const pathResult = await dialog.showOpenDialog({
      properties: ['openDirectory']
    })
    if (pathResult.canceled) return
    setProjectPath(pathResult.filePaths[0])
  }

  async function handleCreateProject(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.persist()

    if (!projectPath) {
      return Dialog.create(
        'Hey!',
        'You need to put a valid path to create your project.'
      )
    }

    const createProjectBtn = e.currentTarget
    createProjectBtn.setAttribute('disabled', '')

    const loadingScreen = new LoadingScreen()
    await loadingScreen.create('Creating Project...')

    try {
      const projects = new Projects()
      await projects.create(projectName || 'My DBC Project', projectPath)
      const bot = new Bot(projectName || 'My DBC Project')
      await bot.editConfig({
        avatar: projectAvatar,
        description: projectDescription
      })

      history.push('/project-panel')
      loadingScreen.close()
    } catch (err) {
      createProjectBtn.removeAttribute('disabled')
      await loadingScreen.close()

      switch (err) {
        case 'INVALID_PATH':
          Dialog.create(
            'Hey!',
            'You need to put a valid path to create your project.'
          )
          break
        case 'PATH_ALREADY_IN_USE':
          Dialog.create('Hey!', 'The selected path is already in use.')
          break
        case 'PROJECT_ALREADY_EXISTS':
          Dialog.create(
            'Hey!',
            'The selected name already exists as a DBC project.'
          )
          break
        case 'FAILED_TO_INSTALL_PROJECT_DEPENDENCIES':
          Dialog.create(
            'Hey!',
            'Could not install project dependencies! Make sure your connection is ok.'
          )
          break
        default:
          break
      }
    }
  }

  return (
    <CreatingProjectContainer>
      <h1>
        <CubeSVG /> Creating Project
      </h1>
      <div id="field">
        <TextInput>
          <label htmlFor="project-avatar">Avatar URL</label>
          <input
            id="project-avatar"
            type="text"
            defaultValue={projectAvatar}
            placeholder="Avatar of your project..."
            onChange={(e) => setProjectAvatar(e.target.value)}
          />
        </TextInput>
        <img
          src={projectAvatar}
          alt="Project Avatar"
          onError={(e) =>
            (e.currentTarget.src = 'https://i.imgur.com/3RzaW3Q.png')
          }
        />
      </div>
      <TextInput id="field">
        <label htmlFor="project-name">Name</label>
        <input
          id="project-name"
          type="text"
          defaultValue={projectName}
          placeholder="Name of your project..."
          onChange={(e) => setProjectName(e.target.value)}
        />
      </TextInput>
      <TextInput id="field">
        <label htmlFor="project-description">Description</label>
        <input
          id="project-description"
          type="text"
          defaultValue={projectDescription}
          placeholder="Description of your project..."
          onChange={(e) => setProjectDescription(e.target.value)}
        />
      </TextInput>
      <div id="field">
        <TextInput>
          <label htmlFor="project-path">
            Path <span style={{ color: 'var(--red)' }}>*</span>
          </label>
          <input
            id="project-path"
            type="text"
            value={projectPath}
            placeholder="Path to create your project..."
            required
            onChange={(e) => setProjectPath(e.target.value)}
          />
        </TextInput>
        <Button outlined white onClick={handleSearchPath}>
          <SearchSVG /> Search
        </Button>
      </div>
      <Button green onClick={handleCreateProject}>
        <PlusSVG /> Create Project
      </Button>
    </CreatingProjectContainer>
  )
}
