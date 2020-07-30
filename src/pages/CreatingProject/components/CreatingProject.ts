import styled from 'styled-components';

const CreatingProject = styled.div`
  width: 80%;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -55%);

  h1 {
    margin-bottom: 20px;
    font-size: 40px;
    text-align: center;
  }

  #text-input {
    margin-top: 15px;
  }

  #text-input:nth-child(2) {
    display: flex;
    flex-direction: row;
  }

  #text-input:nth-child(2) div {
    width: 100%;
  }

  #text-input:nth-child(2) img {
    width: 50px;
    height: 50px;
    margin-top: 15px;
    margin-left: 15px;
    border-radius: 100%;
  }

  #text-input:nth-child(5) {
    display: flex;
    flex-direction: row;
  }

  #text-input:nth-child(5) div {
    width: 100%;
  }

  #text-input:nth-child(5) button {
    width: 130px;
    height: 40px;
    margin-top: 20px;
    margin-left: 10px;
  }

  > button {
    width: 100%;
    height: 43px;
    margin-top: 30px;
  }
`;

export default CreatingProject;
