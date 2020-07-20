import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { normalize } from '../../util';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  background: #312e38;
  padding: 0 30px ${Platform.OS === 'android' ? 120 : 40}px;
`;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: ${normalize(24)}px;
  color: #f4ede8;
  margin: 64px 0 24px;
`;

export const BackToSigIn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-top-width: 1px;
  border-top-color: #232129;
  margin-top: auto;
  padding: 16px ${16 + getBottomSpace()}px;
`;

export const BackToSigInText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: ${normalize(16)}px;
  color: #ff9000;
  margin-left: 16px;
`;
