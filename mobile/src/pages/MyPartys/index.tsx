import React, { useState, useEffect } from 'react'
import { View, FlatList, Alert } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { ListItem } from 'react-native-elements'

import api from '../../services/api'

interface Party {
  id: string
  party_name: string,
  type_party: string,
}

const MyPartys: React.FC = () => {
  const navigation = useNavigation()
  const [myPartys, setMypartys] = useState<Party[]>([])

  useEffect(() => {
    api.get('/myPartys').then(response => {
      setMypartys(response.data)
    })
  }, [myPartys])


  async function handleDeleteParty(id: string) {
    await api.delete(`/partys/${id}`)
    setMypartys(myPartys.filter(party => party.id !== id))
  }

  function confirmPartyDeletion(party: Party) {
    Alert.alert('Excluir festa', 'Deseja excluir a festa?', [
      {
        text: 'Sim',
        onPress() {
          handleDeleteParty(party.id)
        }
      },
      {
        text: 'Não'
      }
    ])
  }

  function handleNavigateMyPartyDetail(id: any) {
    navigation.navigate('Detail', {
      screen: 'Detail',
      params: { id: id },
    })

  }

  function getMyPartyItemList({ item: party }: any) {
    return (
      <ListItem
        key={party.id}
        bottomDivider
        containerStyle={{ backgroundColor: '#2A3C44', borderBottomColor: '#286053' }}
        onPress={() => handleNavigateMyPartyDetail(party.id)}
      >
        <ListItem.Content>
          <ListItem.Title style={{ color: '#FFFFFF' }}>{party.party_name}</ListItem.Title>
          <ListItem.Subtitle style={{ color: '#96A7A4' }}>{party.type_party}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron
          name="delete"
          color="#FF565E"
          size={30}
          onPress={() => { confirmPartyDeletion(party) }}
        />
      </ListItem>
    )
  }

  return (
    <View>
      <FlatList
        keyExtractor={party => party.id.toString()}
        data={myPartys}
        renderItem={getMyPartyItemList}
      />
    </View>
  )

}


export default MyPartys