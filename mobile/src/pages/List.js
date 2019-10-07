import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  AsyncStorage,
  Alert,
} from 'react-native';
import socketio from 'socket.io-client';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      console.log('user', user_id);

      const socket = socketio('http://192.168.112.1:3333', {
        query: { user_id },
      });

      socket.on('booking_response', booking =>
        Alert.alert(
          `Sua reversa em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? 'APROVADA' : 'REJEITADA'
          }`,
        ),
      );
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(stogrageTechs => {
      const techsArray = stogrageTechs.split(',').map(item => item.trim());
      setTechs(techsArray);
    });
  }, []);

  async function handleLogout() {
    await AsyncStorage.clear();

    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>

      {techs.map(tech => (
        <SpotList key={tech} tech={tech} />
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30,
  },
});
