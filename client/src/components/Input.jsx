import React from 'react';
import styled from 'styled-components';

const Field = styled.div`
  background: palevioletred;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 12px;
`;

const Input = styled.input`
  border: none;
  border-radius: 4px;
  min-height: 32px;
  padding: 0 8px;
  flex: 1;
`;

export default () => {
  return (
    <Field>
      <Label>Username</Label>
      <Input type="text" placeholder="moromoro" />
    </Field>
  );
};
