import React from 'react';
import { BrowserRouter, Route, Link, useHistory } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { PageTitle } from '../components/Typography';
import Button from '../components/Button';
import { FlexColumn } from './Login';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import { gql } from 'apollo-boost';

const difficulties = [
  {
    name: 'Beginner',
    value: 'beginner',
  },
  {
    name: 'Intermediate',
    value: 'intermediate',
  },
  {
    name: 'Advanced',
    value: 'advanced',
  },
];

const types = [
  {
    name: 'Push',
    value: 'push',
  },
  {
    name: 'Pull',
    value: 'pull',
  },
];

const targets = [
  {
    name: 'Chest',
    value: 'chest',
  },
  {
    name: 'Back',
    value: 'back',
  },
  {
    name: 'Shoulders',
    value: 'shoulders',
  },
  {
    name: 'Biceps',
    value: 'biceps',
  },
  {
    name: 'Legs',
    value: 'legs',
  },
  {
    name: 'Glutes',
    value: 'glutes',
  },
  {
    name: 'Triceps',
    value: 'triceps',
  },
  {
    name: 'Abs',
    value: 'abs',
  },
];

const M_CREATE_EXERCISE = gql`
  mutation createExercise(
    $name: String!
    $description: String
    $type: String
    $difficulty: String
    $target: String!
  ) {
    createExercise(name: $name, type: $type, difficulty: $difficulty, target: $target) {
      id
      name
    }
  }
`;

export default () => {
  return (
    <div>
      <FlexColumn>
        <PageTitle>Create Exercise</PageTitle>
        <div>
          <Input label="Name" />
          <textarea placeholder="description"></textarea>
          {<Dropdown title="Choose difficulty" items={difficulties} />}
          {<Dropdown title="Choose type" items={types} />}
          {<Dropdown title="Choose target" items={targets} />}
        </div>
      </FlexColumn>
      <Button text="Create" />
    </div>
  );
};
