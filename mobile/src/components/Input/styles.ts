import styled, { css } from 'styled-components/native'
import { Feather } from '@expo/vector-icons'


interface ContainerProps {
  isFocused: boolean,
  isErrored: boolean,
}

export const Container = styled.View<ContainerProps>`
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

  ${props => props.isErrored &&
    css`
    border-color: #c53030;
  `}

  ${props => props.isFocused &&
    css`
    border-color: #40DF9F;
  `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-family: 'RobotoSlab_400Regular';
`;

export const Icon = styled(Feather)`
  margin-right: 16px;
`;