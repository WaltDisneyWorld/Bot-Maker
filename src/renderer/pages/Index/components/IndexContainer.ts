import styled from 'styled-components'

const IndexContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -55%);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  img {
    width: 250px;
    height: 250px;
  }

  div:nth-child(2) h1 {
    font-size: 38px;
  }

  div:nth-child(2) h1 span {
    font-size: 11px;
    color: #989898;
  }

  div:nth-child(2) div {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }

  div:nth-child(2) button {
    margin-right: 10px;
    font-size: 13px;
  }

  div:nth-child(2) button svg {
    width: 13px;
    height: 13px;
  }
`

export default IndexContainer
