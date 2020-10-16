import React from 'react'
import { View, FlatList, Alert } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { ListItem } from 'react-native-elements'
import partys from '../MyPartys/partys'

interface Party {
  id: number
  partyName: string,
  typeParty: string,
}

const Favorite: React.FC = () => {
  const navigation = useNavigation()

  function confirmFavoriteDeletion(party: Party) {
    Alert.alert('Excluir Favorito', 'Deseja excluir favorito?', [
      {
        text: 'Sim',
        onPress() {
          console.warn('delete ' + party.id)
        }
      },
      {
        text: 'Não'
      }
    ])
  }

  function getMyFavoriteItemList({ item: party }: any) {
    return (
      <ListItem
        key={party.id}
        bottomDivider
        containerStyle={{ backgroundColor: '#2A3C44', borderBottomColor: '#286053' }}
        onPress={() => navigation.navigate('Detail', party.id)}
      >
        <ListItem.Content>
          <ListItem.Title style={{ color: '#FFFFFF' }}>{party.partyName}</ListItem.Title>
          <ListItem.Subtitle style={{ color: '#96A7A4' }}>{party.typeParty}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron
          name='heart-off'
          type='material-community'
          color="#FF565E"
          size={30}
          onPress={() => { confirmFavoriteDeletion(party) }}
        />
      </ListItem>
    )
  }

  return (
    <View>
      <FlatList
        keyExtractor={party => party.id.toString()}
        data={partys}
        renderItem={getMyFavoriteItemList}
      />
    </View>
  )
}

export default Favorite