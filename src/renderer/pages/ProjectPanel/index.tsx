import React from 'react'

import ProjectPanelContainer from './components/ProjectPanelContainer'
import ProjectPanelMenu from './components/ProjectPanelMenu'
import ProjectPanelCommands from './components/ProjectPanelCommands'
import ProjectPanelEvents from './components/ProjectPanelEvents'
import ProjectPanelConfig from './components/ProjectPanelConfig'

import ProjectPanelSections from '../../../types/ProjectPanelSections'

import { Projects, Bot } from '../../controllers'

export default function ProjectPanel(props: {
  section?: ProjectPanelSections
}) {
  const { section } = props

  const project = new Projects().working
  const bot = new Bot(project.name)

  document.setTitle(project.name + ' - Discord Bot Creator')

  return (
    <ProjectPanelContainer>
      <ProjectPanelMenu project={project} bot={bot} section={section} />
      <div>
        {section === 'commands' ? (
          <ProjectPanelCommands />
        ) : section === 'events' ? (
          <ProjectPanelEvents />
        ) : section === 'config' ? (
          <ProjectPanelConfig />
        ) : (
          <h1>Hello 0</h1>
        )}
      </div>
    </ProjectPanelContainer>
  )
}
