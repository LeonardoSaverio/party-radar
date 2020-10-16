import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Header from '../components/Header'
import DrawerContent from './DrawerContent'

import Home from '../pages/Home'
import Favorite from '../pages/Favorite'
import Detail from '../pages/Detail'
import MyPartys from '../pages/MyPartys'
import PartyRegistrationInfos from '../pages/PartyRegistration/PartyRegistrationInfos'
import PartyRegistrationMap from '../pages/PartyRegistration/PartyRegristrationMap'
import PartyRegistrationDateTime from '../pages/PartyRegistration/PartyRegistrationDateTime'

import { createStackNavigator } from '@react-navigation/stack'

const stack = createStackNavigator()

const App = createDrawerNavigator()

const HomeStack = () => (
  <stack.Navigator
    screenOptions={{
      cardStyle: { backgroundColor: '#22343C' }
    }}
  >
    <stack.Screen
      name="Home"
      component={Home}
      options={({ navigation }) => ({
        headerTitle: () => <Header title='Party Radar' navigation={navigation} />,
        headerStyle: {
          backgroundColor: '#FF565E',
        }
      })}
    />

  </stack.Navigator>
)


const DetailStack = () => (
  <stack.Navigator
    screenOptions={{
      cardStyle: { backgroundColor: '#22343C' }
    }}
  >
    <stack.Screen
      name="Detail"
      component={Detail}
      options={{ headerShown: false }}

    />
  </stack.Navigator>
)

const FavoriteStack = () => (
  <stack.Navigator
    screenOptions={{
      cardStyle: { backgroundColor: '#22343C' }
    }}
  >
    <stack.Screen
      name="Favorite"
      component={Favorite}
      options={({ navigation }) => ({
        headerTitle: () => <Header title='Favoritos' navigation={navigation} />,
        headerStyle: {
          backgroundColor: '#FF565E',
        }
      })}
    />
  </stack.Navigator>
)

const MyPartysStack = () => (
  <stack.Navigator
    screenOptions={{
      cardStyle: { backgroundColor: '#22343C' }
    }}
  >
    <stack.Screen
      name="MyPartys"
      component={MyPartys}
      options={({ navigation }) => ({
        headerTitle: () => <Header title='Minhas Festas' navigation={navigation} />,
        headerStyle: {
          backgroundColor: '#FF565E',
        }
      })}
    />
  </stack.Navigator>
)

const PartyRegistrationStack = () => (
  <stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#22343C' }
    }}
  >
    <stack.Screen
      name="PartyRegistrationInfos"
      component={PartyRegistrationInfos}

    />

    <stack.Screen
      name="PartyRegistrationDateTime"
      component={PartyRegistrationDateTime}

    />

    <stack.Screen
      name="PartyRegistrationMap"
      component={PartyRegistrationMap}
    />
  </stack.Navigator>
)


const AppRoutes = () => (
  <NavigationContainer>
    <App.Navigator drawerContent={({ navigation }) => <DrawerContent navigation={navigation} />} >
      <App.Screen name="Home" component={HomeStack} options={{}} />
      <App.Screen name="Favorite" component={FavoriteStack} />
      <App.Screen name="Detail" component={DetailStack} options={{ gestureEnabled: false }} />
      <App.Screen name="MyPartys" component={MyPartysStack} />
      <App.Screen name="PartyRegistration" component={PartyRegistrationStack} options={{ gestureEnabled: false }} />
    </App.Navigator>
  </NavigationContainer>
)


export default AppRoutes