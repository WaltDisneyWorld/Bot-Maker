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
    transition: background-color 200ms, color 200ms, border-color 200ms,
      box-shadow 200ms;
  }

  input[type='text']:focus {
    background-color: var(--textInputBgFocus);
    color: var(--textInputColorFocus);
    border-color: var(--textInputBorderColorFocus);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
`

export default TextInput
