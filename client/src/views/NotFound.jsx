import React from 'react';
import { BrowserRouter, Route, Link, useHistory } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { PageTitle } from '../components/Typography';
import Button from '../components/Button';
import { FlexColumn } from './Login';

export default () => {
  const history = useHistory();

  return (
    <div>
      <h1>404! NOT FOUND :(</h1>
    </div>
  );
};
