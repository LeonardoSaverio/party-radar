import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import AppRoutes from '../Routes/app.routes'

const Auth = createStackNavigator()

const AuthRoutes: React.FC = () => (
  <NavigationContainer>
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#22343C' }
      }}
    >
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="SignUp" component={SignUp} />
      <Auth.Screen name="Home" component={AppRoutes} />
    </Auth.Navigator>
  </NavigationContainer>
)

export default AuthRoutes