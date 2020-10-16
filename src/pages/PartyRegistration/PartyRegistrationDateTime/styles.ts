import styled from 'styled-components/native';
import { Platform } from "react-native";
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding:0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #96A7AF;
  font-family: RobotoSlab_500Medium;
  margin: 20px 0 24px;
`;


export const BackToHome = styled.TouchableOpacity`
  margin: 50px 0 0 0;
  margin-right: 90%
`;


export const ButtonDateTime = styled(RectButton)`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  border-width: 2px;
  border-color: #233129;
`;

export const ButtonDateTimeText = styled.Text`
  flex: 1;
  color: #fff4;
  font-family: 'RobotoSlab_400Regular';
`;


