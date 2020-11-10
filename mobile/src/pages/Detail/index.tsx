import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, TouchableOpacity, Alert, Linking } from 'react-native'
import { Feather as Icon, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from 'expo-constants';
import * as MailComposer from 'expo-mail-composer';
import { useAuth } from '../../hooks/auth'

import { useNavigation, useRoute } from "@react-navigation/native";

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

import api from '../../services/api'


interface Params {
  id: string,
}

interface PartyDetail {
  id: string;
  whatsapp: string;
  uf: string;
  city: string;
  party_name: string;
  type_party: string;
  description: string;
  date_time: string;
}

interface RegisterFavorite {
  isFavorited: boolean;
  party: string;
}

const Detail: React.FC = () => {
  const [favorited, setFavorited] = useState(false)
  const [myPartyDetail, setMyPartyDetail] = useState<PartyDetail>({} as PartyDetail)
  const [favoriteData, setFavoriteData] = useState<RegisterFavorite>({} as RegisterFavorite)
  const navigation = useNavigation()
  const route = useRoute()

  const myPartyIdDetail = route.params as Params

  useEffect(() => {
    api.get(`/partys/${myPartyIdDetail.id}`).then(response => {
      setMyPartyDetail(response.data)
    })
  }, [])

  const { user } = useAuth()

  function handleWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=55${myPartyDetail.whatsapp}&text=Tenho interesse nesta festa.`)
  }

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: 'Tenho interesse nesta festa.',
      recipients: [user.email],
    })
  }

  function confirmRemovefavorite() {
    Alert.alert('Remover favorito', 'Deseja remover favorito?', [
      {
        text: 'Sim',
        onPress() {
          deleteFavorite()
          setFavorited(false)
        }
      },
      {
        text: 'Não'
      }
    ])
  }

  async function createFavorite() {
    setFavoriteData({ isFavorited: favorited, party: myPartyDetail.id })
    await api.post('/favorites', favoriteData)
  }

  async function deleteFavorite() {
    await api.delete(`/favorites/${myPartyDetail.id}`)
  }

  async function showFavorite() {
    await api.get(`/favorites/${myPartyDetail.id}`)
  }

  function formatDateTime(timestamp: string) {
    const dateTime = new Date(Number(timestamp))
    const d = dateTime.getDate()
    const m = dateTime.getMonth() + 1
    const y = dateTime.getFullYear()

    const h = dateTime.getHours()
    const min = dateTime.getMinutes()

    const formatedHourMinute = `${(h < 10) ? '0' + h : h}:${(min < 10) ? '0' + min : min}`
    const formatedDate = `${(d < 10) ? '0' + d : d}/${(m < 10) ? '0' + m : m}/${y}`
    return `${formatedDate} as ${formatedHourMinute}`
  }

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
        <PartyName>{myPartyDetail.party_name}</PartyName>
        <TypeParty>{myPartyDetail.type_party}</TypeParty>
        <Content>
          <ContentTitle>Endereço</ContentTitle>
          <ContentText>{`${myPartyDetail.city}, ${myPartyDetail.uf}`}</ContentText>
        </Content>
        <Content>
          <ContentTitle>Data e hora</ContentTitle>
          <ContentText>{formatDateTime(myPartyDetail.date_time)}</ContentText>
        </Content>

        <Content>
          <ContentTitle>Descrição</ContentTitle>
          <ContentText>{myPartyDetail.description}</ContentText>
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
                createFavorite()
                setFavorited(true)
              }} >
                <MaterialCommunityIcons name="heart-outline" size={40} color="#FF565E" />
              </TouchableOpacity>
            )}
        </Favorite>
      </View>

      <Footer style={{ borderColor: '#96A7AF', borderTopWidth: 0.5 }}>
        <Button onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#FFF" />
          <ButtonText>Whatsapp</ButtonText>
        </Button>


        <Button onPress={handleComposeMail}>
          <Icon name="mail" size={20} color="#FFF" />
          <ButtonText>E-mail</ButtonText>
        </Button>

      </Footer>
    </SafeAreaView>

  )
}

export default Detail