import React, { useState, useEffect } from 'react'
import { View, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as Location from 'expo-location'


import Button from '../../../components/Button'
import LoadPositionButton from '../../../components/LoadPositionButton'

import generatedMapStyle from '../../../utils/MapStyle'

import api from '../../../services/api'


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

  async function handleRegister() {
    const dataRegister = {
      whatsapp: data.partyInfo.whatsapp,
      uf: data.partyInfo.uf,
      city: data.partyInfo.city,
      party_name: data.partyInfo.partyName,
      type_party: data.partyInfo.typeParty,
      description: data.partyInfo.description || ' ',
      date_time: String(data.dateTime),
      latitude: location[0],
      longitude: location[1]
    }

    if (location[0] === 0) {
      Alert.alert('Erro no cadastro', 'Selecione um local.')
      return
    }

    
   const response = await api.post('/partys', dataRegister)
    console.log(response)
    Alert.alert('Sucesso', 'Festa cadastrada.', [
      {
        text: 'OK',
        onPress() {

          navigation.reset({
            routes: [{ name: 'Home' }]
          });
        }
      }
    ])

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
            <Button onPress={handleRegister}>Cadastrar</Button>
          </ButtonContainer>

        </Container>
      </KeyboardAvoidingView>
    </>

  )
}

export default PartyRegistrationMap







