import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import ProjectPanelSections from '../../../types/ProjectPanelSections'

import ProjectPanelContainer from './components/ProjectPanelContainer'
import ProjectPanelMenu from './components/ProjectPanelMenu'
import ProjectPanelCommands from './components/ProjectPanelCommands'
import ProjectPanelEvents from './components/ProjectPanelEvents'
import ProjectPanelConfig from './components/ProjectPanelConfig'

export default function ProjectPanel () {
  const { section } = useParams<{ section: ProjectPanelSections }>()

  useEffect(() => {
    console.log('a')
  })

  return (
    <ProjectPanelContainer>
      <ProjectPanelMenu section={section} />
      <div>
        {section === 'commands' ? (
          <ProjectPanelCommands />
        ) : section === 'events' ? (
          <ProjectPanelEvents />
        ) : section === 'config' ? (
          <ProjectPanelConfig />
        ) : section === 'welcome' ? (
          <h1>Hello 0</h1>
        ) : ''}
      </div>
    </ProjectPanelContainer>
  )
}
