import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  border: 1px solid black;
  padding: 4px 12px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;

  background-color: ${props => (props.secondary ? 'transparent' : '#a6abf0')};
  margin-top: 8px;

  &:first-of-type {
    margin-top: 0;
  }

  &:focus {
    outline: none;
  }

  &:active {
    background: #8589c5;
  }
`;

export default props => {
  return (
    <Button secondary={props.secondary} actionType={props.actionType} onClick={props.onClick}>
      {props.text}
    </Button>
  );
};
