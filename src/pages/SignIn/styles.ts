import styled from 'styled-components/native';

import { normalize } from '../../util';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  background: #312e38;
  padding: 0 30px;
`;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: ${normalize(24)}px;
  color: #f4ede8;
  margin: 64px 0 24px;
`;
