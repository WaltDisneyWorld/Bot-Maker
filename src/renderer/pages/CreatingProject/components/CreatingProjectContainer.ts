import styled from 'styled-components'

const CreatingProjectContainer = styled.div`
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

  h1 svg {
    width: 30px;
    height: 30px;
  }

  #field {
    margin-top: 15px;
  }

  #field:nth-child(2) {
    display: flex;
    flex-direction: row;
  }

  #field:nth-child(2) div {
    width: 100%;
  }

  #field:nth-child(2) img {
    width: 50px;
    height: 50px;
    margin-top: 15px;
    margin-left: 15px;
    border-radius: 100%;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }

  #field:nth-child(5) {
    display: flex;
    flex-direction: row;
  }

  #field:nth-child(5) div {
    width: 100%;
  }

  #field:nth-child(5) button {
    width: 130px;
    height: 40px;
    margin-top: 20px;
    margin-left: 10px;
  }

  #field:nth-child(5) button svg {
    width: 14px;
    height: 14px;
  }

  > button {
    width: 100%;
    margin-top: 30px;
    padding: 15px;
  }

  > button svg {
    width: 13px;
    height: 13px;
  }
`

export default CreatingProjectContainer
