import styled from 'styled-components/native'
import { Platform } from "react-native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
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


