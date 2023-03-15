import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import React, { useState, useEffect } from 'react'
import {GetUserByIdTsReq} from "./swagger";



export default function App() {
  const [token, setToken] = useState<string>(null);

  useEffect(() => {
  }, []);


  const getUser = async () => {
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
