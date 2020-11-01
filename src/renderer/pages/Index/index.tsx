import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ReactComponent as PlusSVG } from '@discord-bot-creator/icons/plus.svg'
import { ReactComponent as FolderSVG } from '@discord-bot-creator/icons/folder.svg'

import { Projects } from '../../controllers'

import IndexContainer from './components/IndexContainer'
import Button from '../../components/Button'

import logo from '../../assets/img/logo.png'

export default function IndexPage () {
  document.setTitle('Discord Bot Creator')

  const history = useHistory()

  useEffect(() => {
    async function checkIfHaveWorkingProject () {
      if (await Projects.getWorking()) {
        history.push('/project-panel')
      }
    }
    checkIfHaveWorkingProject()
  })

  return (
    <IndexContainer>
      <img src={logo} alt="DBC Logo" />
      <div>
        <h1>
          Discord Bot Creator <span></span>
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
