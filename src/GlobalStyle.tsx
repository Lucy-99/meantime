import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`${reset}
*{
    box-sizing: border-box;
}

#root {
    width: 100%;
    height: 100vh;
}

body{
    width: 100%;
    height: 100%;
} 

`;

const colors = {
  main: '#26a69a',
  border: '#E4E4E7',
};

export const theme = {
  colors,
};
