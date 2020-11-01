import styled from 'styled-components'

const TextInput = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-left: 10px;
    margin-bottom: 8px;
    font-size: 11px;
    font-weight: bold;
    color: #dedede;
  }

  input[type='text'] {
    width: 100%;
    padding: 10px;
    background-color: var(--textInputBg);
    color: var(--textInputColor);
    border: 2px solid var(--textInputBorderColor);
    border-radius: 3px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }

  input[type='text']:focus {
    background-color: var(--textInputBgFocus);
    color: var(--textInputColorFocus);
    border-color: var(--textInputBorderColorFocus);
  }
`

export default TextInput
