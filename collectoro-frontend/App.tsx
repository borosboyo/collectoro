import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
export default function App() {

  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/user/1`, {
      method: 'GET', headers: {
        'Content-Type': 'application/json', 'Accept': 'application/json'
      }
    })
        .then((response) => response.json())
        .then(data => setUser(data));
  }, []);

  return (
    <View style={styles.container}>
      <Text>{user?.displayName}</Text>
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
