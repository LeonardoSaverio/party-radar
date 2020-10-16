import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface HeaderProps{
  navigation: any,
  title: string,
}

const Header: React.FC<HeaderProps> = ({ navigation, title }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.icon} onPress={() => navigation.openDrawer()}>
        <MaterialIcons name='menu' color='#fff' size={35} />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  icon: {
    position: 'absolute',
    left: 16,
  }
});

export default Header