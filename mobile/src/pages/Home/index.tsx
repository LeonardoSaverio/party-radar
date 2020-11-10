import React, { useState, useEffect } from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Alert } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import generatedMapStyle from '../../utils/MapStyle'
import LoadPostionButton from '../../components/LoadPositionButton'

import {
  InvisibleLeftColumn,
  MapMarkerContainer,
  MapMarkerImage,
  CalloutContainer,
  CalloutText,
  LoadButton,
  SearchForm,
  SearchInput
} from './styles'

interface PartyLocation {
  id: string,
  latitude: number,
  longitude: number,
  party_name: string,
}

import api from '../../services/api'

const Home: React.FC = () => {

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
  const [partysLocation, setPartysLocation] = useState<PartyLocation[]>([])

  const navigation = useNavigation()

  function handleNavigateToDetail(id: string) {
    navigation.navigate('Detail', {
      screen: 'Detail',
      params: { id: id },
    })
  }

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

  useEffect(() => {
    api.get('partys').then(response => {
      setPartysLocation(response.data)
    })
  }, [])

  return (
    <>
      { initialPosition[0] !== 0 ? (
        <>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            customMapStyle={generatedMapStyle}
            showsCompass={false}
            initialRegion={{
              latitude: initialPosition[0],
              longitude: initialPosition[1],
              latitudeDelta: 0.014,
              longitudeDelta: 0.014,
            }}
          >
            {
              partysLocation.map(party => (
                <Marker
                  key={party.id}
                  coordinate={{ latitude: Number(party.latitude), longitude: Number(party.longitude) }}
                >
                  <MapMarkerContainer>
                    <MapMarkerImage source={require('../../assets/marker.png')} />
                  </MapMarkerContainer>
                  <Callout tooltip onPress={() => handleNavigateToDetail(party.id)}>
                    <CalloutContainer>
                      <CalloutText>{party.party_name}</CalloutText>
                    </CalloutContainer>
                  </Callout>

                </Marker>
              ))}

          </MapView>

          {/* Criação de uma coluna invisivel a esquerda para se sobressair
                     ao mapa para poder puxar o drawer*/}
          <InvisibleLeftColumn />

           <SearchForm>
            <SearchInput
              placeholder="Buscar por festas..."
              placeholderTextColor="#999"
              autoCapitalize="words"
              autoCorrect={false}
            />

            <LoadButton onPress={() => { }}>
              <MaterialIcons name="my-location" size={20} color="#FFF" />
            </LoadButton>
          </SearchForm> 
        </>
      ) : (
          <LoadPostionButton onPress={loadPosition}>
            Toque para ativar a localização
          </LoadPostionButton>
        )}
    </>
  )
}


export default Home