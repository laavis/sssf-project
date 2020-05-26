import React from 'react';
import styled from 'styled-components';

const Field = styled.div`
  padding: 16px 0;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 0.2px;
  margin-bottom: 6px;
  color: #383838;
`;

const Input = styled.input`
  border: none;
  border-radius: 34px;
  min-height: 42px;
  padding: 0 14px;
  flex: 1;
  background: #f3f3f5;
  font-size: 14px;
  transition: box-shadow 180ms ease-in-out;
  &:focus {
    outline: none !important;
    box-shadow: 0 0 0 1px #a6abf0;
  }
`;

export default (props) => {
  return (
    <Field>
      <Label>{props.label}</Label>
      <Input
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
      />
    </Field>
  );
};
