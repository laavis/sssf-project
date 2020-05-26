import React from 'react';
import { BrowserRouter, Route, useHistory } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import './App.css';

import Login from './views/Login';
import Dashboard from './views/Dashboard';

const GlobalStyle = createGlobalStyle`
  body, h1, h2, h3, h4, p {
    margin: 0;
    padding: 0;
    font-family: 'Source Sans Pro', monospace;
  }
`;

const Main = styled.main`
  padding: 20vh 24px 24px 24px;
`;

const Wrapper = styled.div`
  max-width: 411px;
  margin: 0 auto;
`;

const App = (props) => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Main>
        <Wrapper>
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          {/* <Route path="/sign-up" component={SignUp} /> */}
        </Wrapper>
      </Main>
    </BrowserRouter>
  );
};

// <Route exact path="/" component={CurrentTasks} />
// <Route path="/completed" component={CompletedTasks} />

export default App;
