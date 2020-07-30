import styled from 'styled-components';

const ProjectPanel = styled.div`
  display: flex;
  flex-direction: row;gigit

  menu {
    width: 250px;
    height: 100vh;
    background-color: var(--dark);
  }

  menu > div:nth-child(1) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  menu div:nth-child(2) div {
    padding: 20px;
    text-align: center;
  }
`;

export default ProjectPanel;
