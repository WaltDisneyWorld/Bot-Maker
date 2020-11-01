import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { ReactComponent as ListSVG } from '@discord-bot-creator/icons/list.svg'
import { ReactComponent as ScheduleSVG } from '@discord-bot-creator/icons/schedule.svg'
import { ReactComponent as CogsSVG } from '@discord-bot-creator/icons/cogs.svg'

import ProjectPanelSections from '../../../../types/ProjectPanelSections'

const ProjectPanelMenuContainer = styled.menu`
  width: 60px;
  height: 100vh;
  background-color: var(--projectPanelMenuBg);

  > div:nth-child(1) {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border-radius: 0 5px 0 0;
    border-bottom: 5px solid var(--purple);
    background-color: var(--projectPanelMenuProjectInfoBg);
  }

  > div:nth-child(1) img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }

  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
  }

  > div:nth-child(2) div {
    cursor: pointer;
    padding: 15px;
    display: flex;
    justify-content: center;
  }

  > div:nth-child(2) div:hover {
    background-color: var(--projectPanelMenuSectionsHoverBg);
  }

  > div:nth-child(2) div svg {
    width: 15px;
    height: 15px;
  }
`

export default function ProjectPanelMenu (props: {
  section?: ProjectPanelSections
}) {
  const { section } = props

  const [projectAvatar, setProjectAvatar] = useState('https://i.imgur.com/3RzaW3Q.png')
  const [projectName, setProjectName] = useState('...')
  const [projectDescription, setProjectDescription] = useState('...')

  const history = useHistory()
  
  useEffect(() => {
    const menuSectionsElems = document.querySelectorAll<HTMLDivElement>(
      '#content > div > menu > div:nth-child(2) div'
    )
    const menuSectionElem = menuSectionsElems[
      section === 'commands'
        ? 0
        : section === 'events'
        ? 1
        : section === 'config'
        ? 2
        : 0
    ]
    if (!menuSectionElem.style.backgroundColor) {
      for (const elem of menuSectionsElems) {
        if (elem.style.backgroundColor) {
          elem.style.backgroundColor = ''
        }
      }
      menuSectionElem.style.backgroundColor = 'var(--projectPanelMenuSectionsActiveBg)'
    }
  }, [section])

  return (
    <ProjectPanelMenuContainer>
      <div>
        <img
          src={projectAvatar}
          alt="Project Avatar"
          title={`Name: ${projectName}\nDescription: ${projectDescription}`}
          onError={(e) =>
            (e.currentTarget.src = 'https://i.imgur.com/3RzaW3Q.png')
          }
        />
      </div>
      <div>
        <div title="Commands" onClick={() => history.push('/project-panel/commands')}>
          <ListSVG />
        </div>
        <div title="Events" onClick={() => history.push('/project-panel/events')}>
          <ScheduleSVG />
        </div>
        <div title="Config" onClick={() => history.push('/project-panel/config')}>
          <CogsSVG />
        </div>
      </div>
    </ProjectPanelMenuContainer>
  )
}
