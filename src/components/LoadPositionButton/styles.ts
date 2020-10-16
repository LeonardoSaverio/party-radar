import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px;
`;

export const ButtonText = styled.Text`
 font-family: 'RobotoSlab_500Medium';
 padding-top: 15px;
 font-size: 15px;
 color: #96A7AF;
`;
