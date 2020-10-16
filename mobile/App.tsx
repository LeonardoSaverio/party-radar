import { StatusBar } from 'react-native'
//import { AppLoading } from 'expo'
import 'react-native-gesture-handler';
import React from 'react';
import { Roboto_400Regular, Roboto_500Medium, } from '@expo-google-fonts/roboto';
import { RobotoSlab_500Medium, RobotoSlab_400Regular } from '@expo-google-fonts/roboto-slab';
import { Ubuntu_700Bold, useFonts, } from '@expo-google-fonts/ubuntu';

import Routes from './src/Routes'

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold,
    RobotoSlab_500Medium,//usada
    RobotoSlab_400Regular, //usada
  })
  
  if (!fontsLoaded) {
    return null
    //<AppLoading/> voltar o appLoading quando arrumarem o bug
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Routes />
    </>
  );
}

export default App
