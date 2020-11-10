import { StatusBar, View } from 'react-native'
import { AppLoading } from 'expo'
import 'react-native-gesture-handler';
import React from 'react';
import { Roboto_400Regular, Roboto_500Medium, } from '@expo-google-fonts/roboto';
import { RobotoSlab_500Medium, RobotoSlab_400Regular } from '@expo-google-fonts/roboto-slab';
import { Ubuntu_700Bold, useFonts, } from '@expo-google-fonts/ubuntu';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';

import Routes from './src/Routes'

import AppProvider from './src/hooks'

const App: React.FC = () => {
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold,
    RobotoSlab_500Medium,
    RobotoSlab_400Regular,
  })

  if (!fontsLoaded) {
    return <AppLoading/>
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <AppProvider>
        <View style={{ backgroundColor: '#22343C', flex: 1 }}>
          <Routes />
        </View >
      </AppProvider>
    </NavigationContainer>
  );
}

export default App
