import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './GlobalStyle';
import { RootRouter } from './router';

const getLibrary = (provider: any) => {
  return new Web3Provider(provider);
};

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <RouterProvider router={RootRouter} />
        </Web3ReactProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
