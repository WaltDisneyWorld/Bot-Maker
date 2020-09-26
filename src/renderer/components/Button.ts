import styled from 'styled-components'

const Button = styled.button<{
  outlined?: any
  white?: any
  green?: any
  purple?: any
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 18px;
  font-weight: bold;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  ${(props) =>
    props.outlined
      ? `
      background: transparent; 
      color: ${
        props.white
          ? 'var(--buttonWhite)'
          : props.green
          ? 'var(--buttonGreen)'
          : props.purple
          ? 'var(--buttonPurple)'
          : 'var(--buttonPink)'
      }; 
      border: 1px solid ${
        props.white
          ? 'var(--buttonWhite)'
          : props.green
          ? 'var(--buttonGreen)'
          : props.purple
          ? 'var(--buttonPurple)'
          : 'var(--buttonPink)'
      };

      svg {
        fill: ${
          props.white
            ? 'var(--buttonWhite)'
            : props.green
            ? 'var(--buttonGreen)'
            : props.purple
            ? 'var(--buttonPurple)'
            : 'var(--buttonPink)'
        }; 
      }
    `
      : ` 
      background-color: ${
        props.white
          ? 'var(--buttonWhite)'
          : props.green
          ? 'var(--buttonGreen)'
          : props.purple
          ? 'var(--buttonPurple)'
          : 'var(--buttonPink)'
      }; 
      color: ${
        props.white
          ? 'var(--buttonWhiteContentColor)'
          : 'var(--buttonContentColor)'
      };

      svg {
        fill: ${
          props.white
            ? 'var(--buttonWhiteContentColor)'
            : 'var(--buttonContentColor)'
        };
      }
    `}
  transition: background-color 100ms, color 100ms, box-shadow 100ms;

  ${(props) =>
    props.outlined
      ? `
      :hover {
        background-color: ${
          props.white
            ? 'var(--buttonWhite)'
            : props.green
            ? 'var(--buttonGreen)'
            : props.purple
            ? 'var(--buttonPurple)'
            : 'var(--buttonPink)'
        };
        color: ${
          props.white
            ? 'var(--buttonWhiteContentColorHover)'
            : 'var(--buttonContentColorHover)'
        };
      }

      :hover > svg {
        fill: ${
          props.white
            ? 'var(--buttonWhiteContentColorHover)'
            : 'var(--buttonContentColorHover)'
        };
      }
    `
      : `
      :hover {
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
      }

      :active {
        background-color: ${
          props.white
            ? 'var(--buttonWhiteActive)'
            : props.green
            ? 'var(--buttonGreenActive)'
            : props.purple
            ? 'var(--buttonPurpleActive)'
            : 'var(--buttonPinkActive)'
        };
        color: ${
          props.white
            ? 'var(--buttonWhiteContentColorActive)'
            : 'var(--buttonContentColorActive)'
        };
      }

      :active > svg {
        fill: ${
          props.white
            ? 'var(--buttonWhiteContentColorActive)'
            : 'var(--buttonContentColorActive)'
        };
      }
    `}

  svg {
    margin-right: 10px;
    transition: fill 100ms;
  }
`

export default Button
