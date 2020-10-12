import React from 'react'
import { useHistory } from 'react-router-dom'
import { ReactComponent as PlusSVG } from '@discord-bot-creator/icons/plus.svg'
import { ReactComponent as FolderSVG } from '@discord-bot-creator/icons/folder.svg'

import IndexContainer from './components/IndexContainer'
import Button from '../../components/Button'

import { Projects } from '../../controllers'

import logo from '../../assets/img/logo.png'

export default function IndexPage() {
  document.setTitle('Discord Bot Creator')

  const history = useHistory()

  const projects = new Projects()
  if (projects.working) {
    history.push('/project-panel')
  }

  return (
    <IndexContainer>
      <img src={logo} alt="DBC Logo" />
      <div>
        <h1>
          Discord Bot Creator <span>v{window.env.DBC_VERSION}</span>
        </h1>
        <div>
          <Button purple onClick={() => history.push('/creating-project')}>
            <PlusSVG /> Create Project
          </Button>
          <Button outlined>
            <FolderSVG /> Open Project
          </Button>
        </div>
      </div>
    </IndexContainer>
  )
}
