import React from 'react'
import { View, Text, FlatList, Alert } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { ListItem, Button, Icon } from 'react-native-elements'
import partys from './partys'

interface Party {
  id: number
  partyName: string,
  typeParty: string,
}

const MyPartys: React.FC = () => {
  const navigation = useNavigation()

  function confirmPartyDeletion(party: Party) {
    Alert.alert('Excluir festa', 'Deseja excluir a festa?', [
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

  function getMyPartyItemList({ item: party }: any) {
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
          name="delete"
          color="#FF565E"
          size={30}
          onPress={() => {confirmPartyDeletion(party) }}
        />
      </ListItem>
    )
  }

  return (
    <View>
      <FlatList
        keyExtractor={party => party.id.toString()}
        data={partys}
        renderItem={getMyPartyItemList}
      />
    </View>
  )

}



export default MyPartys