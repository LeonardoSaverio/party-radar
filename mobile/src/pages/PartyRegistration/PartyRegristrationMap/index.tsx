import React, { useState, useEffect } from 'react'
import { View, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as Location from 'expo-location'


import Button from '../../../components/Button'
import LoadPositionButton from '../../../components/LoadPositionButton'

import generatedMapStyle from '../../../utils/MapStyle'

import {
  Container,
  Title,
  BackToHome,
  ButtonContainer,
  MapContainer,
  MapMarkerContainer,
  MapMarkerImage,
  MapMarkerTitle,
} from './styles'

interface DataPartyInfoAndDateTime {
  dateTime: Date,
  partyInfo: {
    city: string,
    description: string,
    partyName: string,
    typeParty: string,
    uf: string,
    whatsapp: string,
  }
}


const PartyRegistrationMap: React.FC = () => {

  const route = useRoute()

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
  const [location, setLocation] = useState<[number, number]>([0, 0])
  const navigation = useNavigation()


  async function loadPosition() {
    const { status } = await Location.requestPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Ooops...', 'Precisamos de sua permissão para obter a localização')
      return
    } else {
      try {
        const location = await Location.getCurrentPositionAsync()
        const { latitude, longitude } = location.coords
        setInitialPosition([latitude, longitude])
      } catch (err) {
        return
      }
    }
  }
  useEffect(() => {
    loadPosition()
  }, [])


  const data = route.params as DataPartyInfoAndDateTime

  function handleRegister() {
    const dataRegister = {
      city: data.partyInfo.city,
      description: data.partyInfo.description,
      partyName: data.partyInfo.partyName,
      typeParty: data.partyInfo.typeParty,
      uf: data.partyInfo.uf,
      whatsapp: data.partyInfo.whatsapp,
      dateTime: data.dateTime,
      latlng: location,
    }

    if (location[0] === 0) {
      Alert.alert('Erro no cadastro', 'Selecione um local.')
      return
    }

    console.log(dataRegister)

  }


  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <Container>

          <BackToHome onPress={navigation.goBack}>
            <Icon name="arrow-left" size={30} color="#34cb78" />
          </BackToHome>
          <View>
            <Title>Escolha um ponto no mapa</Title>
          </View>

          <MapContainer>
            {initialPosition[0] !== 0 ? (
              <MapView
                style={{ width: '100%', height: '100%' }}
                customMapStyle={generatedMapStyle}
                initialRegion={{
                  latitude: initialPosition[0],
                  longitude: initialPosition[1],
                  latitudeDelta: 0.014,
                  longitudeDelta: 0.014,
                }}

                onPress={(e) => {
                  const { latitude, longitude } = e.nativeEvent.coordinate
                  setLocation([latitude, longitude])
                }}
              >
                <Marker
                  coordinate={{ latitude: location[0], longitude: location[1] }}       
                >
                  <MapMarkerContainer>
                    <MapMarkerImage source={require('../../../assets/marker.png')} />
                    <MapMarkerTitle>
                     
                    </MapMarkerTitle>
                  </MapMarkerContainer>
                </Marker>
              </MapView>
            ) :
              (
                <LoadPositionButton onPress={loadPosition}>
                  Toque para ativar a localização
                </LoadPositionButton>
              )

            }
          </MapContainer>
          <ButtonContainer>
            <Button onPress={() =>{
              handleRegister
              Alert.alert('Sucesso', 'Festa cadastrada.', [
                {
                  text: 'OK',
                  onPress() {
                    navigation.navigate('Home')
                  }
                }
              ])
             
              }}>Cadastrar</Button>
          </ButtonContainer>

        </Container>
      </KeyboardAvoidingView>
    </>

  )
}

export default PartyRegistrationMap







