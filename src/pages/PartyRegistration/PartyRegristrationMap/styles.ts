import styled from 'styled-components/native'
import { Platform } from "react-native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding:15% 20px ${Platform.OS === 'android' ? 90 : 40}px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #96A7AF;
  font-family: RobotoSlab_500Medium;
  margin: 0px 0 12px;
`;


export const BackToHome = styled.TouchableOpacity`
  margin: 50px 0 0 0;
  margin-right: 90%;
`;


export const ButtonContainer = styled.View`
  margin-top: 10px;
  width: 100%;
`;

export const MapContainer = styled.View`
  width: 100%;
  height: 90% ;
  overflow: hidden;
  border-radius: 10px;
  margin-top: 1px;
`;

export const MapMarkerContainer = styled.View`
  width: 100px;
  height: 80px;
  flex-direction: column;
  overflow: hidden;
  border-radius: 8px;
  align-items: center;
`;

export const MapMarkerImage = styled.Image`
  width: 36px;
  height: 50px;
`;

export const MapMarkerTitle = styled.Text`
 flex: 1;
 color: #FF565E;
 font-size: 13px;
 line-height: 23px;
`;


