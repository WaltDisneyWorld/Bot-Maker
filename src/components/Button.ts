import styled from 'styled-components';

const Button = styled.button<{ 
  outlined?: any; 
  white?: any;
  green?: any;
  purple?: any;
}>`
  padding: 10px 18px;
  text-align: center;
  font-weight: bold;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  ${props => (
    props.outlined ? `
      background: transparent; 
      color: ${
        props.white ? 
        'var(--white)' : 
        props.green ? 
        'var(--green)' : 
        props.purple ?
        'var(--purple)' :
        'var(--pink)'
      }; 
      border: 1px solid ${
        props.white ? 
        'var(--white)' : 
        props.green ? 
        'var(--green)' : 
        props.purple ?
        'var(--purple)' :
        'var(--pink)'
      };
    ` : ` 
      background-color: ${
        props.white ? 
        'var(--white)' : 
        props.green ? 
        'var(--green)' : 
        props.purple ?
        'var(--purple)' :
        'var(--pink)'
      }; 
      color: #000;
    `
  )}
  transition: background-color 200ms, color 200ms, box-shadow 200ms;

  ${props => (
    props.outlined ? `
      :hover {
        background-color: ${
          props.white ? 
          'var(--white)' : 
          props.green ? 
          'var(--green)' : 
          props.purple ?
          'var(--purple)' :
          'var(--pink)'
        };
        color: #000;
      }
    ` : `
      :hover {
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
      }

      :active {
        background-color: ${
          props.white ? 
          'var(--whiteDark)' : 
          props.green ? 
          'var(--greenDark)' : 
          props.purple ?
          'var(--purpleDark)' :
          'var(--pinkDark)'
        };

        color: ${
          props.white ? 
          '#000' :
          'var(--white)'
        };
      }
    `
  )}
  
  svg {
    margin-right: 5px;
  }
`;

export default Button;
