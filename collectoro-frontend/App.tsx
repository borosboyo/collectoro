import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import React, { useState, useEffect } from 'react';
export default function App() {

  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string>(null);

  useEffect(() => {
  }, []);

  const getUser = async () => {
    fetch(`http://10.0.2.2:8080/api/auth/authenticate`, {
      method: 'POST', headers: {
        'Content-Type': 'application/json', 'Accept': 'application/json'
      },
      body: JSON.stringify({
        "email": "borosgergo00@gmail.com",
        "password": "pass"
      })
    })
        .then((response) => response.json())
        .then(data => setToken(data.token))
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
          throw error;
        });
  }

  const getDemo = async () => {
    fetch(`http://10.0.2.2:8080/api/demo`, {
      method: 'GET', headers: {
        'Content-Type': 'application/json', 'Accept': 'application/json'
      },
    })
        .then((response) => response.json())
        .then(data => console.log(data));
  }

  return (
    <View style={styles.container}>
        <Button title="Get User" onPress={getUser}/>
        <Text>{token}</Text>
        <Text onPress={getDemo}>Get Demo</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
