import styled from 'styled-components/native';

import { normalize } from '../../util';

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  margin-bottom: 8px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-family: 'RobotoSlab-Regular';
  font-size: ${normalize(16)}px;
`;
