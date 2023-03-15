import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import React, { useState, useEffect } from 'react'
import {Configuration, GetUserByIdTsReq} from "./swagger";
import {UserControllerApi} from "./swagger";
import {UserControllerApiFactory as userController} from "./swagger";
import AsyncStorage from "@react-native-async-storage/async-storage";
import globalAxios, {AxiosInstance, AxiosRequestConfig} from "axios";
import axios from "axios";

const baseOptions : AxiosRequestConfig = {
    baseURL: "http://localhost:8080",
    headers: {
        'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJib3Jvc2dlcmdvMDBAZ21haWwuY29tIiwiaWF0IjoxNjc4OTE1NDgyLCJleHAiOjE2Nzg5MTY5MjJ9.QgQxyc8uPAf77uhANRJr192QIyOZ2Pn27O2mXpiuEy0'
    }
}

const config : Configuration = new Configuration({
    baseOptions: baseOptions
})

export default function App() {
  const [token, setToken] = useState<string>(null);

  useEffect(() => {
    AsyncStorage.setItem('token', '1234567890')


  }, []);


  const getUser = async () => {
    const req : GetUserByIdTsReq = {
        id: 1
    }

    console.log(config.baseOptions);

    userController(config).getUserById(req).then((res) => {
        console.log(res);
    })
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
