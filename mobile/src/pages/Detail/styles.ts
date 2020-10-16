import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const PartyName = styled.Text`
  color: #FFFFFF;
  font-size: 28px;
  font-family: 'Ubuntu_700Bold';
  margin-top: 24px;
`;

export const TypeParty = styled.Text`
 font-family: 'Roboto_400Regular';
 font-size: 16px;
 line-height: 24px;
 margin-top: 8px;
 color: #FFFFFF;

`;
export const Content = styled.View`
  margin-top: 32px;
`;



export const ContentTitle = styled.Text`
  color: #FFFFFF;
  font-family: 'Roboto_500Medium';
  font-size: 16px;
`;

export const ContentText = styled.Text`
  font-family: 'Roboto_400Regular';
  line-height: 24px;
  margin-top: 8px;
  color: #96A7AF;
`;

export const Favorite = styled.View`
  margin-top: 40px;
  margin-left: 45%;
`;



export const Footer = styled.View`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 32px;
  padding-right: 32px;
  flex-direction: row;
  justify-content: space-between;
`;


export const Button = styled(RectButton)`
 width: 48%;
 background-color: #34CB79;
 border-radius: 10px;
 height: 50px;
 flex-direction: row;
 justify-content: center;
 align-items: center; 
`;

export const ButtonText = styled.Text`
  margin-left: 8px;
  color: #fff;
  font-size: 16px;
  font-family: 'Roboto_500Medium';
`;

