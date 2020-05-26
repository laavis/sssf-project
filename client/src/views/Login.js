import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from '../components/Input';
import { PageTitle } from '../components/Typography';
import Button from '../components/Button';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { Link, Redirect, useHistory } from 'react-router-dom';

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const M_LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
    }
  }
`;

export default () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, result] = useMutation(M_LOGIN, {
    onError: (err) => console.log(err),
  });

  let asd;

  useEffect(() => {
    if (result.data) {
    }
  }, [result.data]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginResult = await login({ variables: { email, password } });
      const success = loginResult.data.login.success;
      if (success) {
        history.push('/dashboard');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <PageTitle>Log In</PageTitle>

      <Input type="text" label="Email" onChange={(e) => setEmail(e.target.value)} value={email} />

      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <FlexColumn>
        <Button type="submit" text="Log In" onClick={handleLogin} />
        <Link to="/sign-up">Don't have an account? Sign Up</Link>
      </FlexColumn>
    </div>
  );
};
