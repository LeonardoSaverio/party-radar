import React, { useState, useEffect } from 'react'
import { View, FlatList, Alert } from 'react-native'
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import { ListItem } from 'react-native-elements'

interface Favorite {
  id: string;
  isFavorited: boolean;
  party_name: string;
  type_party: string;
}

import api from '../../services/api'

const Favorite: React.FC = () => {
  const navigation = useNavigation()

  const [favorites, setFavorites] = useState<Favorite[]>([])


  useEffect(() => {
    api.get('/favorites').then(response => {
      setFavorites(response.data)
    })
  }, [])


  async function handleDeleteFavorite(id: string) {
    await api.delete(`/favorites/${id}`)
    setFavorites(favorites.filter(favorite => favorite.id !== id))
  }

  function confirmFavoriteDeletion(favorite: Favorite) {
    Alert.alert('Excluir Favorito', 'Deseja excluir favorito?', [
      {
        text: 'Sim',
        onPress() {
          handleDeleteFavorite(favorite.id)
        }
      },
      {
        text: 'Não'
      }
    ])
  }

  function getMyFavoriteItemList({ item: favorite }: any) {
    return (
      <ListItem
        key={favorite.id}
        bottomDivider
        containerStyle={{ backgroundColor: '#2A3C44', borderBottomColor: '#286053' }}
        onPress={() => navigation.navigate('Detail', favorite.id)}
      >
        <ListItem.Content>
          <ListItem.Title style={{ color: '#FFFFFF' }}>{favorite.party_name}</ListItem.Title>
          <ListItem.Subtitle style={{ color: '#96A7A4' }}>{favorite.type_party}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron
          name='heart-off'
          type='material-community'
          color="#FF565E"
          size={30}
          onPress={() => { confirmFavoriteDeletion(favorite) }}
        />
      </ListItem>
    )
  }

  return (
    <View>
      <FlatList
        keyExtractor={favorite => favorite.id.toString()}
        data={favorites}
        renderItem={getMyFavoriteItemList}
      />
    </View>
  )
}

export default Favorite