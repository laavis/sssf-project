import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FlexColumn } from './Login';
import { PageTitle } from '../components/Typography';
import { FormWrapper } from '../views/CreateExercise';
import Input from '../components/Input';
import { difficulties, targets, categories } from '../help/data';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const Q_EXERCISES = gql`
  {
    getExercises {
      name
    }
  }
`;

export default () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [description, setDesctiption] = useState('');
  const [difficulty, setDifficulty] = useState(null);
  const [target, setTarget] = useState(null);
  const [category, setCategory] = useState(null);
  const [onSuccess, setOnSuccess] = useState(false);

  const { loading, error, data } = useQuery(Q_EXERCISES);

  if (loading) return 'loading...';
  if (error) return `Error! ${error.message}`;
  /*const [createWorkout, result] = useMutation(M_CREATE_EXERCISE, {
    onError: err => console.error(err),
  }); */

  return (
    <FlexColumn>
      <PageTitle>Create Workout</PageTitle>
      <FormWrapper>
        <Input label="Name" value={name} onChange={e => setName(e.target.value)} />
        <input name="anon" type="checkbox" />
        <label for="anon">Anonymous</label>
        <select onClick={e => setDifficulty(e.target.value)}>
          {difficulties.map(difficulty => (
            <option key={difficulty.id} value={difficulty.value}>
              {difficulty.name}
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
        <select onClick={e => setCategory(e.target.value)}>
          {categories.map(category => (
            <option key={category.id} value={category.value}>
              {category.name}
            </option>
          ))}
        </select>
        <div>
          {data.getExercises.map(ex => (
            <h3>{ex.name}</h3>
          ))}
        </div>
      </FormWrapper>
    </FlexColumn>
  );
};
