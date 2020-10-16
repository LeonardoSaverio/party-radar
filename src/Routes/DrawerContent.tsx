import React from 'react'
import { View, StyleSheet } from 'react-native'
import {
  Title,
  Caption,
  Drawer,
} from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { MaterialCommunityIcons as Icon, MaterialIcons } from "@expo/vector-icons";

const DrawerContent: React.FC<any> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#2A3C44' }}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>

            <View style={{ flexDirection: 'column' }}>
              <Title style={styles.title}> Seja bem vindo(a) </Title>
              <Caption style={styles.caption}>Mariana Silva</Caption>
            </View>

          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem icon={({ color, size }) => (
              <Icon name='home-outline' color={'#96A7AF'} size={size} />
            )}
              label="Início"
              labelStyle={{ color: '#96A7AF' }}
              onPress={() => { navigation.navigate('Home') }}
            />
            <DrawerItem icon={({ color, size }) => (
              <Icon name='heart-outline' color={'#96A7AF'} size={size} />
            )}
              label="Favoritos"
              labelStyle={{ color: '#96A7AF' }}
              onPress={() => { navigation.navigate('Favorite') }}
            />
            <DrawerItem icon={({ color, size }) => (
              <Icon name='map-marker-plus' color={'#96A7AF'} size={size} />
            )}
              label="Cadastrar festas"
              labelStyle={{ color: '#96A7AF' }}
              onPress={() => { navigation.navigate('PartyRegistration') }}
            />

            <DrawerItem icon={({ color, size }) => (
              <MaterialIcons name='event-available' color={'#96A7AF'} size={size} />
            )}
              label="Minhas Festas"
              labelStyle={{ color: '#96A7AF' }}
              onPress={() => { navigation.navigate('MyPartys') }}
            />
            <DrawerItem icon={({ color, size }) => (
              <Icon name='settings' color={'#96A7AF'} size={size} />
            )}
              label="Configurações"
              labelStyle={{ color: '#96A7AF' }}
              onPress={() => { }}
            />
          </Drawer.Section>
        </View>

      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem icon={({ color, size }) => (
          <Icon name='exit-to-app' color={'#3DD598'} size={size} />
        )}
          label="Sair"
          labelStyle={{ color: '#3DD598' }}
          onPress={() => { }}
        />
      </Drawer.Section>
    </View>
  )
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: -4,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: '#fff',
  },

  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,

    borderTopWidth: 1,
    backgroundColor: '#286053'

  },
  
});


export default DrawerContent