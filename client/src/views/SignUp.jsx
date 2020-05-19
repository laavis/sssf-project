import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from '../components/Input';
import { PageTitle } from '../components/Typography';

import { FlexColumn } from './Login';

export default () => {
  return (
    <div>
      <PageTitle>Sign Up</PageTitle>

      <Input type="text" label="Email" onChange={(e) => setEmail(e.target.value)} value={email} />

      <Input
        type="text"
        label="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={email}
      />

      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Input
        type="password"
        label="Re-Password"
        value={password}
        onChange={(e) => setRePassword(e.target.value)}
      />
    </div>
  );
};
