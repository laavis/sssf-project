import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { PageTitle } from '../components/Typography';
import Button from '../components/Button';
import { FlexColumn } from './Login';
import Input from '../components/Input';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { difficulties, targets, types } from '../help/data';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;

  > * {
    margin-bottom: 20px;
  }
`;

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

const TitleInput = styled.input`
  padding: 10px 20px;
  border: none;
  border-radius: 2px;
  border-bottom: 6px solid #262626;
  font-size: 24px;
  font-weight: 800;
  font-family: 'Open Sans', sans-serif;
  
    &:focus {
    outline: none !important;
    border-top: 2px solid #262626;
    border-left: 2px solid #262626;
    border-right: 2px solid #262626;    
  }
}

  &::placeholder {
    color: #c3c5db;
  }
`;

export default () => {
  const history = useHistory();
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
        <TitleInput placeholder="Name" />
        <FormWrapper>
          <Input label="Name" value={name} onChange={e => setName(e.target.value)} />
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
        <Button secondary={true} text="Cancel" onClick={() => history.push('/')} />
      </FlexColumn>
    );
  };

  return <div>{onSuccess ? successComponent() : formComponent()}</div>;
};
