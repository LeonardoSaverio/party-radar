import React from 'react'

import { RectButtonProperties } from 'react-native-gesture-handler'

import { Container, ButtonText } from './styles'
import { Entypo } from "@expo/vector-icons";

interface ButtonProps extends RectButtonProperties {
  children: string;
}

const LoadPositionButton: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container {...rest}>
    <Entypo name="location" size={40} color="#96A7AF" />
    <ButtonText>{children}</ButtonText>
  </Container>
)


export default LoadPositionButton