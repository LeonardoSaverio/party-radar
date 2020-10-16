import React, { useState } from 'react'
import { View, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import { Feather as Icon, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from 'expo-constants';

import { useNavigation } from "@react-navigation/native";

import {
  PartyName,
  TypeParty,
  Content,
  ContentTitle,
  ContentText,
  Favorite,
  Footer,
  Button,
  ButtonText

} from './styles'

const Detail: React.FC = () => {

  function confirmRemovefavorite() {
    Alert.alert('Remover favorito', 'Deseja remover favorito?', [
      {
        text: 'Sim',
        onPress() {
          setFavorited(false)
        }
      },
      {
        text: 'Não'
      }
    ])
  }

  const [favorited, setFavorited] = useState(false)

  const navigation = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{
        flex: 1,
        paddingHorizontal: 32,
        paddingTop: 20 + Constants.statusBarHeight,
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={30} color="#34cb78" />
        </TouchableOpacity>
        <PartyName>Festa de rock</PartyName>
        <TypeParty>Rock, Bebidas, +18</TypeParty>
        <Content>
          <ContentTitle>Endereço</ContentTitle>
          <ContentText>Tupã, SP</ContentText>
        </Content>
        <Content>
          <ContentTitle>Data e hora</ContentTitle>
          <ContentText>19/08/2020 as 20:30</ContentText>
        </Content>

        <Content>
          <ContentTitle>Descrição</ContentTitle>
          <ContentText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a efficitur tellus. Aenean mauris nulla, tempus in bibendum sed, iaculis at turpis. Curabitur pharetra, augue sit amet elementum pretium.</ContentText>
        </Content>

        <Favorite>
          {favorited ? (
            <TouchableOpacity onPress={() => {
              confirmRemovefavorite()
            }} >
              <MaterialCommunityIcons name="heart-off" size={40} color="#FF565E" />
            </TouchableOpacity>

          ) : (


              <TouchableOpacity onPress={() => {

                setFavorited(true)
              }} >
                <MaterialCommunityIcons name="heart-outline" size={40} color="#FF565E" />
              </TouchableOpacity>
            )}
        </Favorite>
      </View>

      <Footer style={{ borderColor: '#96A7AF', borderTopWidth: 0.5 }}>
        <Button>
          <FontAwesome name="whatsapp" size={20} color="#FFF" />
          <ButtonText>Whatsapp</ButtonText>
        </Button>


        <Button>
          <Icon name="mail" size={20} color="#FFF" />
          <ButtonText>E-mail</ButtonText>
        </Button>

      </Footer>
    </SafeAreaView>

  )
}

export default Detail