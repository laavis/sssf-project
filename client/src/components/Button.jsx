import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: #a6abf0;
  border: 1px solid black;
  width: fit-content;
  padding: 4px 12px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:active {
    background: #8589c5;
  }
`;

export default (props) => {
  return (
    <Button type={props.type} onClick={props.onClick}>
      {props.text}
    </Button>
  );
};
