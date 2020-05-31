import React from 'react';
import { PageTitle } from '../components/Typography';
import Button from '../components/Button';
import { FlexColumn } from './Login';
import { auth } from '../help/auth';

export default ({ history }) => {
  return (
    <div>
      <FlexColumn>
        <PageTitle>Dashboard</PageTitle>
        <Button onClick={() => history.push('/create-exercise')} text="Create Exercise" />
        <Button onClick={() => history.push('/create-workout')} text="Create Workout" />
      </FlexColumn>
    </div>
  );
};
