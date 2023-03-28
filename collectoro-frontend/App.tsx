import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {AuthSessionResult, makeRedirectUri, TokenResponse} from "expo-auth-session";
import axios from "axios";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [accessToken, setAccessToken] = React.useState('');
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


  function fetchUserInfo(accessToken: string | undefined) {
    console.log(accessToken);
    let response = axios.get("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then((response) => {
        console.log(response)
    });
  }



  return (
      <View style={styles.container}>
        {user === null &&
            <>
              <Text style={{fontSize: 35, fontWeight: 'bold'}}>Welcome</Text>
              <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 20, color: 'gray'}}>Please login</Text>
              <TouchableOpacity
                  disabled={!request}
                  onPress={() => {
                    promptAsync().then(
                        (result: AuthSessionResult) => {
                            if (result.type === "success") {
                              fetchUserInfo(result.authentication?.accessToken);
                            }
                        }
                    );
                  }}
              >
                <Image source={require("./assets/btn.png")} style={{width: 300, height: 40}} />
              </TouchableOpacity>
            </>
        }
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