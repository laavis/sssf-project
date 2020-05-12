import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import './App.css';

import Input from './components/Input';

const GlobalStyle = createGlobalStyle`
  body, h1, h2, h3, h4, p {
    margin: 0;
    padding: 0;
    font-family: 'Source Sans Pro', monospace;
  }
  p, span, input {
    color: red;
  }
`;

const NavBar = () => (
  <div className="navbar">
    <h3>Task Manager</h3>
    <Link to="/">Current Tasks</Link>
    <Link to="/completed">Completed Tasks</Link>
  </div>
);

const Template = (props) => (
  <div>
    <NavBar />
    <p className="page-info">{props.title}:</p>
    <Input />
    <ul className={props.status}>
      <li>Task 1</li>
      <li>Task 2</li>
      <li>Task 3</li>
    </ul>
  </div>
);

const CurrentTasks = () => <Template title="Current Tasks" status="Current" />;

const CompletedTasks = () => <Template title="Completed Tasks" status="Completed" />;

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <div>
        <Route exact path="/" component={CurrentTasks} />
        <Route path="/completed" component={CompletedTasks} />
      </div>
    </BrowserRouter>
  );
};

export default App;
