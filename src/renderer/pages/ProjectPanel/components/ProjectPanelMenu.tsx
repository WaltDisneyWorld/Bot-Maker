import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ListSVG } from '@discord-bot-creator/icons/list.svg';
import { ReactComponent as ScheduleSVG } from '@discord-bot-creator/icons/schedule.svg';
import { ReactComponent as CogsSVG } from '@discord-bot-creator/icons/cogs.svg';

import Bot from '../../../controllers/Bot';

import Project from '../../../../interfaces/Project';

import ProjectPanelSections from '../../../../types/ProjectPanelSections';

const ProjectPanelMenuContainer = styled.menu`
  width: 250px;
  height: 100vh;
  background-color: var(--projectPanelMenuBg);

  > div:nth-child(1) {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border-radius: 0 5px 0 0;
    background-color: var(--projectPanelMenuProjectInfoBg);
  }

  > div:nth-child(1) img {
    width: 100px;
    height: 100px;
    margin-bottom: 18px;
    border-radius: 100%;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }

  > div:nth-child(1) h3 {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  > div:nth-child(1) p {
    width: 105%;
    margin-top: 15px;
    font-size: 13px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--projectPanelMenuProjectInfoDescColor);
  }

  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-top: 4px solid var(--purple);
  }

  > div:nth-child(2) div {
    cursor: pointer;
    width: 100%;
    padding: 18px;
    font-size: 14.5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transition: background-color 200ms;
  }

  > div:nth-child(2) div:hover {
    background-color: var(--projectPanelMenuSectionsHoverBg);
  }

  > div:nth-child(2) div svg {
    width: 15px;
    height: 15px;
    margin-right: 10px;
  }
`;

export default function ProjectPanelMenu(props: {
  project: Project;
  bot: Bot;
  section?: ProjectPanelSections;
}) {
  const { project, bot, section } = props;

  const history = useHistory();

  useEffect(() => {
    const menuSectionsElems = document.querySelectorAll(
      '#content > div > menu > div:nth-child(2) div'
    );
    menuSectionsElems[
      section === 'commands' ? 
      0 : 
      section === 'events' ? 
      1 : 
      section === 'config' ? 
      2 : 0
    ].setAttribute(
      'style',
      'background-color: var(--projectPanelMenuSectionsActiveBg);'
    );
  }, [section]);

  return (
    <ProjectPanelMenuContainer>
      <div>
        <img 
          src={bot.storage.config.avatar} 
          alt="Project Avatar" 
          onError={
            e => e.currentTarget.src = 'https://i.imgur.com/3RzaW3Q.png'
          }
        />
        <h3 title={project.name}>
          {project.name}
        </h3>
        <p title={bot.storage.config.description}>
          {bot.storage.config.description}
        </p>
      </div>
      <div>
        <div
          onClick={
            () => history.push('/project-panel/commands')
          }
        >
          <ListSVG /> Commands
        </div>
        <div
          onClick={
            () => history.push('/project-panel/events')
          }
        >
          <ScheduleSVG /> Events
        </div>
        <div
          onClick={
            () => history.push('/project-panel/config')
          }
        >
          <CogsSVG /> Config
        </div>
      </div>
    </ProjectPanelMenuContainer>
  );
}