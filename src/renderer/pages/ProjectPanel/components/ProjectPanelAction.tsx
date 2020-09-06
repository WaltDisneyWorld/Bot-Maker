import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignRight } from '@fortawesome/free-solid-svg-icons';

const ProjectPanelActionContainer = styled.div`
`;

export default function ProjectPanelAction() {
  return (
    <ProjectPanelActionContainer>
      <button>
        <FontAwesomeIcon icon={faAlignRight} />
      </button>
      <div>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
      </div>
    </ProjectPanelActionContainer>
  );
}
