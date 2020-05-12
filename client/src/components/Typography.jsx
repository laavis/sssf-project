import styled from 'styled-components';
import { colors } from '../../helpers/colors';

const headingStyles = `
  font-family: 'Open Sans', sans-serif;
`;

const textStyles = `
  font-family: 'Inter', sans-serif;
`;

export const Title = styled.span`
  ${headingStyles};
  font-size: 1.5rem;
  letter-spacing: 4px;
  color: ${colors.main};
`;

export const SectionHeader = styled.span`
  ${headingStyles};
  font-size: 1.125rem;
  letter-spacing: 2px;
`;

export const Text = styled.p`
  ${textStyles};
`;
