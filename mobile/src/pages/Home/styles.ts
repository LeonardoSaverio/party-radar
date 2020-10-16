import styled from 'styled-components/native'

export const SearchForm = styled.View`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  z-index: 5;
  flex-direction: row;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  height: 50px;
  background-color: #fff;
  color: #333;
  border-radius: 25px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 16px;
`;

export const LoadButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  background-color: #FF565E;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  margin-left: 15px; 
`;

export const InvisibleLeftColumn = styled.View`
 position: absolute;
 flex-direction: column;
 height: 100%;
 width: 6%;
 opacity: 0.0; 
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
 color: #40DF9F;
 font-size: 13px;
 line-height: 23px;
`;