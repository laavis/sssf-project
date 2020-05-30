import React from 'react';
import { BrowserRouter, Route, useHistory } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import './App.css';

import Login from './views/Login';
import Dashboard from './views/Dashboard';
import CreateExercise from './views/CreateExercise';

const GlobalStyle = createGlobalStyle`
  body, h1, h2, h3, h4, p {
    margin: 0;
    padding: 0;
    font-family: 'Source Sans Pro', sans-serif;
  }

  h2 {
    font-weight: 800;
    font-family: 'Open Sans', sans-serif;
    margin-bottom: 20px;
  }
`;

const Main = styled.main`
  padding: 20vh 24px 24px 24px;
`;

const Wrapper = styled.div`
  max-width: 411px;
  margin: 0 auto;
`;

const App = props => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Main>
        <Wrapper>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Dashboard} />
          <Route path="/create-exercise" component={CreateExercise} />
          {/* <Route path="/sign-up" component={SignUp} /> */}
        </Wrapper>
      </Main>
    </BrowserRouter>
  );
};

// <Route exact path="/" component={CurrentTasks} />
// <Route path="/completed" component={CompletedTasks} />

export default App;
