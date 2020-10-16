import React, { useState, useEffect } from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import generatedMapStyle from '../../utils/MapStyle'
import LoadPostionButton from '../../components/LoadPositionButton'

import {
    InvisibleLeftColumn,
    LoadButton,
    MapMarkerContainer,
    MapMarkerImage,
    MapMarkerTitle,
    SearchForm,
    SearchInput
} from './styles'


const Home: React.FC = () => {

    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])

    const navigation = useNavigation()

    function handleNavigateToDetail() {
        navigation.navigate('Detail')
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

    return (
        <>
            { initialPosition[0] !== 0 ? (
                <>
                    <MapView
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

                        <Marker
                            onPress={handleNavigateToDetail}
                            coordinate={{ latitude: -21.9371716, longitude: -50.5032108 }}
                            // title="FESTA"
                            // description="Festa 1"
                        >
                            <MapMarkerContainer>
                                <MapMarkerImage source={require('../../assets/marker.png')} />
                                <MapMarkerTitle>
                                    Festa de rock
                                </MapMarkerTitle>
                            </MapMarkerContainer>

                        </Marker>
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