import React, { useState } from 'react';
import { BrowserRouter, Route, Link, useHistory } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { PageTitle } from '../components/Typography';
import Button from '../components/Button';
import { FlexColumn } from './Login';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;

  > * {
    margin-bottom: 20px;
  }
`;

const difficulties = [
  {
    id: 1,
    name: 'Beginner',
    value: 'beginner',
  },
  {
    id: 2,
    name: 'Intermediate',
    value: 'intermediate',
  },
  {
    id: 3,
    name: 'Advanced',
    value: 'advanced',
  },
];

const types = [
  {
    id: 1,
    name: 'Push',
    value: 'push',
  },
  {
    id: 2,
    name: 'Pull',
    value: 'pull',
  },
];

const targets = [
  {
    id: 1,
    name: 'Chest',
    value: 'chest',
  },
  {
    id: 2,
    name: 'Back',
    value: 'back',
  },
  {
    id: 3,
    name: 'Shoulders',
    value: 'shoulders',
  },
  {
    id: 4,
    name: 'Biceps',
    value: 'biceps',
  },
  {
    id: 5,
    name: 'Legs',
    value: 'legs',
  },
  {
    id: 6,
    name: 'Glutes',
    value: 'glutes',
  },
  {
    id: 7,
    name: 'Triceps',
    value: 'triceps',
  },
  {
    id: 8,
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
    createExercise(
      name: $name
      description: $description
      type: $type
      difficulty: $difficulty
      target: $target
    ) {
      name
    }
  }
`;

const ReviewCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 16px;
  border-radius: 4px;
  border: 2px solid #a6abf0;
`;

const ReviewCardItem = styled.div`
  margin-bottom: 8px;

  span {
    padding: 2px 4px;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 0.2px;
    background: #f3f3f5;
  }

  p {
    margin-top: 6px;
  }
`;

export default () => {
  const [name, setName] = useState('');
  const [description, setDesctiption] = useState('');
  const [difficulty, setDifficulty] = useState(null);
  const [target, setTarget] = useState(null);
  const [type, setType] = useState(null);
  const [onSuccess, setOnSuccess] = useState(false);

  const [createExercise, result] = useMutation(M_CREATE_EXERCISE, {
    onError: err => console.error(err),
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const submitResult = await createExercise({
        variables: { name, description, difficulty, type, target },
      });
      const result = submitResult.data.createExercise.name;
      console.log(result);

      if (result) setOnSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  const successComponent = () => {
    return (
      <ReviewCard>
        <h2>{name}</h2>
        <ReviewCardItem>
          <span>Description</span>
          <p>{description}</p>
        </ReviewCardItem>
        <ReviewCardItem>
          <span>Target</span>
          <p>{target}</p>
        </ReviewCardItem>
        <ReviewCardItem>
          <span>Type</span>
          <p>{type}</p>
        </ReviewCardItem>
      </ReviewCard>
    );
  };

  const formComponent = () => {
    return (
      <FlexColumn>
        <PageTitle>Create Exercise</PageTitle>
        <Input label="Name" value={name} onChange={e => setName(e.target.value)} />
        <FormWrapper>
          <textarea
            placeholder="description"
            value={description}
            onChange={e => setDesctiption(e.target.description)}
          ></textarea>
          <select onClick={e => setDifficulty(e.target.value)}>
            {difficulties.map(difficulty => (
              <option key={difficulty.id} value={difficulty.value}>
                {difficulty.name}
              </option>
            ))}
          </select>
          <select onClick={e => setType(e.target.value)}>
            {types.map(type => (
              <option key={type.id} value={type.value}>
                {type.name}
              </option>
            ))}
          </select>
          <select onClick={e => setTarget(e.target.value)}>
            {targets.map(target => (
              <option key={target.id} value={target.value}>
                {target.name}
              </option>
            ))}
          </select>
        </FormWrapper>
        <Button text="Create" onClick={handleSubmit} />
      </FlexColumn>
    );
  };

  return <div>{onSuccess ? successComponent() : formComponent()}</div>;
};
