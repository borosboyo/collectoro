import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {AuthSessionResult, makeRedirectUri, TokenResponse} from "expo-auth-session";
import axios from "axios";
import LoginComponent from "./src/app/core/login/login.component";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [user, setUser] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "409953552731-ntvvsac4l7puqt3vnke3b61o9jp3mbn3.apps.googleusercontent.com",
    iosClientId: "409953552731-balks0c557np9556tlqdl69llpkgtogd.apps.googleusercontent.com",
    androidClientId: "409953552731-si4ntgth3u05eroseo5k2d4du8q9gpq7.apps.googleusercontent.com",
    redirectUri: makeRedirectUri(
        {
          scheme: "collectoro-frontend"
        }
    ),
    scopes: ["profile", "email"],
  });



  return (
      <View style={styles.container}>
        <LoginComponent/>
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