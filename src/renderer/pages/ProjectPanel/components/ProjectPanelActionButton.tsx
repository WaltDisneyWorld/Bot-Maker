import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignRight } from '@fortawesome/free-solid-svg-icons';

const ProjectPanelActionContainer = styled.div`
  button {
    dispaly: none;
  }
`;

export default function ProjectPanelAction() {
  return (
    <ProjectPanelActionContainer>
      <button>
        <FontAwesomeIcon icon={faAlignRight} />
      </button>
      <button></button>
      <button></button>
      <button></button>
      <button></button>
    </ProjectPanelActionContainer>
  );
}
